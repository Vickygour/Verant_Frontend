/**
 * Catalogue data for the VÉRANT storefront.
 * In production this module would be replaced by a CMS / commerce API call —
 * every consumer imports from here so the swap stays a one-file change.
 */

/** Build a sized Unsplash URL from a photo id. */
export const unsplash = (id, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const U = unsplash;

export const PRODUCTS = [
{id:1,name:"Verdant Court Low 07",cat:"Sneakers",price:14990,mrp:18990,rating:4.9,reviews:842,badge:"BESTSELLER",isNew:false,isBest:true,sizes:["UK 7","UK 8","UK 9","UK 10","UK 11"],colors:[{n:"Deep Emerald",h:"#0B3D2E"},{n:"Ivory",h:"#EDE8DC"}],material:"Italian Leather",fit:"True to size · Low profile",stock:14,tagline:"The icon. Re-cut in full-grain emerald.",desc:"Our signature court silhouette cut from full-grain Italian leather with hand-painted emerald edges, tonal stitching and a cushioned ivory cupsole. Burnished by hand for a deep, living shine.",care:"Wipe with soft cloth. Condition leather monthly. Keep away from direct rain.",images:[U("1542291026-7eec264c27ff"),U("1595950653106-6c9ebd614d3a")]},
{id:2,name:"Alpi Knit Runner",cat:"Sneakers",price:16500,mrp:19990,rating:4.8,reviews:214,badge:"NEW",isNew:true,isBest:false,sizes:["UK 7","UK 8","UK 9","UK 10","UK 11"],colors:[{n:"Off-White",h:"#F2F0E9"},{n:"Forest",h:"#123E32"}],material:"Technical Knit",fit:"Snug · Size up for wide feet",stock:22,tagline:"Featherlight knit engineered for the city.",desc:"A sock-fit runner in recycled technical yarn with forest-green cage overlays and responsive foam. Weighs 240g. Breathes through Mumbai summers.",care:"Machine wash cold in bag. Air dry only.",images:[U("1600185365483-26d7a4cc7519"),U("1608231387042-66d1773070a5")]},
{id:3,name:"Sarto Pista High",cat:"Sneakers",price:18490,mrp:22990,rating:4.9,reviews:167,badge:"LIMITED",isNew:true,isBest:false,sizes:["UK 8","UK 9","UK 10","UK 11"],colors:[{n:"Sage Suede",h:"#A8C0A6"},{n:"White",h:"#FFFFFF"}],material:"Suede + Leather",fit:"True to size",stock:8,tagline:"High-top nostalgia, maison precision.",desc:"Limited 500-pair run. Sage Italian suede with ivory leather eyestay, padded collar and archival Vérant piste stripe. Numbered tongue label.",care:"Use suede brush. Waterproof spray before wear.",images:[U("1560769629-975ec94e6a86"),U("1606107557195-0e29a4b5b4aa")]},
{id:4,name:"Bosco Trail GTX",cat:"Sneakers",price:19990,mrp:24990,rating:4.7,reviews:329,badge:"BESTSELLER",isNew:false,isBest:true,sizes:["UK 7","UK 8","UK 9","UK 10","UK 11"],colors:[{n:"Olive",h:"#4A5D3A"},{n:"Black",h:"#111111"}],material:"Nubuck + GTX Mesh",fit:"True to size",stock:18,tagline:"Monsoon-proof. Mountain-ready.",desc:"Waterproof trail hybrid with Vibram-inspired lugged sole, nubuck mudguard and reflective forest hits. From Sahyadris to street.",care:"Rinse mud. Air dry. Re-proof seasonally.",images:[U("1549298916-b41d501d3772"),U("1552346154-21d32810aba3")]},
{id:5,name:"Essence Heavy Tee · Ivory",cat:"T-Shirts",price:3490,mrp:4290,rating:4.9,reviews:1204,badge:"ICON",isNew:false,isBest:true,sizes:["XS","S","M","L","XL"],colors:[{n:"Ivory",h:"#F2F0E9"},{n:"White",h:"#FFFFFF"}],material:"240 GSM Organic Cotton",fit:"Boxy · Drop shoulder",stock:45,tagline:"The perfect heavy tee. 240 GSM.",desc:"Cut boxy from dense 240 GSM organic cotton with ribbed collar that never sags. Garment-washed for zero shrinkage. The tee that built the house.",care:"Cold wash inside-out. Line dry in shade.",images:[U("1521572163474-6864f9cf17ab"),U("1576566588028-4147f3842f27")]},
{id:6,name:"Atelier Boxy Tee · Forest",cat:"T-Shirts",price:3990,mrp:4990,rating:4.8,reviews:386,badge:"NEW",isNew:true,isBest:false,sizes:["S","M","L","XL"],colors:[{n:"Forest",h:"#123E32"},{n:"Black",h:"#111"}],material:"Supima Cotton",fit:"Oversized boxy",stock:30,tagline:"Deep forest. Small embroidered V.",desc:"Supima cotton jersey dyed deep forest with tonal embroidered Vérant monogram at chest and extended back hem. Pre-shrunk, bio-washed.",care:"Wash with like colours. Warm iron.",images:[U("1583743814966-8936f5b7be1a"),U("1503341504253-dff4815485f1")]},
{id:7,name:"Linea Piqué Tee · Sage",cat:"T-Shirts",price:4490,mrp:5490,rating:4.7,reviews:198,badge:"",isNew:false,isBest:false,sizes:["XS","S","M","L","XL"],colors:[{n:"Sage",h:"#A8C0A6"},{n:"Sand",h:"#D8CBB5"}],material:"Cotton Piqué",fit:"Regular",stock:26,tagline:"Piqué polish, tee ease.",desc:"Textured piqué knit with hidden placket and mother-of-pearl buttons. Smart enough for dinner, soft enough for Sunday.",care:"Gentle wash. Do not bleach.",images:[U("1618354691373-d851c5c3a990"),U("1620799140408-edc6dcb6d633")]},
{id:8,name:"Linea Oxford Shirt",cat:"Shirts",price:6490,mrp:7990,rating:4.8,reviews:567,badge:"BESTSELLER",isNew:false,isBest:true,sizes:["S","M","L","XL"],colors:[{n:"White",h:"#fff"},{n:"Sky",h:"#D6E4E8"}],material:"Oxford Cotton",fit:"Tailored · Sharp collar",stock:24,tagline:"The sharpest white shirt in the room.",desc:"Two-fold oxford weave with single-needle stitching, reinforced collar and corozo buttons. Cut close through the body with room to move.",care:"Machine wash. Hot iron for crispness.",images:[U("1596755094514-f87e34085b2c"),U("1602810318383-e386cc2a3ccf")]},
{id:9,name:"Smeraldo Silk Shirt",cat:"Shirts",price:9990,mrp:12990,rating:5.0,reviews:143,badge:"LIMITED",isNew:true,isBest:false,sizes:["S","M","L"],colors:[{n:"Emerald",h:"#0B3D2E"},{n:"Black",h:"#111"}],material:"Mulberry Silk Blend",fit:"Relaxed camp collar",stock:9,tagline:"Liquid emerald silk. Evening essential.",desc:"22-momme mulberry silk with camp collar and hand-rolled hems. Catches light like water at night. Made in Como, finished in Jaipur.",care:"Dry clean only.",images:[U("1598033129183-c4f50c736f10"),U("1603252109303-2751441dd157")]},
{id:10,name:"Vela Linen Overshirt",cat:"Shirts",price:7490,mrp:8990,rating:4.7,reviews:221,badge:"",isNew:false,isBest:false,sizes:["M","L","XL"],colors:[{n:"Stone",h:"#CFC6B4"},{n:"Olive",h:"#6B705C"}],material:"European Linen",fit:"Relaxed overshirt",stock:19,tagline:"Linen armour for hot days.",desc:"Heavyweight European flax linen with patch pockets and horn buttons. Softens beautifully with every wash.",care:"Machine wash gentle. Line dry.",images:[U("1603252109303-2751441dd157"),U("1602810318383-e386cc2a3ccf")]},
{id:11,name:"Nube Cloud Hoodie",cat:"Hoodies",price:7490,mrp:9490,rating:4.9,reviews:763,badge:"BESTSELLER",isNew:false,isBest:true,sizes:["S","M","L","XL"],colors:[{n:"Cloud",h:"#E8E6DF"},{n:"Sage",h:"#A8C0A6"}],material:"480 GSM French Terry",fit:"Oversized",stock:32,tagline:"480 GSM cloud. Double-lined hood.",desc:"Brushed-back French terry so dense it stands on its own. Double-layer hood, hidden phone pocket, tonal drawcords with metal tips.",care:"Cold wash. Do not tumble.",images:[U("1556821840-3a63f95609a7"),U("1509942774463-acf339cf87d5")]},
{id:12,name:"Foresta Heavy Hoodie",cat:"Hoodies",price:8990,mrp:10990,rating:4.9,reviews:512,badge:"BESTSELLER",isNew:true,isBest:true,sizes:["S","M","L","XL"],colors:[{n:"Deep Green",h:"#0B3D2E"},{n:"Black",h:"#111"}],material:"500 GSM Loopback",fit:"Boxy heavy",stock:27,tagline:"The deep-green heavyweight icon.",desc:"Our heaviest fleece ever at 500 GSM, garment-dyed deep emerald with puff-embroidered V. Ribbed side gussets for drape.",care:"Wash inside-out cold.",images:[U("1578681994506-b8f463449011"),U("1556821840-3a63f95609a7")]},
{id:13,name:"Atelier Zip Hoodie",cat:"Hoodies",price:9490,mrp:11990,rating:4.6,reviews:134,badge:"NEW",isNew:true,isBest:false,sizes:["S","M","L","XL"],colors:[{n:"Charcoal",h:"#2B2B2B"},{n:"Ivory",h:"#F2F0E9"}],material:"Wool Blend Fleece",fit:"Regular",stock:15,tagline:"Tailored zip-through. YKK Excella.",desc:"Wool-blend double-face jersey with Excella zip, high collar and articulated sleeves. Hoodie meets blazer.",care:"Gentle wool wash.",images:[U("1611312449408-fcece27cdbb7"),U("1578681994506-b8f463449011")]},
{id:14,name:"Milano Leather Biker",cat:"Jackets",price:34990,mrp:42990,rating:5.0,reviews:98,badge:"LIMITED",isNew:false,isBest:true,sizes:["M","L","XL"],colors:[{n:"Black",h:"#111"},{n:"Espresso",h:"#3E2F27"}],material:"Full-grain Leather",fit:"Slim biker",stock:6,tagline:"Full-grain. 40 hours of handwork.",desc:"1.2mm full-grain aniline leather with emerald quilted satin lining, antique brass zips and hand-set snaps. Ages like a story.",care:"Leather specialist clean only.",images:[U("1551028719-00167b16eac5"),U("1520975954732-35dd22299614")]},
{id:15,name:"Bosco Field Jacket",cat:"Jackets",price:18490,mrp:22990,rating:4.8,reviews:342,badge:"BESTSELLER",isNew:false,isBest:true,sizes:["S","M","L","XL"],colors:[{n:"Field Olive",h:"#5A6650"},{n:"Sand",h:"#CBBFA5"}],material:"Waxed Canvas",fit:"Regular · 4 pockets",stock:20,tagline:"Waxed canvas. Storm flap. Brass.",desc:"18oz British waxed canvas with corduroy collar, bellow pockets and storm cuffs. Re-waxable for life.",care:"Brush clean. Re-wax yearly.",images:[U("1591047139829-d91aecb6caea"),U("1544022613-e87ca75a784a")]},
{id:16,name:"Sarto Wool Overcoat",cat:"Jackets",price:24990,mrp:31990,rating:4.9,reviews:76,badge:"NEW",isNew:true,isBest:false,sizes:["M","L","XL"],colors:[{n:"Forest Melton",h:"#123E32"},{n:"Camel",h:"#C19A6B"}],material:"Italian Wool Melton",fit:"Long · Tailored",stock:4,tagline:"Hand-canvassed overcoat.",desc:"Double-faced Italian melton wool with hand-felled seams, horn buttons and half-canvas chest. Cut long over tailoring.",care:"Dry clean only.",images:[U("1544022613-e87ca75a784a"),U("1521223890158-f9f7c3d5d504")]},
{id:17,name:"Sartor Pleated Trouser",cat:"Trousers",price:8490,mrp:10490,rating:4.8,reviews:189,badge:"NEW",isNew:true,isBest:false,sizes:["30","32","34","36"],colors:[{n:"Ivory",h:"#EFEADF"},{n:"Black",h:"#111"}],material:"Wool Blend Twill",fit:"High-rise tapered",stock:21,tagline:"Double-pleat. Extended tab.",desc:"High-rise double-pleated trouser with extended waist tab, side adjusters and cropped taper. Crease holds for days.",care:"Dry clean recommended.",images:[U("1624378439575-d8705ad7ae80"),U("1473966968600-fa801b869a1a")]},
{id:18,name:"Vela Cargo Trouser",cat:"Trousers",price:9490,mrp:11990,rating:4.9,reviews:445,badge:"BESTSELLER",isNew:false,isBest:true,sizes:["30","32","34","36"],colors:[{n:"Forest Ripstop",h:"#2F3E33"},{n:"Black",h:"#111"}],material:"Cotton Ripstop",fit:"Relaxed cargo",stock:29,tagline:"6-pocket ripstop. Bungee hem.",desc:"Tear-proof ripstop with 6 utility pockets, bartacked stress points and adjustable bungee hems. Garment-dyed.",care:"Machine wash cold.",images:[U("1507680434567-5739c80be66d"),U("1473966968600-fa801b869a1a")]},
{id:19,name:"Linea Tailored Denim",cat:"Trousers",price:7990,mrp:9990,rating:4.7,reviews:267,badge:"",isNew:false,isBest:false,sizes:["30","32","34","36"],colors:[{n:"Rinse",h:"#2E3A4A"},{n:"Washed Black",h:"#222"}],material:"14oz Japanese Denim",fit:"Slim tapered",stock:33,tagline:"14oz Japanese selvedge.",desc:"14oz Kaihara selvedge denim with hidden selvedge coin pocket, chainstitched hems and matte shank button. Fades beautifully.",care:"Wash rarely, cold.",images:[U("1542272604-787c3835535d"),U("1541099649105-f69ad21f3246")]},
{id:20,name:"Verde Leather Belt",cat:"Accessories",price:4990,mrp:6490,rating:4.8,reviews:156,badge:"",isNew:false,isBest:false,sizes:["OS"],colors:[{n:"Tan",h:"#8B5E3C"},{n:"Black",h:"#111"}],material:"Veg-tan Leather",fit:"One size · 32-38",stock:40,tagline:"Veg-tan. Solid brass V buckle.",desc:"3.5mm vegetable-tanned leather with solid brass Vérant buckle. Burnished edges darken with wear.",care:"Condition occasionally.",images:[U("1624222247344-550fb60583dc"),U("1553062407-98eeb64c6a62")]},
{id:21,name:"Foresta Wool Cap",cat:"Accessories",price:2990,mrp:3990,rating:4.7,reviews:203,badge:"NEW",isNew:true,isBest:false,sizes:["OS"],colors:[{n:"Forest",h:"#0B3D2E"},{n:"Sage",h:"#A8C0A6"}],material:"Merino Wool",fit:"Adjustable",stock:38,tagline:"Merino 6-panel. Embroidered.",desc:"Six-panel cap in brushed merino with embroidered monogram, leather strap and brass slider.",care:"Spot clean.",images:[U("1588850561407-ed78c282e89b"),U("1521369909029-2afed882baee")]},
{id:22,name:"Vela Canvas Tote",cat:"Accessories",price:5490,mrp:6990,rating:4.9,reviews:378,badge:"BESTSELLER",isNew:false,isBest:true,sizes:["OS"],colors:[{n:"Natural",h:"#E8E0C8"},{n:"Forest",h:"#123E32"}],material:"22oz Canvas + Leather",fit:"18L · Laptop fit",stock:25,tagline:"22oz canvas. Leather handles.",desc:"22oz army duck canvas with veg-tan handles, interior zip and magnetic closure. Carries 16-inch laptop.",care:"Brush clean.",images:[U("1590874103328-eac38a683ce7"),U("1544816155-12df9643f363")]},
{id:23,name:"Smeraldo Silk Scarf",cat:"Accessories",price:6990,mrp:8990,rating:4.9,reviews:87,badge:"LIMITED",isNew:true,isBest:false,sizes:["OS"],colors:[{n:"Emerald Print",h:"#0B3D2E"},{n:"Ivory Print",h:"#EDE8DC"}],material:"Twill Silk",fit:"90 x 90 cm",stock:0,tagline:"Hand-rolled. Atelier print.",desc:"Twill silk scarf with hand-drawn Verdant garden print, hand-rolled edges. Designed in our Milano studio.",care:"Dry clean only.",images:[U("1601924994987-69e26d50dc26"),U("1520903920243-00d872a2d1c9")]},
{id:24,name:"Court Socks Trio",cat:"Accessories",price:1490,mrp:1990,rating:4.8,reviews:512,badge:"",isNew:false,isBest:false,sizes:["OS"],colors:[{n:"Mix",h:"#0B3D2E"}],material:"Combed Cotton",fit:"UK 7-11",stock:60,tagline:"Cushioned trio. Arch support.",desc:"Three pairs of cushioned combed-cotton socks with arch compression and terry heel. Ivory, forest, sage.",care:"Machine wash.",images:[U("1586350977771-b3b0abd50c82"),U("1588850561407-ed78c282e89b")]}
];

export const LOOKS = [
{img:U("1539109136881-3be0616acf4b",1200),n:"Look 01 — Verdant Tailoring",d:"Smeraldo silk + Sartor pleats",ids:[9,17,1]},
{img:U("1492707892479-7bc8d5a4ee93",1200),n:"Look 02 — Ivory Discipline",d:"Linea oxford + tailored denim",ids:[8,19,2]},
{img:U("1515886657613-9f3515b0c78f",1200),n:"Look 03 — Forest Heavy",d:"Foresta hoodie + Vela cargo",ids:[12,18,4]},
{img:U("1524504388940-b1c1722653e1",1200),n:"Look 04 — Milano Night",d:"Leather biker + silk",ids:[14,9,1]},
{img:U("1509631179647-0177331693ae",1200),n:"Look 05 — Sage Study",d:"Piqué + linen overshirt",ids:[7,10,21]},
{img:U("1483985988355-763728e1935b",1200),n:"Look 06 — Field Craft",d:"Bosco field + heavy tee",ids:[15,5,22]}
];

export const CRAFT = [
{img:U("1528459801416-a9e53bbf4e17"),t:"240 GSM Organic Cotton",d:"Dense, pre-shrunk, bio-washed. Grown without pesticides in Gujarat."},
{img:U("1473188588951-666fce8e7c68"),t:"Full-Grain Aniline Leather",d:"1.2mm hides from Tuscany. Hand-burnished edges, 40 hours per jacket."},
{img:U("1605518216938-7c31b7b14ad0"),t:"Single-Needle Tailoring",d:"18 stitches per inch. Floating canvas. Horn & corozo buttons only."},
{img:U("1620799140408-edc6dcb6d633"),t:"Garment Dyeing",d:"Dyed after stitching for depth. Forest, sage and ivory — our house palette."}
];

export const CATEGORIES = [
  'Sneakers',
  'T-Shirts',
  'Shirts',
  'Hoodies',
  'Jackets',
  'Trousers',
  'Accessories',
];

export const CATEGORY_TILES = [
  ['Sneakers', U('1542291026-7eec264c27ff', 700)],
  ['T-Shirts', U('1521572163474-6864f9cf17ab', 700)],
  ['Shirts', U('1596755094514-f87e34085b2c', 700)],
  ['Hoodies', U('1556821840-3a63f95609a7', 700)],
  ['Jackets', U('1551028719-00167b16eac5', 700)],
  ['Trousers', U('1624378439575-d8705ad7ae80', 700)],
  ['Accessories', U('1588850561407-ed78c282e89b', 700)],
];

export const SIZE_OPTIONS = [
  'XS', 'S', 'M', 'L', 'XL',
  '30', '32', '34', '36',
  'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11',
  'OS',
];

export const COLOR_OPTIONS = ['White', 'Ivory', 'Green', 'Sage', 'Olive', 'Black', 'Sand', 'Brown'];

export const MATERIAL_OPTIONS = [
  'Cotton', 'Leather', 'Silk', 'Linen', 'Wool',
  'Denim', 'Suede', 'Canvas', 'Technical', 'Knit',
];

export const TESTIMONIALS = [
  {
    name: 'Aarav Mehta',
    city: 'Mumbai',
    quote:
      'The Court Low 07 fits like it was lasted on my foot. Three months in, the emerald burnish looks better than day one.',
  },
  {
    name: 'Rohan Kapoor',
    city: 'Delhi',
    quote:
      'Heaviest hoodie I own. The Foresta drapes like a coat. Worth every rupee — this is international quality.',
  },
  {
    name: 'Arjun Nair',
    city: 'Bengaluru',
    quote:
      'Ordered Monday, wearing Friday. Silk shirt got me four compliments in one evening. Vérant is my uniform now.',
  },
];

/** Find a single product by id (string or number). */
export const getProduct = (id) => PRODUCTS.find((p) => String(p.id) === String(id));
