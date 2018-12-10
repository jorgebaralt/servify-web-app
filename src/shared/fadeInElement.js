const fadeIn = (el, time) => {
    if (!el) { return; }
    el.style.opacity = 0;
    // Declaring last frame
    let lastFrame = +new Date();
    const tick =  () => {
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