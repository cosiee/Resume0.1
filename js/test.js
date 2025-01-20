img.onload = () => {
    if (!container) {
      console.error(`Container with ID "${containerId}" is null.`);
      return;
    }
  
    const currentImage = container.style.getPropertyValue('--background-next');
    if (currentImage.includes(newImageUrl)) {
      timeoutId = setTimeout(updateBackground, 2500); // Retry with minimum delay
      return;
    }
  
    container.style.setProperty('--background-next', `url('${newImageUrl}')`);
    container.classList.add('fade-transition');
  
    setTimeout(() => {
      if (!container) {
        console.error(`Container with ID "${containerId}" is null during transition.`);
        return;
      }
      container.style.setProperty('--background-current', `url('${newImageUrl}')`);
      container.classList.remove('fade-transition');
    }, 1000);
  };
  