// High-priority images for preloading
export const prioritizedImages = [
    "#sky",
    "#mountMgF",
    "#mountFg",
    "#cloud1",
    "#mountBg",
    "#mountBg2",
    "#meElement",
  ];
  
  export function getDomElements() {
    return {
      thumbnailsContainer: document.querySelector("#thumbnails"), // Add this line
      svg: document.querySelector("#svg"),
      cloud1: document.getElementById("cloud1"),
      thumbElement: document.querySelector(".thumbShape"),
      thumbNails: document.querySelector(".thumbnails"),
      seeText: document.querySelector("#see"),
      down: document.querySelector("#down"),
      meElement: document.getElementById("me"),
      meShaker: document.getElementById("meshaker"),
    };
  }
  
  
  
  // Thumbnail images for lazy loading or background transitions
  export const thumbnailImages = [
    ...[
      "url('css/assets/b1.webp')",
      "url('css/assets/b2.webp')",
      "url('css/assets/b3.webp')",
      "url('css/assets/b4.webp')",
      "url('css/assets/b5.webp')",
      "url('css/assets/b6.webp')",
      "url('css/assets/b7.webp')",
      "url('css/assets/b8.webp')",
      "url('css/assets/b9.webp')",
      "url('css/assets/b10.webp')",
      "url('css/assets/b12.webp')",
      "url('css/assets/b13.webp')",
      "url('css/assets/b14.webp')",
    ],
    ...[
      "url('css/assets/r1.webp')",
      "url('css/assets/r2.webp')",
      "url('css/assets/r3.webp')",
      "url('css/assets/r4.webp')",
      "url('css/assets/r5.webp')",
      "url('css/assets/r6.webp')",
      "url('css/assets/r7.webp')",
      "url('css/assets/r8.webp')",
      "url('css/assets/r9.webp')",
      "url('css/assets/r10.webp')",
      "url('css/assets/r11.webp')",
      "url('css/assets/r12.webp')",
    ],
    ...[
      "url('css/assets/g1.webp')",
      "url('css/assets/g2.webp')",
      "url('css/assets/g3.webp')",
      "url('css/assets/g4.webp')",
      "url('css/assets/g5.webp')",
      "url('css/assets/g6.webp')",
      "url('css/assets/g7.webp')",
      "url('css/assets/g8.webp')",
      "url('css/assets/g9.webp')",
      "url('css/assets/g10.webp')",
    ],
    ...[
      "url('css/assets/y1.webp')",
      "url('css/assets/y2.webp')",
      "url('css/assets/y3.webp')",
      "url('css/assets/y4.webp')",
      "url('css/assets/y5.webp')",
      "url('css/assets/y6.webp')",
      "url('css/assets/y7.webp')",
      "url('css/assets/y8.webp')",
      "url('css/assets/y9.webp')",
      "url('css/assets/y10.webp')",
      "url('css/assets/y11.webp')",
    ],
  ];
  
