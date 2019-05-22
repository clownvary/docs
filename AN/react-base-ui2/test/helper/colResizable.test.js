import createColResizable from 'src/helper/colResizable';

describe('src/helper/colResizable', () => {
  it('colResizable', () => {
    createColResizable();
    const divDom = document.createElement('div');
    const tableDom = document.createElement('table');
    const theadDom = document.createElement('thead');
    const theadThdom0 = document.createElement('th');
    const theadThdom1 = document.createElement('th');
    const theadThdom2 = document.createElement('th');
    divDom.appendChild(tableDom);
    theadDom.appendChild(theadThdom0);
    theadDom.appendChild(theadThdom1);
    theadDom.appendChild(theadThdom2);
    tableDom.appendChild(theadDom);

    const preventDefault = () => { };
    const resizeableObj = createColResizable(tableDom);
    resizeableObj.onGripMouseDown({ preventDefault, currentTarget: { index: 1 } });
    resizeableObj.onMouseMove({ preventDefault });
    resizeableObj.onMouseUp();
  });
});
