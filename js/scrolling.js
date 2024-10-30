(function findScrollableElements() {
    const scrollableElements = [];

    // Get all elements in the DOM
    const allElements = document.querySelectorAll('*');

    allElements.forEach((element) => {
        const style = window.getComputedStyle(element);
        let effect = [];

        // Check if the element has overflow properties that allow scrolling
        if (style.overflow === 'auto' || style.overflow === 'scroll' || style.overflowY === 'auto' || style.overflowY === 'scroll') {
            effect.push('Overflow allows scroll');
        }

        // Check if the element's height or width exceeds its container
        if (element.scrollHeight > element.clientHeight) {
            effect.push(`Height exceeds container: scrollHeight=${element.scrollHeight}, clientHeight=${element.clientHeight}`);
        }
        if (element.scrollWidth > element.clientWidth) {
            effect.push(`Width exceeds container: scrollWidth=${element.scrollWidth}, clientWidth=${element.clientWidth}`);
        }

        // Check for fixed or sticky positioning which can influence scroll
        if (style.position === 'fixed') {
            effect.push('Fixed position element');
        }
        if (style.position === 'sticky') {
            effect.push('Sticky position element');
        }

        // If any scroll-related effect is found, log the element and its effect
        if (effect.length > 0) {
            scrollableElements.push({
                element,
                className: element.className || 'No class', // Capture the class name, default to "No class" if not present
                effects: effect.join(', '),
            });
        }
    });

    // Log the scrollable elements, their class names, and their effects
    scrollableElements.forEach((item, index) => {
        console.log(`Element ${index + 1}:`, item.element);
        console.log(`Class Name: ${item.className}`);
        console.log(`Effects: ${item.effects}`);
        console.log('-----------------------');
    });
})();


let _scrollTop = document.documentElement.scrollTop || window.scrollY || 0;

Object.defineProperty(document.documentElement, 'scrollTop', {
    set(value) {
        console.log('scrollTop SET to:', value, 'from', new Error().stack);  // Log the stack trace of where it's being set
        _scrollTop = value;  // Update the internal value
    },
    get() {
        console.log('scrollTop ACCESSED:', _scrollTop, 'from', new Error().stack);  // Log the stack trace of where it's being accessed
        return _scrollTop;  // Return the internal value
    }
});
