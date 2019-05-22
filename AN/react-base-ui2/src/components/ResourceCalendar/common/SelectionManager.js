
import { addClass, removeClass } from '../../../utils/dom';

class SelectionManager {
  constructor(el) {
    this.element = el || document;
    this.activeSeg = null;
  }

  select(seg) {
    this.clear();
    this.activeSeg = seg;
    const nodes = this.element.querySelectorAll(`div[data-event-id="${seg.eventKey}"]`);
    addClass(nodes, 'seg-active');
  }

  clear() {
    this.activeSeg = null;
    const nodes = this.element.querySelectorAll('.seg-active');
    removeClass(nodes, 'seg-active');
  }
}


export default new SelectionManager();
