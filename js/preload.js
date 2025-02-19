// preload.js


export function preloadImages(imageUrls) {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url.replace(/url\(['"]?|['"]?\)/g, ""); // Clean URL for loading
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
  