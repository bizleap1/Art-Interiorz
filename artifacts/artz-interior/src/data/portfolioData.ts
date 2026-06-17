export type ProjectCategory = "Residential" | "Hospitality" | "Kitchen" | "Renovation";

export type Project = {
  img: string;
  title: string;
  category: ProjectCategory;
  location: string;
  description?: string;
  span?: string;
};

export const portfolioData = {
  label: "Selected Work",
  heading: {
    prefix: "Portfolio of",
    emphasis: "considered",
    suffix: "interiors.",
  },
  categories: ["All", "Residential", "Hospitality", "Kitchen", "Renovation"] as const,
  projects: [
    {
      img: "/assets/livingroom.jpg",
      title: "Sterling Living Room",
      category: "Residential" as ProjectCategory,
      location: "Manish Nagar, Nagpur",
      description: "A warm, layered living room with bespoke joinery, curated art and a palette of ivory, gold and charcoal.",
      span: "md:row-span-2",
    },
    {
      img: "/assets/kitchen.jpg",
      title: "Ivory Modular Kitchen",
      category: "Kitchen" as ProjectCategory,
      location: "Somalwada, Nagpur",
      description: "An L-shaped modular kitchen with premium quartz countertops and brushed brass fittings.",
    },
    {
      img: "/assets/dinning.jpg",
      title: "Grand Hotel Lobby",
      category: "Hospitality" as ProjectCategory,
      location: "Civil Lines, Nagpur",
      description: "A statement hospitality lobby with travertine flooring, layered lighting and curated art installations.",
      span: "md:row-span-2",
    },
    {
      img: "/assets/bedroom.jpg",
      title: "Master Bedroom Suite",
      category: "Residential" as ProjectCategory,
      location: "Shilpa Nagar, Nagpur",
      description: "A serene master bedroom with panelled walls, mood lighting and custom wardrobe design.",
    },
    {
      img: "/assets/modularkitchen.webp",
      title: "Modern Home Renovation",
      category: "Renovation" as ProjectCategory,
      location: "Dharampeth, Nagpur",
      description: "A full-home renovation that blends contemporary design with the character of an older Nagpur bungalow.",
    },
    {
      img: "/assets/hero.jpg",
      title: "The Arora Dining Room",
      category: "Hospitality" as ProjectCategory,
      location: "Wardha Road, Nagpur",
      description: "A signature restaurant dining space with custom millwork, warm lighting and artisan tile work.",
    },
  ] as Project[],
};
