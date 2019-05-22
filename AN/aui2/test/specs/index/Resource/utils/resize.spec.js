import moment from 'moment';
import ResizeHelper from 'index/Resource/utils/resize';
import { hasClass } from 'react-base-ui/lib/utils/dom';

function getDivTarget(isFcContent) {
  let fcContent = document.createElement('div');
  fcContent.className = 'fc-content';
  fcContent.setAttribute('style', 'top:0px; bottom:10px;');
  fcContent.setAttribute('border', 'top');

  let observeDiv = document.createElement('div');
  observeDiv.className = 'observe-resize';
  observeDiv.setAttribute('data-resize-id', 1);
  observeDiv.setAttribute('data-resize-border', 'top');
  observeDiv.setAttribute('style', 'width:100px; height:100px; top:0px; bottom:10px;');
  observeDiv.appendChild(fcContent);

  if (isFcContent) {
    return fcContent;
  }
  return observeDiv;
}

describe('index -> Resource -> utils -> resize', () => {
  it('resizeHelper initialised well with snapRadix', () => {
    let resizeHelper = new ResizeHelper({
      onResizeStart: jest.fn(),
      onResizeEnd: jest.fn(),
      snapRadix: 5
    });
    expect(resizeHelper.snapRadix).toEqual(5);

    resizeHelper = new ResizeHelper({
      onResizeStart: jest.fn(),
      onResizeEnd: jest.fn(),
      snapRadix: 0
    });
    expect(resizeHelper.snapRadix).toEqual(10);

    resizeHelper = new ResizeHelper({
      onResizeStart: jest.fn(),
      onResizeEnd: jest.fn(),
      snapRadix: 'not number'
    });
    expect(resizeHelper.snapRadix).toEqual(10);
  });

  it('resizeHelper start and stop function work well', () => {
    let resizeHelper = new ResizeHelper({
      onResizeStart: jest.fn(),
      onResizeEnd: jest.fn(),
      snapRadix: 10
    });

    const event = {
      id: 1,
      start: moment(),
      end: moment().add(1, 'hour')
    }
    resizeHelper.push(event);

    // start with fc content: border-top
    let targetDiv = getDivTarget(true);
    targetDiv.setAttribute('border', 'top');
    targetDiv.setAttribute('style', 'top:1px; bottom:10px;');
    targetDiv.parentElement.setAttribute('data-resize-border', 'top');
    resizeHelper.start({
      target: targetDiv
    });
    expect(resizeHelper.isResizing).toEqual(true);
    resizeHelper.stop();
    expect(resizeHelper.isResizing).toEqual(false);

    // start with fc content: border-bottom
    targetDiv = getDivTarget(true);
    targetDiv.setAttribute('border', 'bottom');
    targetDiv.parentElement.setAttribute('data-resize-border', 'bottom');
    resizeHelper.start({
      target: targetDiv
    });
    expect(resizeHelper.isResizing).toEqual(true);
    resizeHelper.stop();
    expect(resizeHelper.isResizing).toEqual(false);

    // start with parent observe div: border-top
    targetDiv = getDivTarget(false);
    targetDiv.setAttribute('border', 'top');
    targetDiv.setAttribute('data-resize-border', 'top');
    resizeHelper.start({
      target: targetDiv
    });
    expect(resizeHelper.isResizing).toEqual(true);
    resizeHelper.stop();
    expect(resizeHelper.isResizing).toEqual(false);

    // start with parent observe div: border-top
    targetDiv = getDivTarget(false);
    targetDiv.setAttribute('border', 'bottom');
    targetDiv.setAttribute('data-resize-border', 'bottom');
    resizeHelper.start({
      target: targetDiv
    });
    expect(resizeHelper.isResizing).toEqual(true);
    resizeHelper.stop();
    expect(resizeHelper.isResizing).toEqual(false);

    // start with no valid props
    resizeHelper.start({
      target: document.createElement('div')
    });
    expect(resizeHelper.isResizing).toEqual(false);

    // start with content, but no valid border
    targetDiv = getDivTarget(true);
    targetDiv.setAttribute('border', '');
    targetDiv.setAttribute('style', 'top:1px; bottom:10px;');
    targetDiv.parentElement.setAttribute('data-resize-border', '');
    resizeHelper.start({
      target: targetDiv
    });
    expect(resizeHelper.isResizing).toEqual(true);
    resizeHelper.stop();
    expect(resizeHelper.isResizing).toEqual(false);

    // start with content, but top/bottom is 0
    targetDiv = getDivTarget(true);
    targetDiv.setAttribute('border', 'top');
    targetDiv.setAttribute('style', 'top:0px; bottom:0px;');
    targetDiv.parentElement.setAttribute('data-resize-border', '');
    resizeHelper.start({
      target: targetDiv
    });
    expect(resizeHelper.isResizing).toEqual(true);
    resizeHelper.stop();

    targetDiv.setAttribute('border', 'bottom');
    resizeHelper.start({
      target: targetDiv
    });
    expect(resizeHelper.isResizing).toEqual(true);
    resizeHelper.stop();

    // start with container, but no valid border
    targetDiv = getDivTarget(false);
    targetDiv.setAttribute('border', '');
    targetDiv.setAttribute('data-resize-border', '');
    resizeHelper.start({
      target: targetDiv
    });
    expect(resizeHelper.isResizing).toEqual(true);
    resizeHelper.stop();
    expect(resizeHelper.isResizing).toEqual(false);
  });

  it('resizeHelper observe function work well', () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 120,
        height: 120,
        top: 0,
        left: 0,
        bottom: 100,
        right: 100,
      }
    });

    let resizeHelper = new ResizeHelper({
      onResizeStart: jest.fn(),
      onResizeEnd: jest.fn(),
      snapRadix: 10
    });

    // aui-resizable : top 
    let targetDiv = getDivTarget(false);
    targetDiv.className = 'aui-resizable';
    resizeHelper.observe({
      target: targetDiv,
      clientY: 0
    });
    expect(targetDiv.className).toEqual('aui-resizable observe-resize');
    expect(targetDiv.getAttribute('data-resize-border')).toEqual('top');

    // aui-resizable : bottom 
    targetDiv = getDivTarget(false);
    targetDiv.className = 'aui-resizable';
    resizeHelper.observe({
      target: targetDiv,
      clientY: 100
    });
    expect(targetDiv.className).toEqual('aui-resizable observe-resize');
    expect(targetDiv.getAttribute('data-resize-border')).toEqual('bottom');

    // fc-content : top 
    let targetParentDiv = getDivTarget(false);
    targetParentDiv.className = 'aui-resizable';
    targetDiv = targetParentDiv.getElementsByClassName('fc-content')[0];
    resizeHelper.observe({
      target: targetDiv,
      clientY: 0
    });
    expect(targetParentDiv.className).toEqual('aui-resizable observe-resize');
    expect(targetParentDiv.getAttribute('data-resize-border')).toEqual('top');

    // fc-content : bottom 
    targetParentDiv = getDivTarget(false);
    targetParentDiv.className = 'aui-resizable';
    targetDiv = targetParentDiv.getElementsByClassName('fc-content')[0];
    resizeHelper.observe({
      target: targetDiv,
      clientY: 100
    });
    expect(targetParentDiv.className).toEqual('aui-resizable observe-resize');
    expect(targetParentDiv.getAttribute('data-resize-border')).toEqual('bottom');

    // fc-content : else
    targetParentDiv = getDivTarget(false);
    targetParentDiv.className = 'aui-resizable';
    targetDiv = targetParentDiv.getElementsByClassName('fc-content')[0];
    resizeHelper.observe({
      target: targetDiv,
      clientY: 50
    });
    expect(targetParentDiv.className).toEqual('aui-resizable');
    expect(targetParentDiv.getAttribute('data-resize-border')).toBeNull();

    // the else condition and do have observing
    targetDiv = getDivTarget(false);
    document.getElementsByTagName("BODY")[0].appendChild(targetDiv);
    resizeHelper.observe({
      target: targetDiv
    });
    expect(document.getElementsByClassName('observe-resize').length).toEqual(0);

    // aui-resizable : null 
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 120,
        height: 120,
        top: 0,
        left: 0,
        bottom: 20,
        right: 100,
      }
    });
    targetDiv = getDivTarget(false);
    targetDiv.className = 'aui-resizable';
    resizeHelper.observe({
      target: targetDiv,
      clientY: 10
    });
    expect(targetDiv.className).toEqual('aui-resizable');
  });

  it('resizeHelper resize function work well', () => {
    let resizeHelper = new ResizeHelper({
      onResizeStart: jest.fn(),
      onResizeEnd: jest.fn(),
      snapRadix: 1
    });

    const event = {
      id: 1,
      end: 100,
      start: 0
    }
    resizeHelper.push(event);

    // border: top
    let targetDiv = getDivTarget(false);
    targetDiv.setAttribute('border', 'top');
    let fcContentDiv = targetDiv.getElementsByClassName('fc-content')[0];
    fcContentDiv.setAttribute('style', 'top:5px; bottom:10px;');
    resizeHelper.start({
      target: targetDiv,
      clientY: 50
    });
    resizeHelper.resize({
      clientY: 100
    });
    expect(targetDiv.style.zIndex).toEqual('3');
    expect(fcContentDiv.style['top']).toEqual('-1px');
  });
  it('resizeHelper clearResize should work well.', () => {
    let resizeHelper = new ResizeHelper({
      onResizeStart: jest.fn(),
      onResizeEnd: jest.fn()
    });

    const event = {
      id: 1,
      start: moment(),
      end: moment().add(1, 'hour')
    }
    resizeHelper.push(event);

    // start with fc content: border-top
    let targetDiv = getDivTarget();
    resizeHelper.start({
      target: targetDiv
    });
    expect(resizeHelper.isResizing).toEqual(true);
    expect(hasClass(targetDiv, 'is-resizing')).toBeTruthy();
    expect(hasClass(document.body, 'is-resizing')).toBeTruthy();

    resizeHelper.clearResize();
    expect(resizeHelper.isResizing).toEqual(false);
    expect(hasClass(targetDiv, 'is-resizing')).toBeFalsy();
    expect(hasClass(document.body, 'is-resizing')).toBeFalsy();
  })

});
