// Displays WIP message
export function showWip() {
    updateWIPDimensions(endTopY - 4);
    updateDimensionsNoMargins();
    document.getElementById("wip").style.display = "block";
    document.getElementById("contactForm").style.display = "none";
  }
  
  // Hides WIP message
  export function hideWip() {
    document.getElementById("wip").style.display = "none";
  }