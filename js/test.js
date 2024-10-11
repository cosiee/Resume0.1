// Function to observe size changes of an element
function observeSizeChanges(element) {
  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const { width, height } = entry.contentRect;
      console.log(`Element resized:`, entry.target);
      console.log(`New dimensions: Width = ${width}px, Height = ${height}px`);
    });
  });

  // Start observing the element for size changes
  resizeObserver.observe(element);
}

// Function to observe multiple elements by their selectors
function observeMultipleElements(selectors) {
  selectors.forEach(selector => {
    // Query all elements matching the selector
    const elements = document.querySelectorAll(selector);

    // Check if there are matching elements
    if (elements.length > 0) {
      elements.forEach(element => {
        observeSizeChanges(element);  // Call the function to observe size changes
      });
    } else {
      console.warn(`Element not found: ${selector}`);
    }
  });
}

// Wait for the DOM content to load before observing elements
document.addEventListener("DOMContentLoaded", () => {
  const elementsToObserve = [
    // 'body',            // Monitor the <body> tag
    // '.navbar',         // Navbar
    '.svg-container',  // SVG container
    // '.thumbnails',     // Thumbnails container
    // '.modalbox',       // Modal box
    // '.formDiv'         // Form container
  ];

  // Call the function to start observing elements
  observeMultipleElements(elementsToObserve);
});


// let counter = 0;

// const timer = setInterval(() => {
//   console.log(`Timer: ${counter} seconds`);
//   counter++;
// }, 1000);

document.addEventListener("DOMContentLoaded", () => {
  const svgContainer = document.querySelector('.svg-container');
  
  if (svgContainer) {
    // Get the initial width and height after the page has loaded
    const initialWidth = svgContainer.offsetWidth;
    const initialHeight = svgContainer.offsetHeight;

    // Set the size explicitly so it does not change during scroll
    svgContainer.style.width = `${initialWidth}px`;
    svgContainer.style.height = `${initialHeight}px`;
    
    console.log(`Initial size locked: Width = ${initialWidth}px, Height = ${initialHeight}px`);
  }
});


// document.addEventListener("DOMContentLoaded", () => {
//   const svgContainer = document.querySelector('.svg-container');
  
//   if (svgContainer) {
//     const resizeObserver = new ResizeObserver(entries => {
//       entries.forEach(entry => {
//         const { width, height } = entry.contentRect;
//         console.log(`svg-container resized: Width = ${width}px, Height = ${height}px`);
//       });
//     });
//     resizeObserver.observe(svgContainer);
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const scrollDist = document.querySelector('.scrollDist');

  if (scrollDist) {
    // 1. Monitor size changes using ResizeObserver
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const { width, height } = entry.contentRect;
        console.log(`.scrollDist resized: Width = ${width}px, Height = ${height}px`);
      });
    });

    resizeObserver.observe(scrollDist);

    // 2. Monitor visibility changes using IntersectionObserver
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('.scrollDist is now visible in the viewport');
        } else {
          console.log('.scrollDist is now out of the viewport');
        }
      });
    });

    intersectionObserver.observe(scrollDist);

    // 3. Monitor attribute changes using MutationObserver
    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
          console.log(`.scrollDist attribute "${mutation.attributeName}" changed`);
        }
      });
    });

    mutationObserver.observe(scrollDist, {
      attributes: true, // Monitor attribute changes
      attributeFilter: ['style', 'class'], // Only monitor class and style attribute changes
    });

  } else {
    console.warn('.scrollDist element not found');
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Monitor and lock initial size for .svg-container
  const svgContainer = document.querySelector('.svg-container');
  
  if (svgContainer) {
    const initialWidth = svgContainer.offsetWidth;
    const initialHeight = svgContainer.offsetHeight;

    // Lock size
    svgContainer.style.width = `${initialWidth}px`;
    svgContainer.style.height = `${initialHeight}px`;
    
    console.log(`Initial size locked for .svg-container: Width = ${initialWidth}px, Height = ${initialHeight}px`);
  } else {
    console.warn('.svg-container element not found');
  }

  // Monitor and lock initial size for .scrollDist
  const scrollDist = document.querySelector('.scrollDist');

  if (scrollDist) {
    const initialScrollDistWidth = scrollDist.offsetWidth;
    const initialScrollDistHeight = scrollDist.offsetHeight;

    // Lock size
    scrollDist.style.width = `${initialScrollDistWidth}px`;
    scrollDist.style.height = `${initialScrollDistHeight}px`;
    
    console.log(`Initial size locked for .scrollDist: Width = ${initialScrollDistWidth}px, Height = ${initialScrollDistHeight}px`);
  } else {
    console.warn('.scrollDist element not found');
  }
});
