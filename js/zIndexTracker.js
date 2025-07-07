// zIndexTracker.js


export class ZIndexTracker {
    constructor() {
        this.trackedElements = new Map();
        this.importantSelectors = [
            // Manual list of important elements to track regardless of z-index
            '.navbar', '.thumbnails', '.modalbox', '#contactForm', '#wip',
            '#cloud1', '#cloud1M', '#sky', '#mountBg', '#mountBg2',
            '#mountMg', '#mountMgF', '#mountFg', '.page-content'
        ];
    }

    init() {
        // Track all elements with explicit z-index first
        document.querySelectorAll('*').forEach(el => {
            const zIndex = window.getComputedStyle(el).zIndex;
            if (zIndex !== 'auto') {
                this.trackElement(el, zIndex);
            }
        });

        // Then force-track our important elements
        this.importantSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                const zIndex = window.getComputedStyle(el).zIndex;
                this.trackElement(el, zIndex, true);
            });
        });

        this.printInitialState();
    }

    trackElement(el, zIndex, isForced = false) {
        const id = this.getElementIdentifier(el);
        this.trackedElements.set(el, {
            id,
            initialZIndex: zIndex,
            currentZIndex: zIndex,
            isForced,
            computedPosition: window.getComputedStyle(el).position
        });
    }

    getElementIdentifier(el) {
        let identifier = el.tagName.toLowerCase();
        if (el.id) identifier += `#${el.id}`;
        if (el.className && typeof el.className === 'string') {
            identifier += `.${el.className.replace(/\s+/g, '.').replace(/\.+/g, '.')}`;
        }
        return identifier;
    }

    printInitialState() {
        console.groupCollapsed('%cAll Tracked Elements (Initial State)',
            'font-size:14px; font-weight:bold; color:#4285F4;');

        // Convert to array and sort
        const elements = Array.from(this.trackedElements.entries())
            .sort((a, b) => parseInt(a[1].currentZIndex) - parseInt(b[1].currentZIndex));

        console.log('%cElement%c\t\tZ-Index%c\tPosition%c\tForced',
            'font-weight:bold;',
            'font-weight:bold; margin-left:20px;',
            'font-weight:bold; margin-left:20px;',
            'font-weight:bold; margin-left:20px;');

        elements.forEach(([el, data]) => {
            console.log(
                `%c${data.id}%c\t${data.currentZIndex}%c\t${data.computedPosition}%c\t${data.isForced ? '✓' : ''}`,
                'color:#333;',
                'color:#0F9D58; margin-left:20px;',
                'color:#666; margin-left:20px;',
                'color:#888; margin-left:20px;'
            );

            // Debug why element might not be showing in stacking context
            if (data.currentZIndex === 'auto') {
                const reasons = [];
                if (data.computedPosition === 'static') reasons.push('position:static');
                if (el.parentElement && window.getComputedStyle(el.parentElement).zIndex !== 'auto') {
                    reasons.push(`parent z-index:${window.getComputedStyle(el.parentElement).zIndex}`);
                }

                if (reasons.length > 0) {
                    console.log(`%c  ^ Auto z-index because: ${reasons.join(', ')}`,
                        'color:#888; font-size:0.8em;');
                }
            }
        });

        console.groupEnd();
    }

    startTransitionTracking() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes') {
                    this.checkElement(mutation.target);
                }
            });

            // Also check all important elements on each mutation
            this.importantSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => {
                    this.checkElement(el);
                });
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            subtree: true
        });

        return observer;
    }

    checkElement(el) {
        const currentZIndex = window.getComputedStyle(el).zIndex;
        const trackedData = this.trackedElements.get(el);

        if (trackedData) {
            if (currentZIndex !== trackedData.currentZIndex) {
                trackedData.currentZIndex = currentZIndex;
                this.printChange(el, trackedData);
            }
        } else if (this.importantSelectors.some(selector => el.matches(selector))) {
            // New important element found during transition
            this.trackElement(el, currentZIndex, true);
            this.printChange(el, this.trackedElements.get(el));
        }
    }

    printChange(el, data) {
        if (!this.changeTable) {
            console.groupCollapsed('%cZ-Index Changes During Transition',
                'font-size:14px; font-weight:bold; color:#4285F4;');
            console.log('%cElement%c\t\tOld%c\tNew%c\tPosition%c\tSource',
                'font-weight:bold;',
                'font-weight:bold; margin-left:20px;',
                'font-weight:bold; margin-left:20px;',
                'font-weight:bold; margin-left:20px;',
                'font-weight:bold; margin-left:20px;');
            this.changeTable = true;
        }

        const source = this.getChangeSource();
        console.log(
            `%c${data.id}%c\t${data.initialZIndex}%c\t${data.currentZIndex}%c\t${data.computedPosition}%c\t${source}`,
            'color:#0;',
            'color:#666; margin-left:20px;',
            data.currentZIndex !== data.initialZIndex ? 'color:#0F9D58; margin-left:20px;' : 'color:#666; margin-left:20px;',
            'color:#888; margin-left:20px;',
            'color:#DB4437; margin-left:20px;'
        );
    }

    getChangeSource() {
        try {
            throw new Error();
        } catch (e) {
            const stack = e.stack.split('\n');
            for (let i = 4; i < stack.length; i++) {
                const line = stack[i].trim();
                const match = line.match(/at (.*) \((.*):(\d+):\d+\)/);
                if (match && !line.includes('ComprehensiveZIndexTracker')) {
                    const file = match[2].split('/').pop();
                    return `${file}:${match[3]}`;
                }
            }
            return 'unknown';
        }
    }
}






