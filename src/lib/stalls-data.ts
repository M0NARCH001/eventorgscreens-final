export interface Stall {
    title: string;
    category: string;
    image: string;
}

export interface Artist {
    name: string;
    role: string;
    image: string;
}

// Helper function to generate random items
export const generateRandomItems = () => {
    const items = [
        { name: "Chains", price: 150 },
        { name: "Bows", price: 80 },
        { name: "Bracelets", price: 50 },
        { name: "Claw clips", price: 60 },
        { name: "Scrunchies", price: 40 },
        { name: "Earrings", price: 120 },
        { name: "Rings", price: 90 },
        { name: "Necklaces", price: 200 },
    ];

    // Shuffle and pick 3-5 random items
    const shuffled = items.sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 3) + 3; // 3 to 5 items
    return shuffled.slice(0, count);
};

export const STALLS_DATA: Stall[] = [
    {
        title: "Twinkle Tales",
        category: "Accessories",
        image: "/jewelry-and-accessories-shop.jpg",
    },
    {
        title: "Taste Town",
        category: "Food",
        image: "/delicious-street-food-stall.jpg",
    },
    {
        title: "Handmade Haven",
        category: "Crafts",
        image: "/handmade-crafts-and-plushies.jpg",
    },
    {
        title: "Melody Makers",
        category: "Live Music",
        image: "/band-on-stage.png",
    },
    {
        title: "Fun Zone",
        category: "Gaming",
        image: "/colorful-board-game-or-carnival-game.jpg",
    },
    {
        title: "LEGENDS of hip-Hop",
        category: "Music",
        image: "/hip-hop-concert-poster.jpg",
    },
];

export const ARTISTS: Artist[] = [
    {
        name: "Taylor Swift",
        role: "Singer",
        image: "https://i.pravatar.cc/300?img=5",
    },
    {
        name: "Rihanna",
        role: "Singer",
        image: "https://i.pravatar.cc/300?img=9",
    },
    {
        name: "Lady Gaga",
        role: "Singer",
        image: "https://i.pravatar.cc/300?img=3",
    },
    {
        name: "Ed Sheeran",
        role: "Singer",
        image: "https://i.pravatar.cc/300?img=12",
    },
    {
        name: "Dua Lipa",
        role: "Singer",
        image: "https://i.pravatar.cc/300?img=16",
    },
    {
        name: "Adele",
        role: "Singer",
        image: "https://i.pravatar.cc/300?img=20",
    },
    {
        name: "Olivia Rodrigo",
        role: "Singer",
        image: "https://i.pravatar.cc/300?img=24",
    },
    {
        name: "Pitbull",
        role: "Rapper",
        image: "https://i.pravatar.cc/300?img=33",
    },
];
