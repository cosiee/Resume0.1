// Function to output the height of the .scrollDist element
function outputScrollDistHeight() {
  const scrollDist = document.querySelector('.scrollDist');
  if (scrollDist) {
    console.log("Current scrollDist height:", scrollDist.offsetHeight + "px");
  }
}

// Add event listener to call the function on window resize
window.addEventListener('resize', outputScrollDistHeight);

// Initial call to log the height when the page loads
outputScrollDistHeight();
