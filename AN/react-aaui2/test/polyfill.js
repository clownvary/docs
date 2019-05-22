global.requestAnimationFrame = callback => callback() // setTimeout(callback, 0)
global.cancelAnimationFrame = () => {}
