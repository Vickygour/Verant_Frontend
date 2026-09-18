'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, CheckCircle2, MessageSquare, ThumbsUp } from 'lucide-react';
import Stars from '@/components/ui/Stars';
import { useUI } from '@/context/UIContext';
import { useAuth } from '@/context/AuthContext';
import reviewService from '@/lib/api/reviews.service';

export default function ProductReviews({ product }) {
    const router = useRouter();
    const { toast } = useUI();
    const { isAuthenticated } = useAuth();

    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);

    // Simplified Form State (Headline + Comment)
    const [formData, setFormData] = useState({
        title: '',
        comment: '',
    });

    const [submitted, setSubmitted] = useState(false);

    // GET /api/products/:productId/reviews
    const loadReviews = useCallback(() => {
        if (!product?.id) return;

        reviewService
            .forProduct(product.id)
            .then(setReviews)
            .catch(() => setReviews([]));
    }, [product?.id]);

    useEffect(() => {
        loadReviews();
    }, [loadReviews]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // POST /api/products/:productId/reviews — protected, one review per user.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toast('Sign In Required', 'Please sign in to publish a review.');
            router.push(`/login?redirect=/product/${product.id}`);
            return;
        }

        try {
            const created = await reviewService.create(product.id, {
                rating,
                title: formData.title,
                comment: formData.comment,
            });

            setReviews((prev) => [created, ...prev]);
            setSubmitted(true);
            setTimeout(() => {
                setShowForm(false);
                setSubmitted(false);
                setFormData({ title: '', comment: '' });
                setRating(5);
            }, 2000);
        } catch (err) {
            toast('Review Failed', err.message);
        }
    };

    // PATCH /api/reviews/:id/like — public "helpful" counter.
    const handleLike = async (reviewId) => {
        setReviews((prev) =>
            prev.map((r) => (r.id === reviewId ? { ...r, likes: r.likes + 1 } : r)),
        );

        try {
            await reviewService.like(reviewId);
        } catch {
            // Roll the optimistic bump back if the server said no.
            setReviews((prev) =>
                prev.map((r) => (r.id === reviewId ? { ...r, likes: Math.max(0, r.likes - 1) } : r)),
            );
        }
    };

    return (
        <section className="mt-24 pt-12 border-t border-line">
            {/* Header & Rating Breakdown */}
            <div className="grid lg:grid-cols-12 gap-10 items-start">
                {/* Rating Summary */}
                <div className="lg:col-span-4 bg-white border border-line p-8 shadow-sm">
                    <div className="eyebrow text-emerald font-bold tracking-[0.25em] text-[10px] uppercase">
                        Client Atelier Opinions
                    </div>
                    <h2 className="font-display text-3xl mt-2">Ratings & Reviews</h2>

                    <div className="flex items-baseline gap-3 mt-4">
                        <span className="font-display text-5xl">{product?.rating || 4.9}</span>
                        <div>
                            <div className="flex text-emerald">
                                <Stars rating={Math.round(product?.rating || 5)} />
                            </div>
                            <span className="text-xs text-muted font-bold tracking-widest uppercase mt-1 block">
                                Based on {reviews.length + (product?.reviews || 20)} verified client notes
                            </span>
                        </div>
                    </div>

                    {/* Star Distribution Bars */}
                    <div className="space-y-2 mt-6 pt-6 border-t border-line">
                        {[
                            { star: 5, pct: '88%' },
                            { star: 4, pct: '9%' },
                            { star: 3, pct: '3%' },
                            { star: 2, pct: '0%' },
                            { star: 1, pct: '0%' },
                        ].map(({ star, pct }) => (
                            <div key={star} className="flex items-center gap-3 text-xs">
                                <span className="w-12 text-muted font-bold flex items-center gap-1">
                                    {star} <Star className="w-3 h-3 fill-emerald text-emerald" />
                                </span>
                                <div className="flex-1 h-1.5 bg-zinc-100 overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-deep"
                                        style={{ width: pct }}
                                    />
                                </div>
                                <span className="w-8 text-right text-muted">{pct}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowForm(!showForm)}
                        className="w-full mt-8 btn btn-primary text-xs py-3.5 tracking-[0.2em] font-extrabold uppercase justify-center"
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span>{showForm ? 'Close Form' : 'Write a Review'}</span>
                    </button>
                </div>

                {/* Review Form or Reviews List */}
                <div className="lg:col-span-8">
                    {showForm ? (
                        <div className="bg-white border border-emerald/25 p-6 md:p-8 shadow-md">
                            <h3 className="font-display text-2xl uppercase tracking-wide">
                                Share Your Experience
                            </h3>
                            <p className="text-xs text-muted mt-1">
                                Your review helps our atelier refine cuts and craft for fellow connoisseurs.
                            </p>

                            {submitted ? (
                                <div className="py-12 text-center space-y-3">
                                    <CheckCircle2 className="w-12 h-12 text-emerald mx-auto" />
                                    <div className="font-display text-xl">Thank You for Your Review</div>
                                    <p className="text-xs text-muted max-w-sm mx-auto">
                                        Your response has been published to our client feedback stream.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                                    {/* Star Rating Selection */}
                                    <div>
                                        <label className="text-xs uppercase font-bold tracking-widest text-muted block mb-2">
                                            Overall Score *
                                        </label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onMouseEnter={() => setHoverRating(s)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={() => setRating(s)}
                                                    className="p-1 text-emerald focus:outline-none"
                                                >
                                                    <Star
                                                        className={`w-6 h-6 transition-colors ${s <= (hoverRating || rating)
                                                                ? 'fill-emerald text-emerald'
                                                                : 'text-zinc-300'
                                                            }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Review Headline */}
                                    <div>
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-muted block mb-1">
                                            Review Headline *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Summarize your opinion in a few words"
                                            className="w-full border border-line px-3.5 py-3 text-xs outline-none focus:border-emerald bg-transparent"
                                        />
                                    </div>

                                    {/* Detailed Review */}
                                    <div>
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-muted block mb-1">
                                            Detailed Review *
                                        </label>
                                        <textarea
                                            name="comment"
                                            rows={5}
                                            required
                                            value={formData.comment}
                                            onChange={handleInputChange}
                                            placeholder="Tell us about the fit, fabric quality, feel and craftsmanship..."
                                            className="w-full border border-line p-3.5 text-xs outline-none focus:border-emerald bg-transparent resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full btn btn-primary text-xs py-3.5 tracking-[0.2em] font-extrabold uppercase justify-center mt-2"
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            )}
                        </div>
                    ) : (
                        /* Reviews Stream */
                        <div className="space-y-4">
                            {reviews.map((rev) => (
                                <div
                                    key={rev.id}
                                    className="bg-white border border-line p-6 hover:border-emerald/40 transition shadow-sm"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Stars rating={rev.rating} />
                                                {rev.verified && (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald bg-emerald/10 px-2 py-0.5">
                                                        <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                                                    </span>
                                                )}
                                            </div>
                                            <h4 className="font-display text-lg mt-2 font-semibold text-ink">
                                                {rev.title}
                                            </h4>
                                        </div>
                                        <span className="text-[11px] text-muted tracking-wider uppercase font-semibold">
                                            {rev.date}
                                        </span>
                                    </div>

                                    <p className="text-xs leading-relaxed text-ink/80 mt-3">{rev.comment}</p>

                                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-line text-xs">
                                        <div>
                                            <span className="font-bold text-ink">{rev.author}</span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleLike(rev.id)}
                                            className="inline-flex items-center gap-1.5 text-muted hover:text-emerald text-[11px] transition font-bold"
                                        >
                                            <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.likes})
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}