import showAndHideAnimation from 'shared/utils/showAndHideAnimation';

describe('shared/utils/showAndHideAnimation', () => {
  test('showAndHideAnimation method should work fine, if the display of dom is block', () => {
    const event = {
      target: document.createElement('div')
    };
    const control = {
      style: {
        display: 'block'
      }
    };
    const result = showAndHideAnimation(event, control);
    expect(event.target.getAttribute('class')).toEqual('icon icon-chevron-down');
  });

  test('showAndHideAnimation method should work fine, if the display of dom is none', () => {
    const event = {
      target: document.createElement('div')
    };
    const control = {
      style: {
        display: 'none'
      }
    };
    const result = showAndHideAnimation(event, control);
    expect(event.target.getAttribute('class')).toEqual('icon icon-chevron-up');
  });
});
