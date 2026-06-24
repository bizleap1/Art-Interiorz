export type GalleryCategory =
  | "All"
  | "BedRoom"
  | "Modular Kitchen"
  | "Living Room"
  | "Others";

export type GalleryItem = {
  id: string;
  src: string;
  category: Exclude<GalleryCategory, "All">;
  alt: string;
};

export const galleryCategories: readonly GalleryCategory[] = [
  "All",
  "BedRoom",
  "Modular Kitchen",
  "Living Room",
  "Others",
];

export const galleryItems: GalleryItem[] = [
  // --- NEW IMAGES ---
  { id: "new-br-1", src: "/assets/portfolio/new/BEDROOM 3.1.jpg", category: "BedRoom", alt: "Bedroom 3" },
  { id: "new-br-2", src: "/assets/portfolio/new/BEDROOM1.3..jpg", category: "BedRoom", alt: "Bedroom 1" },
  { id: "new-br-3", src: "/assets/portfolio/new/BEDROOM2.2.jpg", category: "BedRoom", alt: "Bedroom 2" },
  { id: "new-br-4", src: "/assets/portfolio/new/BEDROOM2.3.jpg", category: "BedRoom", alt: "Bedroom 2" },
  { id: "new-br-5", src: "/assets/portfolio/new/KIDS BR 4.JPG", category: "BedRoom", alt: "Kids Bedroom" },
  { id: "new-br-6", src: "/assets/portfolio/new/MASTER BR 3.JPG", category: "BedRoom", alt: "Master Bedroom" },

  { id: "new-mk-2", src: "/assets/portfolio/new/KITCHENDINING2.jpg.jpeg", category: "Modular Kitchen", alt: "Kitchen Dining 2" },

  { id: "new-mk-3", src: "/assets/portfolio/new/KITCHENDINING3.jpg.jpeg", category: "Modular Kitchen", alt: "Kitchen Dining 3" },
  { id: "new-mk-4", src: "/assets/portfolio/new/KITCHENDINING4.jpg.jpeg", category: "Modular Kitchen", alt: "Kitchen Dining 4" },
  { id: "new-mk-5", src: "/assets/portfolio/new/KITCHENDINING5.jpg.jpeg", category: "Modular Kitchen", alt: "Kitchen Dining 5" },

  { id: "new-lr-1", src: "/assets/portfolio/new/LIVING 1.JPG", category: "Living Room", alt: "Living Room 1" },
  { id: "new-lr-2", src: "/assets/portfolio/new/LIVING 2.1.JPG", category: "Living Room", alt: "Living Room 2" },
  { id: "new-lr-3", src: "/assets/portfolio/new/LIVING ROOM 1.jpg.jpeg", category: "Living Room", alt: "Living Room 3" },
  { id: "new-lr-4", src: "/assets/portfolio/new/LIVING ROOM1.1.jpg", category: "Living Room", alt: "Living Room 4" },
  { id: "new-lr-5", src: "/assets/portfolio/new/LIVING ROOM1.8.jpg", category: "Living Room", alt: "Living Room 5" },

  { id: "new-ot-1", src: "/assets/portfolio/new/BALCONY4.jpg.jpeg", category: "Others", alt: "Balcony" },
  { id: "new-ot-2", src: "/assets/portfolio/new/DINING 1.1.JPG", category: "Others", alt: "Dining 1" },
  { id: "new-ot-3", src: "/assets/portfolio/new/DINING 2.1.JPG", category: "Others", alt: "Dining 2" },
  { id: "new-ot-4", src: "/assets/portfolio/new/DINING 3.1.JPG", category: "Others", alt: "Dining 3" },
  { id: "new-ot-5", src: "/assets/portfolio/new/ENTRANCE 1.JPG", category: "Others", alt: "Entrance" },
  { id: "new-ot-6", src: "/assets/portfolio/new/IMG_7643.jpg.jpeg", category: "Others", alt: "Other Design" },
  { id: "new-ot-7", src: "/assets/portfolio/new/IMG_7644.jpg.jpeg", category: "Others", alt: "Other Design" },
  { id: "new-ot-8", src: "/assets/portfolio/new/IMG_7645.jpg.jpeg", category: "Others", alt: "Other Design" },
  { id: "new-ot-9", src: "/assets/portfolio/new/IMG_7648.jpg.jpeg", category: "Others", alt: "Other Design" },
  { id: "new-ot-10", src: "/assets/portfolio/new/IMG_7653.jpg.jpeg", category: "Others", alt: "Other Design" },
  { id: "new-ot-11", src: "/assets/portfolio/new/IMG_7654.jpg.jpeg", category: "Others", alt: "Other Design" },
  { id: "new-ot-12", src: "/assets/portfolio/new/IMG_7679.jpg.jpeg", category: "Others", alt: "Other Design" },

];
