// Fallback content shown until an admin saves real data into Firestore.
// Seeded from the original project's data/*.json files so the site never
// launches blank. Image paths here are the OLD local paths
// (/gallery/bridal/placeholder-1.jpg) — replace each one via the admin
// Gallery/Services/Hero panels, which upload to Firebase Storage and save
// the resulting URL here instead.

export const DEFAULT_CONTENT = {
  hero: {
    eyebrow: "SR Fashions Presents",
    headline: "Seema Boutique",
    subheadline: "Where Every Thread Tells Your Story",
    description: "Bridal wear, designer suits and party wear — hand-finished in Hamirpur for over 15 years, one fitting at a time.",
    primaryCtaLabel: "Book a Consultation",
    primaryCtaHref: "/pages/contact.html",
    secondaryCtaLabel: "View Gallery",
    secondaryCtaHref: "/pages/gallery.html",
    backgroundImage: "/gallery/bridal/placeholder-1.jpg",
  },

  services: [
    { id: "bridal-stitching", title: "Bridal Stitching", icon: "Gem", shortDescription: "Hand-finished lehengas and bridal ensembles, stitched to your exact measurements for the day that matters most.", image: "/gallery/bridal/placeholder-1.jpg" },
    { id: "designer-suits", title: "Designer Suits", icon: "Shirt", shortDescription: "Contemporary silhouettes with traditional detailing — designer suits tailored for weddings, festivals and everyday elegance.", image: "/gallery/designer/placeholder-1.jpg" },
    { id: "party-wear", title: "Party Wear", icon: "Sparkles", shortDescription: "Statement pieces for sangeets, receptions and celebrations — designed to catch the light and hold the room.", image: "/gallery/party-wear/placeholder-1.jpg" },
    { id: "alterations", title: "Alterations", icon: "Scissors", shortDescription: "Precise resizing and refitting for existing outfits, so every garment sits exactly as it should.", image: "/gallery/custom/placeholder-1.jpg" },
    { id: "measurements", title: "Measurements", icon: "Ruler", shortDescription: "In-boutique measurement sessions with a trained team, ensuring a fit that needs no second visit.", image: "/gallery/custom/placeholder-2.jpg" },
    { id: "fashion-consultation", title: "Fashion Consultation", icon: "MessageCircleHeart", shortDescription: "One-on-one styling guidance on fabric, colour and silhouette — from first sketch to final fitting.", image: "/gallery/designer/placeholder-2.jpg" },
  ],

  gallery: [
    { id: "g1", category: "bridal", title: "Regal Maroon Bridal Lehenga", image: "/gallery/bridal/placeholder-1.jpg" },
    { id: "g2", category: "bridal", title: "Gold Zari Bridal Set", image: "/gallery/bridal/placeholder-2.jpg" },
    { id: "g3", category: "bridal", title: "Classic Red Wedding Ensemble", image: "/gallery/bridal/placeholder-3.jpg" },
    { id: "g4", category: "party-wear", title: "Emerald Sequin Gown", image: "/gallery/party-wear/placeholder-1.jpg" },
    { id: "g5", category: "party-wear", title: "Sangeet Statement Outfit", image: "/gallery/party-wear/placeholder-2.jpg" },
    { id: "g6", category: "designer", title: "Contemporary Anarkali Suit", image: "/gallery/designer/placeholder-1.jpg" },
    { id: "g7", category: "designer", title: "Festive Designer Kurta Set", image: "/gallery/designer/placeholder-2.jpg" },
    { id: "g8", category: "custom-stitching", title: "Tailored Fit Session", image: "/gallery/custom/placeholder-1.jpg" },
    { id: "g9", category: "custom-stitching", title: "Precision Alteration Work", image: "/gallery/custom/placeholder-2.jpg" },
  ],

  testimonials: [
    { id: "t1", name: "Ritika Sharma", location: "Hamirpur", rating: 5, quote: "My wedding lehenga fit perfectly on the first try. Seema Boutique understood exactly what I wanted, even better than I could explain it.", occasion: "Bridal Wear" },
    { id: "t2", name: "Anjali Thakur", location: "Bilaspur", rating: 5, quote: "The designer suit I ordered for my sister's reception got compliments all evening. The stitching quality is a level above the usual shops.", occasion: "Designer Suit" },
    { id: "t3", name: "Priya Chauhan", location: "Una", rating: 5, quote: "I've been getting my alterations done here for three years. Always on time, always exact.", occasion: "Alterations" },
  ],

  about: {
    story: "Seema Boutique began as a single sewing machine in a small room in Hamirpur, built on a simple promise: every outfit should fit like it was made for exactly one person — because it was. Over the years, word of mouth turned that one room into SR Fashions' flagship boutique, known across Himachal Pradesh for bridal wear that holds its shape through a full wedding day and designer pieces that don't look like anyone else's.",
    ownerIntro: "Seema Thakur, founder and lead designer, trained in traditional hand-finishing techniques before bringing them into contemporary silhouettes. Every bridal order at the boutique still passes through her hands before it leaves the shop.",
    mission: "To give every customer a garment that fits their body and their moment — without compromise on craftsmanship, timeline, or honesty about what will and won't work.",
    vision: "To become Himachal Pradesh's most trusted name in bridal and designer wear, while staying small enough that every client is still known by name.",
    yearsOfExperience: 15,
    whyTrustUs: [
      "Every bridal outfit gets a personal fitting with the founder",
      "Transparent timelines — no last-minute surprises before your event",
      "Alterations honoured even on outfits we didn't originally stitch",
      "A decade and a half of repeat customers across three generations of the same families",
    ],
  },

  faq: [
    { id: "faq1", question: "How far in advance should I book for bridal stitching?", answer: "We recommend booking at least 2–3 months before your wedding date to allow time for measurements, fittings and detailing, especially during the peak wedding season." },
    { id: "faq2", question: "Do you provide fabric, or should I bring my own?", answer: "Both. You can bring your own fabric, or ask us during your consultation and we'll help you source fabric that suits your design and budget." },
    { id: "faq3", question: "How many fittings are usually required?", answer: "Most outfits need 2 fittings — one after initial stitching and one final fitting before delivery. Bridal wear may need a third fitting closer to the date." },
    { id: "faq4", question: "Can I get alterations done on an outfit not stitched by you?", answer: "Yes, we take in alteration work for outfits from anywhere. Bring the piece in and we'll assess the fit and timeline together." },
    { id: "faq5", question: "Do you take walk-ins or only appointments?", answer: "Walk-ins are welcome during business hours, but for bridal consultations we suggest calling ahead so we can give you undivided time." },
  ],

  settings: {
    brand: { name: "SR Fashions", boutiqueName: "Seema Boutique", tagline: "Where Every Thread Tells Your Story", established: 2009 },
    contact: {
      email: "seemaboutique@gmail.com",
      phonePrimary: "+91 86290 21516",
      phonePrimaryRaw: "918629021516",
      phoneSecondary: "+91 93115 48161",
      phoneSecondaryRaw: "919311548161",
      whatsappNumber: "918629021516",
    },
    address: "VPO Galore, Near Petrol Pump, Hamirpur, Himachal Pradesh, 177026",
    hours: "Monday – Saturday, 10:00 AM – 7:00 PM",
  },
};
