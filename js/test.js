document.addEventListener('DOMContentLoaded', () => {
  const videoCards = document.querySelectorAll('.video-card');

  videoCards.forEach(card => {
      card.addEventListener('click', () => {
          const videoId = card.getAttribute('data-video-id');
          const videoContainer = card.querySelector('.video-thumbnail');

          // Replace the thumbnail with the embedded YouTube video
          videoContainer.innerHTML = `
              <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
              </iframe>`;
      });
  });
});
