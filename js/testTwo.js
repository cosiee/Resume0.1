document.addEventListener('DOMContentLoaded', function() {
    var downButton = document.getElementById('down');
    console.log('downButton:', downButton); // This will log the downButton element or null
    
    if (downButton) {
        downButton.onclick = function() {
            console.log('Down arrow clicked!');
            // Add your scroll logic here, for example:
            scrollTo(document.documentElement.scrollHeight, 1000); // Scrolls to the bottom in 1000ms
        };
    } else {
        console.log('Element with id "down" not found');
    }
});

function scrollTo(element, duration) {
    var e = document.documentElement;
    if (e.scrollTop === 0) {
        var t = e.scrollTop;
        ++e.scrollTop;
        e = t + 1 === e.scrollTop-- ? e : document.body;
    }
    scrollToC(e, e.scrollTop, element, duration);
}

function scrollToC(element, from, to, duration) {
    if (duration <= 0) return;
    if (typeof from === "object") from = from.offsetTop;
    if (typeof to === "object") to = to.offsetTop;

    // Choose one effect like easeInOutCirc
    scrollToX(element, from, to, 0, 1 / duration, 2, easeInOutCirc);
}

function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
    if (t01 < 0 || t01 > 1 || speed <= 0) {
        element.scrollTop = xTo;
        return;
    }
    element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
    t01 += speed * step;

    setTimeout(function() {
        scrollToX(element, xFrom, xTo, t01, speed, step, motion);
    }, step);
}

function easeInOutCirc(t) {
    t /= 0.5;
    if (t < 1) return -(Math.sqrt(1 - t * t) - 1) / 2;
    t -= 2;
    return (Math.sqrt(1 - t * t) + 1) / 2;
}
