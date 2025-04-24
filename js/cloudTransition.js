
// cloudTransition.js

import { Animations } from './animations.js';
import { CloudManager } from './cloudManager.js';
export class CloudTransition {
    static async handleTransitionNavigation(url) {
        const animations = new Animations();
        try {
            // Freeze UI
            document.documentElement.style.pointerEvents = 'none';

            // Start transition
            const success = await animations.cloudTransitionOut(url);

            if (!success) {
                window.location.href = url;
            }

        } catch (error) {
            console.error('Transition failed:', error);
            document.documentElement.style.pointerEvents = '';
            window.location.href = url;
        }
    }

    static async resetClouds() {
        await CloudManager.restoreAfterTransition();
        CloudManager.reset();
    }
}
// cloudTransition.js
// import { CloudManager } from './cloudManager.js';

// export class CloudTransition {
//     async handleTransitionNavigation(url) {
//         try {
//             // 1. Freeze UI to prevent interactions during transition
//             document.documentElement.style.pointerEvents = 'none';

//             // 2. Hide any visible UI elements that might interfere
//             this.hideWip();
//             this.hideScrollBar();

//             // 3. Trigger cloud transition with proper error handling
//             const transitionSuccess = await CloudTransition.triggerTransition();

//             if (!transitionSuccess) {
//                 throw new Error('Cloud transition animation failed');
//             }

//             // 4. Add brief delay for smoother transition (optional)
//             await new Promise(resolve => setTimeout(resolve, 300));

//             // 5. Navigate to new page
//             window.location.href = url;

//         } catch (error) {
//             console.error('Transition failed:', error);
//             // Restore UI interactions before fallback
//             document.documentElement.style.pointerEvents = '';
//             // Fallback to normal navigation
//             window.location.href = url;
//         }
//     }
//     static async resetClouds() {
//         await CloudManager.restoreAfterTransition();
//         CloudManager.reset();
//     }
// }