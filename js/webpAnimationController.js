// webpAnimationController.js

export class WebPAnimationController {
  constructor() {
    this.localStaticBase = "assets/animationStills/";
    this.sliders = [];
  }

  init() {
    this.sliders = document.querySelectorAll('.slider');
    this.processSliders();
  }

  processSliders() {
    this.sliders.forEach(slider => {
      const slides = slider.querySelectorAll('div:not(.arrows):not(.titleBar)');
      
      slides.forEach(slide => {
        const bgImage = window.getComputedStyle(slide).backgroundImage;
        const cloudinaryUrl = this.extractUrl(bgImage);
        
        if (!cloudinaryUrl) return;

        const staticFilename = this.getLocalStaticPath(cloudinaryUrl);
        slide.dataset.animatedUrl = cloudinaryUrl;
        slide.dataset.staticUrl = staticFilename;
        
        // Set initial static image
        slide.style.backgroundImage = `url(${staticFilename})`;
        
        // Event listeners
        slide.addEventListener('mouseenter', () => {
          if (cloudinaryUrl.endsWith('.mp4')) {
            this.handleVideoHover(slide, cloudinaryUrl);
          } else {
            slide.style.backgroundImage = `url(${cloudinaryUrl})`;
          }
        });
        
        slide.addEventListener('mouseleave', () => {
          if (cloudinaryUrl.endsWith('.mp4')) {
            this.handleVideoLeave(slide);
          } else {
            slide.style.backgroundImage = `url(${staticFilename})`;
          }
        });
      });
    });
  }

  extractUrl(bgImage) {
    const urlMatch = bgImage.match(/url\(["']?(https:\/\/res\.cloudinary\.com[^"']+)["']?\)/);
    return urlMatch ? urlMatch[1] : null;
  }

  getLocalStaticPath(cloudinaryUrl) {
    const filename = cloudinaryUrl.split('/').pop();
    let baseName;
    
    if (filename.endsWith('.webp')) {
      baseName = filename.replace('.webp', '-static.webp');
    } else if (filename.endsWith('.mp4')) {
      baseName = filename.replace('.mp4', '-static.webp');
    } else {
      baseName = filename;
    }
    
    return `${this.localStaticBase}${baseName}`;
  }

  handleVideoHover(slide, videoUrl) {
    let video = slide.querySelector('video');
    
    // Create video element if it doesn't exist
    if (!video) {
      video = document.createElement('video');
      video.src = videoUrl;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.style.position = 'absolute';
      video.style.top = '0';
      video.style.left = '0';
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      video.style.display = 'none'; // Start hidden
      slide.appendChild(video);
    }

    // Show video and hide static image
    video.style.display = 'block';
    slide.style.backgroundImage = 'none';
    
    // Reset and play video
    video.currentTime = 0;
    video.play().catch(e => console.log('Video play failed:', e));
  }

  handleVideoLeave(slide) {
    const video = slide.querySelector('video');
    if (video) {
      video.pause();
      video.style.display = 'none'; // Hide video
    }
    // Show static image
    slide.style.backgroundImage = `url(${slide.dataset.staticUrl})`;
  }
}