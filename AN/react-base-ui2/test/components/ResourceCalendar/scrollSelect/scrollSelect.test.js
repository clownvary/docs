import SelectScroll from 'src/components/ResourceCalendar/utils/selectScroll';

jest.mock('lodash/throttle', () => fn => fn);

describe('src/components/ResourceCalendar/utils/selectScroll', () => {
  const containerId = 'ut-container';
  const scrollContainerId = 'ut-scroll-container';

  const prepareContainerDom = () => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);

    const scrollContainer = document.createElement('div');
    scrollContainer.id = scrollContainerId;
    container.appendChild(scrollContainer);
  };

  beforeEach(() => {
    prepareContainerDom();
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById(containerId));
  });

  describe('initialization works fine', () => {
    it('selectScroll init with container dom element', () => {
      const container = document.getElementById(containerId);
      const selectScroll = new SelectScroll(container);
      expect(selectScroll.on).toBeTruthy();
    });

    it('selectScroll init with container selector string', () => {
      const selectScroll = new SelectScroll(`#${containerId}`);
      expect(selectScroll.on).toBeTruthy();
    });

    it('selectScroll init throws error if no container is passed', () => {
      try {
        const selectScroll = new SelectScroll();
      } catch (e) {
        expect(e.message).toBe('Invalid target element');
      }
    });

    it('selectScroll init throws error if repeated enable processed', () => {
      try {
        const selectScroll = new SelectScroll(`#${containerId}`);
        selectScroll.enable();
      } catch (e) {
        expect(e.message).toBe('Already enabled');
      }
    });
  });

  it('method getRectBox／ cleanRectBox works fine', () => {
    const scrollContainer = document.getElementById(scrollContainerId);
    const selectScroll = new SelectScroll(`#${containerId}`, { scrollContainer });
    const rectBox = selectScroll.getRectBox();
    expect(rectBox).toBeTruthy();
    expect(rectBox).toEqual(selectScroll.rectBox);
    expect(rectBox).toEqual(selectScroll.getRectBox());

    selectScroll.cleanRectBox();
    expect(selectScroll.rectBox).toBeNull();
    selectScroll.cleanRectBox();
    expect(selectScroll.rectBox).toBeNull();
  });

  describe('select & scroll works fine', () => {
    const selectableClass = 'ut-selectable';
    const deSelectableClass = 'ut-deselectable';

    beforeEach(() => {
      prepareContainerDom();

      const scrollContainer = document.getElementById(scrollContainerId);
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('an-scroller__content');
      scrollContainer.appendChild(contentDiv);
      Object.defineProperty(scrollContainer, 'scrollWidth', { value: 80, enumerable: true });
      Object.defineProperty(scrollContainer, 'scrollHeight', { value: 60, enumerable: true });

      for (let r = 0; r < 3; r += 1) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('grid-row');
        contentDiv.appendChild(rowDiv);
        for (let c = 0; c < 4; c += 1) {
          const cellDiv = document.createElement('div');
          cellDiv.classList.add('grid-cell');
          cellDiv.classList.add(selectableClass);
          rowDiv.appendChild(cellDiv);
          if (c === 0) {
            const childDiv = document.createElement('div');
            childDiv.classList.add(`${selectableClass}-child`);
            cellDiv.appendChild(childDiv);
          }
          if (c === 3) {
            cellDiv.classList.add(deSelectableClass);
            const childDiv = document.createElement('div');
            childDiv.classList.add(`${deSelectableClass}-child`);
            cellDiv.appendChild(childDiv);
          }
        }
      }
    });

    it('method start of select works fine', () => {
      const scrollContainer = document.getElementById(scrollContainerId);
      const container = document.getElementById(containerId);
      const onStart = jest.fn();
      let selectScroll = new SelectScroll(container, {
        scrollContainer,
        onStart
      });

      const firstChild = document.querySelector(`.${selectableClass}`);
      const mousedownEvent1 = new MouseEvent('mousedown');
      mousedownEvent1.initEvent('mousedown', true, true);
      mousedownEvent1.pageX = 10;
      mousedownEvent1.pageY = 10;
      firstChild.dispatchEvent(mousedownEvent1);

      expect(onStart).toHaveBeenCalledTimes(1);

      expect(selectScroll.ipos).toEqual([mousedownEvent1.pageX, mousedownEvent1.pageY]);
      expect(selectScroll.scrollPos).toEqual([0, 0]);
      expect(selectScroll.rowCells).toHaveLength(3);
      expect(selectScroll.rowCells[0]).toHaveLength(4);
      expect(selectScroll.rowRect).toHaveLength(3);
      expect(selectScroll.columnRect).toHaveLength(4);
      expect(selectScroll.highlightIndexes).toEqual([]);

      expect(scrollContainer.className).toContain(SelectScroll.selectingClass);

      selectScroll = new SelectScroll(container, { selectableClass: 'invalid' });
      expect(selectScroll.preStartCheck()).toBe(false);
    });

    it('method start of select stops if mousedown on the unable select dom element', () => {
      const scrollContainer = document.getElementById(scrollContainerId);
      const container = document.getElementById(containerId);
      const selectScroll = new SelectScroll(container, {
        scrollContainer,
        selectableClass,
        deSelectableClasses: [deSelectableClass]
      });
      const preStartCacheSpy = jest.spyOn(selectScroll, 'preStartCache');
      const cleanSelectingEventListenersSpy = jest.spyOn(selectScroll, 'cleanSelectingEventListeners');
      const bindSelectingEventListenersSpy = jest.spyOn(selectScroll, 'bindSelectingEventListeners');

      const deselectableDivChild = document.querySelector(`.${deSelectableClass}-child`);
      const mousedownEvent1 = new MouseEvent('mousedown');
      mousedownEvent1.initEvent('mousedown', true, true);
      deselectableDivChild.dispatchEvent(mousedownEvent1);

      expect(preStartCacheSpy).not.toHaveBeenCalled();
      expect(cleanSelectingEventListenersSpy).not.toHaveBeenCalled();
      expect(bindSelectingEventListenersSpy).not.toHaveBeenCalled();

      const selectableDivChild = document.querySelector(`.${selectableClass}-child`);
      selectableDivChild.dispatchEvent(mousedownEvent1);

      expect(preStartCacheSpy).toHaveBeenCalled();
      expect(cleanSelectingEventListenersSpy).toHaveBeenCalled();
      expect(bindSelectingEventListenersSpy).toHaveBeenCalled();

      preStartCacheSpy.mockRestore();
      cleanSelectingEventListenersSpy.mockRestore();
      bindSelectingEventListenersSpy.mockRestore();
    });

    it('method drawRectRelative of select works fine', () => {
      const scrollContainer = document.getElementById(scrollContainerId);
      const container = document.getElementById(containerId);
      const selectScroll = new SelectScroll(container, { scrollContainer });

      const scroll = jest.spyOn(selectScroll, 'scroll').mockImplementation(jest.fn());
      const highlightSelections = jest.spyOn(selectScroll, 'highlightSelections').mockImplementation(jest.fn());

      const firstChild = document.querySelector(`.${selectableClass}`);
      const mousedownEvent1 = new MouseEvent('mousedown');
      mousedownEvent1.initEvent('mousedown', true, true);
      mousedownEvent1.pageX = 10;
      mousedownEvent1.pageY = 10;
      firstChild.dispatchEvent(mousedownEvent1);

      const secondChild = document.querySelectorAll(`.${selectableClass}`)[5];
      const mousemoveEvent1 = new MouseEvent('mousemove');
      mousemoveEvent1.pageX = 30;
      mousemoveEvent1.pageY = 30;
      mousemoveEvent1.initEvent('mousemove', true, true);
      secondChild.dispatchEvent(mousemoveEvent1);

      const { left, top, width, height } = selectScroll.getRectBox().style;
      expect(left).toEqual('11px');
      expect(top).toEqual('11px');
      expect(width).toEqual('19px');
      expect(height).toEqual('19px');

      expect(scroll).toHaveBeenCalled();
      expect(highlightSelections).toHaveBeenCalled();

      scroll.mockRestore();
      highlightSelections.mockRestore();
    });

    it('method drawRectRelative of select works fine with container scroll values', () => {
      const scrollContainer = document.getElementById(scrollContainerId);
      const container = document.getElementById(containerId);
      const selectScroll = new SelectScroll(container, { scrollContainer });

      const scrollSpy = jest.spyOn(selectScroll, 'scroll').mockImplementation(jest.fn());
      const highlightSelectionsSpy = jest.spyOn(selectScroll, 'highlightSelections').mockImplementation(jest.fn());

      scrollContainer.scrollLeft = 20;
      scrollContainer.scrollTop = 20;

      const cells = document.querySelectorAll(`.${selectableClass}`);

      const mousedownDiv = cells[11];
      const mousedownEvent2 = new MouseEvent('mousedown');
      mousedownEvent2.pageX = 30;
      mousedownEvent2.pageY = 30;
      mousedownEvent2.initEvent('mousedown', true, true);
      mousedownDiv.dispatchEvent(mousedownEvent2);

      const mousemoveDiv = cells[5];
      let mousemove2 = new MouseEvent('mousemove');
      mousemove2.initEvent('mousemove', true, true);
      mousemove2.pageX = 10;
      mousemove2.pageY = 10;
      mousemoveDiv.dispatchEvent(mousemove2);

      const { left, top, width, height } = selectScroll.getRectBox().style;
      expect(left).toEqual('31px');
      expect(top).toEqual('31px');
      expect(width).toEqual('19px');
      expect(height).toEqual('19px');

      expect(scrollSpy).toHaveBeenCalled();
      expect(highlightSelectionsSpy).toHaveBeenCalled();

      scrollSpy.mockRestore();
      highlightSelectionsSpy.mockRestore();

      mousemove2 = new MouseEvent('mousemove');
      mousemove2.initEvent('mousemove', true, true);
      mousemove2.pageX = 10;
      mousemove2.pageY = 10;
      scrollContainer.scrollLeft = 15;
      scrollContainer.scrollTop = 15;
      selectScroll.containerRect = { left: 20, top: 20, right: 50, bottom: 50 };
      mousemoveDiv.dispatchEvent(mousemove2);

      const { left: left2, top: top2, width: width2, height: height2 }
        = selectScroll.getRectBox().style;
      expect(left2).toEqual('16px');
      expect(top2).toEqual('16px');
      expect(width2).toEqual('24px');
      expect(height2).toEqual('24px');

      mousemove2 = new MouseEvent('mousemove');
      mousemove2.initEvent('mousemove', true, true);
      mousemove2.pageX = 10;
      mousemove2.pageY = 10;
      scrollContainer.scrollLeft = 20;
      scrollContainer.scrollTop = 20;
      selectScroll.containerRect = { left: 50, top: 50, right: 50, bottom: 50 };
      mousemoveDiv.dispatchEvent(mousemove2);

      const { left: left3, top: top3, width: width3, height: height3 }
        = selectScroll.getRectBox().style;
      expect(left3).toEqual('1px');
      expect(top3).toEqual('1px');
      expect(width3).toEqual('-1px');
      expect(height3).toEqual('-1px');
    });

    it('method scroll of scroll works fine', () => {
      const scrollContainer = document.getElementById(scrollContainerId);
      const container = document.getElementById(containerId);
      const selectScroll = new SelectScroll(container, { scrollContainer });

      const drawRectRelativeSpy = jest.spyOn(selectScroll, 'drawRectRelative').mockImplementation(jest.fn());

      const cells = document.querySelectorAll(`.${selectableClass}`);

      const mousedownEvent3 = new MouseEvent('mousedown');
      mousedownEvent3.initEvent('mousedown', true, true);
      mousedownEvent3.pageX = 10;
      mousedownEvent3.pageY = 10;
      cells[0].dispatchEvent(mousedownEvent3);

      const mousemoveEvent3 = new MouseEvent('mousemove');
      mousemoveEvent3.pageX = 50;
      mousemoveEvent3.pageY = 50;
      mousemoveEvent3.initEvent('mousemove', true, true);
      selectScroll.containerRect = { left: 10, top: 10, right: 50, bottom: 50 };
      selectScroll.scroll(mousemoveEvent3);

      expect(scrollContainer.scrollLeft).toEqual(50);
      expect(scrollContainer.scrollTop).toEqual(30);

      selectScroll.scroll(mousemoveEvent3);
      selectScroll.scroll(mousemoveEvent3);
      selectScroll.scroll(mousemoveEvent3);

      expect(scrollContainer.scrollLeft).toEqual(80);
      expect(scrollContainer.scrollTop).toEqual(60);

      mousemoveEvent3.pageX = -10;
      mousemoveEvent3.pageY = -10;
      selectScroll.containerRect = { left: -10, top: -10, right: 10, bottom: 10 };
      selectScroll.scroll(mousemoveEvent3);

      expect(scrollContainer.scrollLeft).toEqual(30);
      expect(scrollContainer.scrollTop).toEqual(30);

      selectScroll.scroll(mousemoveEvent3);

      expect(scrollContainer.scrollLeft).toEqual(0);

      expect(drawRectRelativeSpy).toHaveBeenCalled();

      mousemoveEvent3.pageX = -30;
      mousemoveEvent3.pageY = -30;
      selectScroll.containerRect = { left: -10, top: -10, right: 10, bottom: 10 };
      selectScroll.options.scrollVertical = 61;
      selectScroll.scroll(mousemoveEvent3);
      expect(scrollContainer.scrollLeft).toEqual(0);
      expect(scrollContainer.scrollTop).toEqual(0);

      mousemoveEvent3.pageY = -20;
      selectScroll.containerRect = { left: -10, top: -10, right: 10, bottom: 10 };
      selectScroll.options.scrollVertical = 61;
      selectScroll.scroll(mousemoveEvent3);
      expect(scrollContainer.scrollLeft).toEqual(0);
      expect(scrollContainer.scrollTop).toEqual(60);

      mousemoveEvent3.pageY = -30;
      selectScroll.containerRect = { left: -10, top: -10, right: 10, bottom: 10 };
      scrollContainer.scrollTop = 59;
      selectScroll.scroll(mousemoveEvent3);
      expect(scrollContainer.scrollLeft).toEqual(0);
      expect(scrollContainer.scrollTop).toEqual(0);

      drawRectRelativeSpy.mockRestore();
    });

    it('method end works fine', () => {
      const scrollContainer = document.getElementById(scrollContainerId);
      const onEnd = jest.fn();
      const selectScroll = new SelectScroll(`#${containerId}`, {
        scrollContainer,
        onEnd
      });
      const rectBox = selectScroll.getRectBox();
      expect(rectBox).toBeTruthy();

      const firstChild = document.querySelector(`.${selectableClass}`);
      const mousedownEvent4 = new MouseEvent('mousedown');
      mousedownEvent4.initEvent('mousedown', true, true);
      mousedownEvent4.pageX = 10;
      mousedownEvent4.pageY = 10;
      firstChild.dispatchEvent(mousedownEvent4);
      expect(scrollContainer.className).toContain(SelectScroll.selectingClass);

      const mouseupEvent4 = new MouseEvent('mouseup');
      mouseupEvent4.initEvent('mouseup', true, true);
      mouseupEvent4.pageX = 11;
      mouseupEvent4.pageY = 11;
      selectScroll.endRowIndex = 0;
      selectScroll.endColumnIndex = 0;
      selectScroll.end(mouseupEvent4);

      expect(scrollContainer.className).not.toContain(SelectScroll.selectingClass);
      expect(selectScroll.ipos).toBeUndefined();
      expect(selectScroll.scrollPos).toBeNull();
      expect(selectScroll.rowRect).toBeNull();
      expect(selectScroll.columnRect).toBeNull();
      expect(selectScroll.highlightIndexes).toBeNull();
      expect(selectScroll.rowCells).toBeNull();
      expect(selectScroll.rectBox).toBeNull();
    });
  });
});
