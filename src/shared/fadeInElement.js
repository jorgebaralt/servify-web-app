const fadeIn = (el, time, bShouldNotFadeIn) => {
    if (!el) { return; }
    if (+el.style.opacity >= 1) { return; }
    if (bShouldNotFadeIn) {return; }
    el.style.opacity = 0;
    // Declaring last frame
    let lastFrame = +new Date();
    const tick =  () => {
        if (+el.style.opacity >= 1) { return; }
        // Rises opacity depending on frame
        el.style.opacity = +el.style.opacity + (new Date() - lastFrame) / time;
        // Resets lastFrame to current frame
        lastFrame = +new Date();
        // Keep rising opacity until it reaches 1
        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };
    // tick;
    tick();
}

export default fadeIn;