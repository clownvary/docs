import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';

class Scroll {
  constructor() {
    this.groups = {};
    this.onScroll = this.onScroll.bind(this);
  }

  addToGroup(name, dom, keepRatio = false, master = false, onScroll) {
    const group = this.groups[name] || [];
    group.push(dom);
    this.groups[name] = group;

    if (master) {
      dom.sync = () => this.onScroll(name, dom, keepRatio, onScroll);
      dom.addEventListener(
        'scroll',
        dom.sync,
        0
      );
    }
  }

  removeFromGroup(name, dom) {
    const group = this.groups[name];
    if (group) {
      this.groups[name] = remove(group, d => d === dom);
      if (isEmpty(this.groups[name])) {
        delete this.groups[name];
      }
    }

    dom.removeEventListener(
      'scroll',
      dom.sync,
      0
    );
  }

  onScroll(name, dom, keepRatio, onScroll) {
    const group = this.groups[name];

    let scrollX = dom.scrollLeft;
    let scrollY = dom.scrollTop;

    console.log(scrollX);

    const xRate = scrollX / (dom.scrollWidth - dom.clientWidth);
    const yRate = scrollY / (dom.scrollHeight - dom.clientHeight);

    group.forEach((otherDom) => {
      if (otherDom !== dom) {
        if (keepRatio) {
          scrollX = Math.round(xRate * (otherDom.scrollWidth - otherDom.clientWidth));
        }
        otherDom.scrollLeft = scrollX;

        if (keepRatio) {
          scrollY = Math.round(yRate * (otherDom.scrollHeight - otherDom.clientHeight));
        }
        otherDom.scrollTop = scrollY;
      }
    });
    onScroll && onScroll();
  }

  getScrollbarSize(dom) {
    if (dom.offsetWidth === 0 || dom.offsetHeight === 0) return null;

    let width = dom.offsetWidth - dom.clientWidth;
    let height = dom.offsetHeight - dom.clientHeight;

    width = Math.round(Math.max(0, width));
    height = Math.round(Math.max(0, height));

    return { width, height };
  }
}


export default Scroll;
