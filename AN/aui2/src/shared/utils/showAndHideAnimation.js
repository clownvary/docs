export default function showAndHideAnimation(event, control) {
  const targetDom = event.target;
  const controlDom = control;

  if (controlDom.style.display === 'block') {
    controlDom.style.display = 'none';
    targetDom.setAttribute('class', 'icon icon-chevron-down');
  } else {
    controlDom.style.display = 'block';
    targetDom.setAttribute('class', 'icon icon-chevron-up');
  }
}
