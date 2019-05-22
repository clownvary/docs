import {
  getScreenHeightExceptHeader
} from 'shared/utils/deviceTools';

describe('shared/utils/deviceTools', () => {
  it('Height should be 620', () => {
    const height = getScreenHeightExceptHeader();
    expect(height).toEqual(620);
  });

  it('Height should be window.innerHeight', () => {
    const appRootElement = document.createElement('div');
    appRootElement.setAttribute('id', 'app-root');

    const targetElement = document.createElement('div');
    targetElement.setAttribute('class', 'an-responsiveHeader');

    appRootElement.appendChild(targetElement);
    document.body.appendChild(appRootElement);

    const height = getScreenHeightExceptHeader();
    expect(height).toEqual(window.innerHeight);

    document.body.innerHTML = '';
  });
});
