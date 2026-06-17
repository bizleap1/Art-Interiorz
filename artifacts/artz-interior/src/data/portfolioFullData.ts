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
];

export const galleryItems: GalleryItem[] = [
  { id: "br-1", src: "/assets/bedroom.jpg", category: "BedRoom", alt: "Master bedroom design" },
  { id: "br-2", src: "/assets/modularkitchen.webp", category: "BedRoom", alt: "Bedroom interior with wardrobe" },
  { id: "br-3", src: "/assets/livingroom.jpg", category: "BedRoom", alt: "Modern bedroom layout" },
  { id: "br-4", src: "/assets/hero.jpg", category: "BedRoom", alt: "Luxury bedroom suite" },
  // { id: "br-5",  src: "/assets/portfolio/bedroom/3-1.webp", category: "BedRoom", alt: "Kids bedroom design" },
  { id: "br-6", src: "/assets/portfolio/bedroom/b1.webp", category: "BedRoom", alt: "Guest bedroom1" },
  // { id: "br-7", src: "/assets/portfolio/bedroom/b2.webp", category: "BedRoom", alt: "Guest bedroom2" },
  { id: "br-8", src: "/assets/portfolio/bedroom/b3.webp", category: "BedRoom", alt: "Guest bedroom3" },
  { id: "br-9", src: "/assets/portfolio/bedroom/b4.webp", category: "BedRoom", alt: "Guest bedroom4" },
  { id: "br-10", src: "/assets/portfolio/bedroom/b5.webp", category: "BedRoom", alt: "Guest bedroom5" },
  // { id: "br-11", src: "/assets/portfolio/bedroom/b6.webp", category: "BedRoom", alt: "Guest bedroom6" },
  { id: "br-12", src: "/assets/portfolio/bedroom/b7.webp", category: "BedRoom", alt: "Guest bedroom7" },
  { id: "br-13", src: "/assets/portfolio/bedroom/b8.webp", category: "BedRoom", alt: "Guest bedroom8" },
  { id: "br-14", src: "/assets/portfolio/bedroom/b9.webp", category: "BedRoom", alt: "Guest bedroom9" },
  { id: "br-15", src: "/assets/portfolio/bedroom/b10.webp", category: "BedRoom", alt: "Guest bedroom10" },
  { id: "br-16", src: "/assets/portfolio/bedroom/b11.webp", category: "BedRoom", alt: "Guest bedroom11" },
  { id: "br-17", src: "/assets/portfolio/bedroom/b12.webp", category: "BedRoom", alt: "Guest bedroom12" },
  { id: "br-18", src: "/assets/portfolio/bedroom/b13.jpg", category: "BedRoom", alt: "Guest bedroom13" },
  { id: "br-19", src: "/assets/portfolio/bedroom/b14.webp", category: "BedRoom", alt: "Guest bedroom14" },
  { id: "br-20", src: "/assets/portfolio/bedroom/b15.webp", category: "BedRoom", alt: "Guest bedroom15" },
  { id: "br-21", src: "/assets/portfolio/bedroom/b16.webp", category: "BedRoom", alt: "Guest bedroom16" },
  { id: "br-22", src: "/assets/portfolio/bedroom/b17.webp", category: "BedRoom", alt: "Guest bedroom17" },
  { id: "br-23", src: "/assets/portfolio/bedroom/b18.webp", category: "BedRoom", alt: "Guest bedroom18" },
  { id: "br-24", src: "/assets/portfolio/bedroom/b19.webp", category: "BedRoom", alt: "Guest bedroom19" },
  { id: "br-25", src: "/assets/portfolio/bedroom/b20.webp", category: "BedRoom", alt: "Guest bedroom20" },
  { id: "br-26", src: "/assets/portfolio/bedroom/b21.webp", category: "BedRoom", alt: "Guest bedroom21" },
  { id: "br-27", src: "/assets/portfolio/bedroom/b22.webp", category: "BedRoom", alt: "Guest bedroom22" },
  { id: "br-28", src: "/assets/portfolio/bedroom/b23.webp", category: "BedRoom", alt: "Guest bedroom23" },
  { id: "br-29", src: "/assets/portfolio/bedroom/b18.webp", category: "BedRoom", alt: "Guest bedroom24" },


  { id: "mk-1", src: "/assets/portfolio/modular-kitchen/mk1.webp", category: "Modular Kitchen", alt: "L-shaped modular kitchen" },
  { id: "mk-2", src: "/assets/portfolio/modular-kitchen/mk2.webp", category: "Modular Kitchen", alt: "Open kitchen design" },
  { id: "mk-3", src: "/assets/portfolio/modular-kitchen/mk3.webp", category: "Modular Kitchen", alt: "Parallel kitchen layout" },
  { id: "mk-4", src: "/assets/portfolio/modular-kitchen/mk4.webp", category: "Modular Kitchen", alt: "U-shaped modular kitchen1" },
  { id: "mk-5", src: "/assets/portfolio/modular-kitchen/mk5.webp", category: "Modular Kitchen", alt: "Modern kitchen interior1" },
  // { id: "mk-6", src: "/assets/portfolio/modular-kitchen/mk6.webp", category: "Modular Kitchen", alt: "Premium kitchen finish1" },
  { id: "mk-7", src: "/assets/portfolio/modular-kitchen/mk7.webp", category: "Modular Kitchen", alt: "Parallel kitchen layout1" },
  // { id: "mk-8", src: "/assets/portfolio/modular-kitchen/mk8.webp", category: "Modular Kitchen", alt: "U-shaped modular kitchen2" },
  { id: "mk-9", src: "/assets/portfolio/modular-kitchen/mk9.webp", category: "Modular Kitchen", alt: "Modern kitchen interior2" },
  { id: "mk-10", src: "/assets/portfolio/modular-kitchen/mk10.webp", category: "Modular Kitchen", alt: "Premium kitchen finish2" },


  // { id: "lr-1", src: "/assets/portfolio/living-room/lr1.webp", category: "Living Room", alt: "Contemporary living room" },
  { id: "lr-2", src: "/assets/portfolio/living-room/lr2.webp", category: "Living Room", alt: "Living room with TV unit" },
  { id: "lr-3", src: "/assets/portfolio/living-room/lr3.webp", category: "Living Room", alt: "Open-plan living area1" },
  { id: "lr-4", src: "/assets/portfolio/living-room/lr4.webp", category: "Living Room", alt: "Living room lighting design" },
  { id: "lr-5", src: "/assets/portfolio/living-room/lr5.webp", category: "Living Room", alt: "Compact living room" },
  { id: "lr-6", src: "/assets/portfolio/living-room/lr6.webp", category: "Living Room", alt: "Living room with feature wall" },
  { id: "lr-7", src: "/assets/portfolio/living-room/lr7.webp", category: "Living Room", alt: "Open-plan living area2" },
  { id: "lr-8", src: "/assets/portfolio/living-room/lr8.webp", category: "Living Room", alt: "Living room lighting design" },
  { id: "lr-9", src: "/assets/portfolio/living-room/lr9.webp", category: "Living Room", alt: "Compact living room" },
  { id: "lr-10", src: "/assets/portfolio/living-room/lr10.webp", category: "Living Room", alt: "Living room with feature wall" },
  // { id: "lr-11", src: "/assets/portfolio/living-room/lr11.webp", category: "Living Room", alt: "Open-plan living area3" },
  { id: "lr-12", src: "/assets/portfolio/living-room/lr12.webp", category: "Living Room", alt: "Living room lighting design" },
  { id: "lr-13", src: "/assets/portfolio/living-room/lr13.webp", category: "Living Room", alt: "Compact living room" },
  { id: "lr-14", src: "/assets/portfolio/living-room/lr14.webp", category: "Living Room", alt: "Living room with feature wall" },
  { id: "lr-15", src: "/assets/portfolio/living-room/lr15.webp", category: "Living Room", alt: "Open-plan living area4" },
  { id: "lr-16", src: "/assets/portfolio/living-room/lr16.webp", category: "Living Room", alt: "Living room lighting design" },
  { id: "lr-17", src: "/assets/portfolio/living-room/lr17.webp", category: "Living Room", alt: "Compact living room" },
  { id: "lr-18 ", src: "/assets/portfolio/living-room/lr18.webp", category: "Living Room", alt: "Living room with feature wall" },
  { id: "lr-19", src: "/assets/portfolio/living-room/lr19.webp", category: "Living Room", alt: "Open-plan living area5" },
  { id: "lr-20", src: "/assets/portfolio/living-room/lr20.webp", category: "Living Room", alt: "Living room lighting design" },



  { id: "ot-1", src: "/assets/portfolio/others/ot1.webp", category: "Others", alt: "Entrance foyer design" },
  { id: "ot-2", src: "/assets/portfolio/others/ot2.webp", category: "Others", alt: "Dining area" },
  { id: "ot-3", src: "/assets/portfolio/others/ot3.webp", category: "Others", alt: "Balcony design" },
  { id: "ot-4", src: "/assets/portfolio/others/ot4.webp", category: "Others", alt: "Home theatre room" },
  { id: "ot-5", src: "/assets/portfolio/others/ot5.webp", category: "Others", alt: "Custom furniture unit" },
  { id: "ot-6", src: "/assets/portfolio/others/ot6.webp", category: "Others", alt: "Study & workstation" },
  { id: "ot-7", src: "/assets/portfolio/others/ot7.webp", category: "Others", alt: "Other design" },
  { id: "ot-8", src: "/assets/portfolio/others/ot8.webp", category: "Others", alt: "Other design" },
  { id: "ot-9", src: "/assets/portfolio/others/ot9.webp", category: "Others", alt: "Other design" },
  { id: "ot-10", src: "/assets/portfolio/others/ot10.webp", category: "Others", alt: "Other design" },
  { id: "ot-11", src: "/assets/portfolio/others/ot11.webp", category: "Others", alt: "Other design" },
];
