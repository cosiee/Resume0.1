document.getElementById("down").onclick = function () {
    if (document.documentElement.scrollTop <= 150) {
        console.log("%%%%scrollTop: ", document.documentElement.scrollTop);
        console.log("0-document.documentElement.scrollHeight", document.documentElement.scrollHeight + " MINUS document.documentElement.clientHeight", document.documentElement.clientHeight + "= ", document.documentElement.scrollHeight + " ", document.documentElement);

        scrollTo(document.documentElement.scrollHeight - document.documentElement.clientHeight, 10000); // Adjusted duration to 1000ms for testing
    }
}

/*--------------------------------------------
 Functions to make scroll with speed control
---------------------------------------------*/

// Element or Position to move + Time in ms (milliseconds)
function scrollTo(to, duration) {
    const start = document.documentElement.scrollTop;
    const change = to - start;
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCirc(timeElapsed, start, change, duration);
        document.documentElement.scrollTop = run;

        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}

function easeInOutCirc(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    t -= 2;
    return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
}
