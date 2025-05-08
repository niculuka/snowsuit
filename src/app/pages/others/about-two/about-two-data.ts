interface IconBox {
    adClass: string;
    icon: string;
    title: string;
    content: string;
}

interface Counter {
    limit: number;
    text: string;
    unit?: string;
}

export const iconBoxes: IconBox[] = [
    {
        adClass: "icon-box icon-box-sm text-center",
        icon: "icon-puzzle-piece",
        title: "Design și Calitate",
        content: "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero <br>eu augue."
    },
    {
        adClass: "icon-box icon-box-sm text-center",
        icon: "icon-life-ring",
        title: "Suport Profesional",
        content: "Praesent dapibus, neque id cursus faucibus, <br>tortor neque egestas augue, eu vulputate <br>magna eros eu erat. "
    },
    {
        adClass: "icon-box icon-box-sm text-center",
        icon: "icon-heart-o",
        title: "Făcute din Dragoste",
        content: "Pellentesque a diam sit amet mi ullamcorper <br>vehicula. Nullam quis massa sit amet <br>nibh viverra malesuada."
    }
]

export const counters: Counter[] = [
    {
        limit: 4000,
        text: "Clienți Fericiți",
        unit: "k+"
    },
    {
        limit: 20,
        text: "Ani în business",
        unit: "+"
    },
    {
        limit: 5,
        text: "Retur Clienți",
        unit: "%"
    },
    {
        limit: 15,
        text: "Câștig Garantat"
    }
]

export const brands = [
    {
        name: "brand",
        image: "assets/images/brands/1.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/2.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/3.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/4.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/5.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/6.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/7.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/8.png"
    },
    {
        name: "brand",
        image: "assets/images/brands/9.png"
    }
]

export const members = [
    {
        img: "assets/images/team/about-2/member-1.jpg",
        name: "Samanta Grey",
        title: "Founder & CEO"
    },
    {
        img: "assets/images/team/about-2/member-2.jpg",
        name: "Bruce Sutton",
        title: "Sales & Marketing Manager"
    },
    {
        img: "assets/images/team/about-2/member-3.jpg",
        name: "Janet Joy",
        title: "Product Manager"
    },
    {
        img: "assets/images/team/about-2/member-4.jpg",
        name: "Mark Pocket",
        title: "Product Manager"
    },
    {
        img: "assets/images/team/about-2/member-5.jpg",
        name: "Damion Blue",
        title: "Sales & Marketing Manager"
    },
    {
        img: "assets/images/team/about-2/member-6.jpg",
        name: "Lenard Smith",
        title: "Product Manager"
    },
    {
        img: "assets/images/team/about-2/member-7.jpg",
        name: "Rachel Green",
        title: "Product Manager"
    },
    {
        img: "assets/images/team/about-2/member-8.jpg",
        name: "David Doe",
        title: "Product Manager"
    }
]