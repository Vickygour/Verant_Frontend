/** Route-level skeleton shown while a page segment streams in. */
export default function Loading() {
  return (
    <div className="pt-[160px] pb-24 px-5 md:px-10 lg:px-12 max-w-[1400px] mx-auto">
      <div className="skeleton h-4 w-40" />
      <div className="skeleton h-16 w-2/3 mt-6" />
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-12">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-line bg-white">
            <div className="skeleton aspect-[3/4]" />
            <div className="p-5 space-y-2">
              <div className="skeleton h-3 w-1/3" />
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
