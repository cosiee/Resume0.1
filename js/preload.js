// preload.js



// Priority-based image preloader
export async function preloadCriticalImages(imageSelectors) {
  // Split into different priority tiers
  const priorityTiers = {
    critical: ["#sky", "#cloud1", "#mountBg", "#mountMgF"],  // Above-the-fold elements
    high: ["#mountFg", "#mountBg2"],
    // medium: ["#meElement"]
  };

  // Create a single promise per tier
  const tieredPromises = Object.entries(priorityTiers).map(([tier, selectors]) => {
    return new Promise(async (resolve) => {
      const images = selectors.map(selector => {
        const el = document.querySelector(selector);
        if (!el) return null;

        const src = el.getAttribute('href') || el.getAttribute('src');
        if (!src) return null;

        return new Promise((imgResolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = imgResolve;
        });
      }).filter(Boolean);

      await Promise.all(images);
      // console.log(`Loaded ${tier} priority images`);
      resolve();
    });
  });

  await Promise.all(tieredPromises);
}


// Cache for loaded images
const backgroundCache = new Map();
const backgroundTransitionCache = new Map();

export function initThumbnails() {
  const thumbnailContainers = {
    software: document.getElementById('software'),
    photography: document.getElementById('photography'),
    motion: document.getElementById('motion'),
    diy: document.getElementById('diy')
  };

  Object.entries(thumbnailContainers).forEach(([id, container]) => {
    if (!container) return;

    try {
      // Get images from data-images attribute
      const images = JSON.parse(container.dataset.images);
      if (!images || !images.length) {
        console.warn(`No images found for ${id}`);
        return;
      }

      // Load strategy: 2 immediately, 2 more quickly, rest lazy
      const immediateUrls = images.slice(0, 2);
      const quickUrls = images.slice(2, 4);
      const lazyUrls = images.slice(4);

      // 1. Load immediate images
      preloadImages(immediateUrls).then(() => {
        // Start transitions with first 2 images
        setRandomBackgroundWithTransition(id, immediateUrls);
        container.classList.replace('loading', 'loaded');

        // 2. Load quick images in background
        preloadImages(quickUrls).then(() => {
          // Add to rotation pool
          const allLoaded = [...immediateUrls, ...quickUrls];
          setRandomBackgroundWithTransition(id, allLoaded);

          // 3. Lazy load remaining images
          lazyLoadImages(lazyUrls, (loadedUrl) => {
            // Add each new image to rotation as it loads
            const cache = backgroundTransitionCache.get(id);
            if (cache) {
              setRandomBackgroundWithTransition(id, [...cache.images, `url('${loadedUrl}')`]);
            }
          });
        });
      });
    } catch (e) {
      console.error(`Error processing ${id} thumbnail:`, e);
    }
  });
}

function lazyLoadImages(urls, onLoadCallback) {
  urls.forEach(url => {
    const img = new Image();
    img.onload = () => onLoadCallback(url);
    img.src = url;
  });
}
function preloadImages(urls) {
  return Promise.all(
    urls.map(url => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = url;
      });
    })
  );
}


export function setRandomBackgroundWithTransition(containerId, imagesArray) {
  if (!backgroundTransitionCache.has(containerId)) {
    backgroundTransitionCache.set(containerId, {
      currentImage: null,
      images: [],
      timeoutId: null
    });
  }
  const cache = backgroundTransitionCache.get(containerId);

  // Update available images (ensure they're in url('...') format)
  cache.images = [...new Set(imagesArray.map(img =>
    img.startsWith('url(') ? img : `url('${img}')`
  ))];

  // Clear any pending transition
  clearTimeout(cache.timeoutId);

  const container = document.getElementById(containerId);
  if (!container || cache.images.length === 0) return;

  // Set the initial transition properties
  container.style.transition = 'background-image 3s ease-in-out';

  // If no current image, set one immediately
  if (!cache.currentImage) {
    cache.currentImage = cache.images[0];
    container.style.backgroundImage = cache.images[0];
  }

  function transitionToNextImage() {
    if (cache.images.length === 0) return;

    let nextImage;
    if (cache.images.length === 1) {
      nextImage = cache.images[0];
    } else {
      // Get random different image
      const otherImages = cache.images.filter(img => img !== cache.currentImage);
      nextImage = otherImages[Math.floor(Math.random() * otherImages.length)];
    }

    cache.currentImage = nextImage;
    container.style.backgroundImage = nextImage;

    // Schedule next transition (5-12 seconds)
    const randomTime = Math.floor(Math.random() * 7000) + 5000;
    cache.timeoutId = setTimeout(transitionToNextImage, randomTime);
  }

  // Start the rotation
  const randomTime = Math.floor(Math.random() * 7000) + 5000;
  cache.timeoutId = setTimeout(transitionToNextImage, randomTime);
} 