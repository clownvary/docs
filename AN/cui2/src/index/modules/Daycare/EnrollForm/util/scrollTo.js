const scrollTo = (className) => {
  const target = document.querySelector(className);
  target && window.scrollTo(0, target.offsetTop);
};

const scrollToSection = sectionName => scrollTo(`.${sectionName}-section`);

export default scrollToSection;
