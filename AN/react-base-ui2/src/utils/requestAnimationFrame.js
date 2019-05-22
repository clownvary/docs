const requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function raf(fn) {
      return window.setTimeout(fn, 1000 / 60);
    };

export default requestAnimationFrame;
