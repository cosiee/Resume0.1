export class SVGResizer {
    constructor() {
        this.svgContainer = document.querySelector('.svg-responsive-container');
        this.svgElement = document.getElementById('svg');
        this.originalViewBox = '0 0 1200 800';
        this.isFullscreen = false;

        this.initEvents();
    }

    initEvents() {
        // Optional: Uncomment if you want click-to-toggle functionality
        // this.svgElement.addEventListener('click', () => this.toggleFullscreen());
    }

    async toggleFullscreen() {
        if (this.isFullscreen) {
            await this.exitFullscreen();
        } else {
            await this.enterFullscreen();
        }
    }

    async enterFullscreen() {
        try {
            this.svgContainer.classList.add('fullscreen');

            if (this.svgContainer.requestFullscreen) {
                await this.svgContainer.requestFullscreen();
            }

            this.svgElement.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
            this.svgElement.setAttribute('preserveAspectRatio', 'none');

            this.isFullscreen = true;
            this.adjustElementsForFullscreen();

        } catch (err) {
            console.error('Error entering fullscreen:', err);
        }
    }

    async exitFullscreen() {
        try {
            this.svgContainer.classList.remove('fullscreen');

            if (document.fullscreenElement) {
                await document.exitFullscreen();
            }

            this.svgElement.setAttribute('viewBox', this.originalViewBox);
            this.svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

            this.isFullscreen = false;
            this.restoreElements();

        } catch (err) {
            console.error('Error exiting fullscreen:', err);
        }
    }

    adjustElementsForFullscreen() {
        const textElements = this.svgElement.querySelectorAll('text');
        textElements.forEach(text => {
            const originalSize = text.getAttribute('font-size') || '125';
            text.setAttribute('data-original-size', originalSize);
            const newSize = parseFloat(originalSize) * (window.innerWidth / 1200);
            text.setAttribute('font-size', newSize);
        });
    }

    restoreElements() {
        const textElements = this.svgElement.querySelectorAll('text');
        textElements.forEach(text => {
            const originalSize = text.getAttribute('data-original-size') || '125';
            text.setAttribute('font-size', originalSize);
        });
    }
}