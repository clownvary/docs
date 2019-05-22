export default function (domContainer) {
  if (domContainer) {
    domContainer.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}
