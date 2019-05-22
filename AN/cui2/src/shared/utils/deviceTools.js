export const getScreenHeightExceptHeader = () => {
  const appRoot = document.getElementById('app-root');
  if (appRoot && appRoot.getElementsByClassName('an-responsiveHeader').length > 0) {
    const screenHeight =  window.innerHeight;
    const headerHeight = appRoot.getElementsByClassName('an-responsiveHeader')[0].offsetHeight;
    return screenHeight - headerHeight;
  }

  return 620;
};
