import FontFaceObserver from 'fontfaceobserver';

const fonts = [
  {
    name: 'ProximaNova',
    className: 'ProximaNova--loaded'
  },
  {
    name: 'aui_icons',
    className: 'aui_icons--loaded'
  }
];

const initialize = () => {
  fonts.forEach((font) => {
    new FontFaceObserver(font.name).load().then(() =>
      document.documentElement.classList.add(font.className));
  });
};

export default initialize;
