export interface StallCatalogItem {
    name: string
    price: number
}

export interface Stall {
    title: string
    category: string
    badge: string
    zone: string
    image: string
    subtitle: string
    summary: string
    description: string
    verified: boolean
    catalog: StallCatalogItem[]
}

export type ArtistCategory = "Singers" | "Dancers" | "Performers"

export interface Artist {
    name: string
    role: string
    category: ArtistCategory
    image: string
    heroImage: string
    badge: string
    tagline: string
    summary: string
    bio: string
    phone: string
    email: string
    location: string
    ctaLabel: string
}

export const STALLS_DATA: Stall[] = [
    {
        title: "Twinkle Tales",
        category: "Accessories",
        badge: "Accessories",
        zone: "Zone A-12",
        image: "/jewelry-and-accessories-shop.jpg",
        subtitle: "Curated sparkle with local character",
        summary: "Handcrafted jewelry and keepsake finds sourced from independent Vizag makers.",
        description:
            "Handcrafted jewelry and keepsake finds sourced from independent Vizag makers, styled for shoppers looking for one-of-a-kind pieces with a polished festival finish.",
        verified: true,
        catalog: [
            { name: "Temple Earrings", price: 420 },
            { name: "Pearl Hair Pins", price: 180 },
            { name: "Shell Bracelets", price: 260 },
            { name: "Keepsake Box", price: 340 },
        ],
    },
    {
        title: "Taste Town",
        category: "Food",
        badge: "Food",
        zone: "Zone B-04",
        image: "/delicious-street-food-stall.jpg",
        subtitle: "Gourmet Street Food Redefined",
        summary: "Artisanal fusion cuisine and organic treats prepared fresh using locally sourced ingredients.",
        description:
            "Artisanal fusion cuisine and organic treats prepared fresh using locally sourced ingredients from Vizag farms.",
        verified: true,
        catalog: [
            { name: "Gourmet Burger", price: 280 },
            { name: "Peri-Peri Fries", price: 120 },
            { name: "Loaded Nachos", price: 190 },
            { name: "Aura Drinks", price: 100 },
        ],
    },
    {
        title: "Handmade Haven",
        category: "Crafts",
        badge: "Crafts",
        zone: "Zone C-04",
        image: "/handmade-crafts-and-plushies.jpg",
        subtitle: "Textures, threads, and studio-made warmth",
        summary: "Soft decor, crochet collectibles, and hand-loomed accents that bring comfort home.",
        description:
            "Sustainable home decor and hand-loomed textiles designed for thoughtful gifting, cozy living spaces, and shoppers who want artisan-made textures over mass-produced pieces.",
        verified: true,
        catalog: [
            { name: "Crochet Plush Duo", price: 540 },
            { name: "Loomed Throw", price: 780 },
            { name: "Table Runner", price: 360 },
            { name: "Mini Wall Hanging", price: 290 },
        ],
    },
    {
        title: "Carnival Compass",
        category: "Games",
        badge: "Games",
        zone: "Zone D-02",
        image: "/colorful-board-game-or-carnival-game.jpg",
        subtitle: "Festival-ready play for every age group",
        summary: "Interactive tabletop games and carnival picks designed to keep families circulating longer.",
        description:
            "Interactive tabletop games and carnival picks curated for family crowds, repeat rounds, and walk-up engagement that keeps the lane lively throughout the evening.",
        verified: true,
        catalog: [
            { name: "Skill Challenge Pass", price: 150 },
            { name: "Family Play Bundle", price: 320 },
            { name: "Prize Wheel Entry", price: 90 },
            { name: "Arcade Token Pack", price: 140 },
        ],
    },
]

export const ARTISTS: Artist[] = [
    {
        name: "Maritza Correa",
        role: "Electro-Pop Singer",
        category: "Singers",
        image: "/image 6.png",
        heroImage: "/band-on-stage.png",
        badge: "Featured",
        tagline: "Electro-pop vocals built for high-energy festival singalongs",
        summary: "Bright stage visuals, multilingual hooks, and a polished sunset headline set.",
        bio: "A stage-forward electro-pop singer known for big singalong choruses, sharp visual styling, and festival sets that move from soft intros to full crowd-release moments.",
        phone: "+91 98765 43210",
        email: "booking@maritzacorrea.com",
        location: "Sunset Stage",
        ctaLabel: "Confirm Booking",
    },
    {
        name: "Ananya Vale",
        role: "Indie Soul Singer",
        category: "Singers",
        image: "https://i.pravatar.cc/300?img=5",
        heroImage: "/event_hero_landing.png",
        badge: "Curated",
        tagline: "Soulful live sets with crowd-led acoustic transitions",
        summary: "Warm vocals, acoustic breakdowns, and a mellow-first set that scales to the main stage.",
        bio: "An indie-soul vocalist with a reputation for intimate crowd control, live arrangement flexibility, and bilingual sets tuned for evening festival audiences.",
        phone: "+91 99880 11223",
        email: "hello@ananyavale.com",
        location: "Harbor Stage",
        ctaLabel: "Confirm Booking",
    },
    {
        name: "Rhythm Nova",
        role: "Contemporary Dance Crew",
        category: "Dancers",
        image: "https://i.pravatar.cc/300?img=32",
        heroImage: "/event_hero_landing.png",
        badge: "Crowd Favorite",
        tagline: "Precision choreography with cinematic lighting cues",
        summary: "Sharp ensemble movement, dynamic formations, and adaptable sets for festival openers.",
        bio: "A contemporary dance crew delivering cinematic group choreography, crowd-hyping transitions, and adaptable set lengths that fit both headline openings and interval programming.",
        phone: "+91 99112 77654",
        email: "team@rhythmnova.in",
        location: "Lakefront Arena",
        ctaLabel: "Confirm Booking",
    },
    {
        name: "Neon Footwork",
        role: "Street Dance Collective",
        category: "Dancers",
        image: "https://i.pravatar.cc/300?img=47",
        heroImage: "/band-on-stage.png",
        badge: "High Energy",
        tagline: "Urban choreography engineered for wide crowd visibility",
        summary: "Fast visual impact, break-led transitions, and bold movement that plays well on large stages.",
        bio: "An urban dance collective specializing in hip-hop and freestyle fusion, built around visual hits, bold entries, and high-visibility routines for large festival audiences.",
        phone: "+91 98490 33445",
        email: "bookings@neonfootwork.com",
        location: "Main Stage",
        ctaLabel: "Confirm Booking",
    },
    {
        name: "The Illusionist",
        role: "Theatrical Illusion Performer",
        category: "Performers",
        image: "https://i.pravatar.cc/300?img=15",
        heroImage: "/event_poster_music.png",
        badge: "Featured",
        tagline: "Large-scale visual magic designed for headline festival slots",
        summary: "Stage illusion, dramatic reveals, and a premium production style for prime-time audiences.",
        bio: "Cutting-edge theatrical magic and large-scale illusions designed to captivate massive festival audiences.",
        phone: "+1 234 567 892",
        email: "magic@theillusionist.com",
        location: "Prime Time Slot",
        ctaLabel: "Confirm Booking",
    },
    {
        name: "Echo Circus",
        role: "Immersive Stage Performer",
        category: "Performers",
        image: "https://i.pravatar.cc/300?img=18",
        heroImage: "/event_hero_landing.png",
        badge: "Signature Act",
        tagline: "Atmospheric movement, props, and crowd-responsive staging",
        summary: "A hybrid live act blending narrative performance, props, and movement-led spectacle.",
        bio: "A hybrid performance act combining atmospheric movement, theatrical props, and audience-responsive staging to create memorable festival set pieces between headline acts.",
        phone: "+91 97004 55667",
        email: "studio@echocircus.live",
        location: "Festival Circle",
        ctaLabel: "Confirm Booking",
    },
]
