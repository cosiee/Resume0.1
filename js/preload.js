// preload.js


// export function preloadImages(imageUrls) {
//     imageUrls.forEach((url) => {
//       const img = new Image();
//       img.src = url.replace(/url\(['"]?|['"]?\)/g, ""); // Clean URL for loading
//     });
//   }
export function preloadThumbnailImages(imagesArray) {
  imagesArray.forEach((imageUrl) => {
    const img = new Image();
    img.src = imageUrl.replace("url('", "").replace("')", "");
  });
}

// lazyLoad.js
export function lazyLoadImages() {
  const lazyImages = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src; // Replace data-src with actual src
          img.removeAttribute("data-src"); // Remove attribute after loading
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => observer.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  }
}


export function preloadImages(imageIds, callback) {
  let loadedCount = 0;
  const totalImages = imageIds.length;

  imageIds.forEach((id) => {
    const imgElement = document.querySelector(id);
    if (imgElement && imgElement.getAttribute("href")) {
      const img = new Image();
      img.src = imgElement.getAttribute("href");
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          callback();
        }
      };
    } else {
      loadedCount++;
      if (loadedCount === totalImages) {
        callback();
      }
    }
  });
}

  
  export function setRandomBackgroundWithTransition(container, imagesArray) {
    const getRandomImage = (array) => array[Math.floor(Math.random() * array.length)];
  
    const newImageUrl = getRandomImage(imagesArray).replace(/url\(['"]?|['"]?\)/g, "");
    const img = new Image();
    img.src = newImageUrl;
  
    img.onload = () => {
      container.style.transition = "background-image 1s ease-in-out";
      container.style.backgroundImage = `url('${newImageUrl}')`;
    };
  
    const randomInterval = Math.random() * (12000 - 5000) + 5000; // 5s-12s
    setTimeout(() => setRandomBackgroundWithTransition(container, imagesArray), randomInterval);
  }
  