const addEvent = (el, name, cb) => {
  if (el.attachEvent) {
    el.attachEvent(`on${name}`, cb);
  } else {
    el.addEventListener(name, cb);
  }
};

export default addEvent;
