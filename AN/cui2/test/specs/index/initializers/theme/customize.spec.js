import { fromJS } from 'immutable';
import _theme from 'index/initializers/theme';

describe('shared/styles/themes', () => {
  it('should run isCustomizedTheme func correctly', () => {
    expect(_theme.isCustomizedTheme('test')).toBeFalsy();
    expect(_theme.isCustomizedTheme('Custom')).toBeTruthy();
    expect(_theme.isCustomizedTheme('')).toBeUndefined();
  });
  it('should run getNavBarClass func correctly', () => {
    expect(_theme.getNavBarClass({ name: 'test' })).toEqual('test-bar');
    expect(_theme.getNavBarClass({ name: 'Custom' })).toBeNull();
  });
  it('should run getNavBarStyles func correctly', () => {
    const customizedColors = fromJS({
      dark_accent_color: 20,
      dark_accent_color_darker: 30
    });
    const expectObj = {
      "background": "linear-gradient(to bottom,  20 0%, 30 100%)",
      "borderBottom": "1px solid 30",
      "boxShadow": "0px 0px 0px rgba(000,000,000,0)",
      "color": "#ffffff",
      "textShadow": "0px 0px 0px rgba(000,000,000,0)"
    }
    expect(_theme.getNavBarStyles({ name: 'test' })).toEqual({});
    expect(_theme.getNavBarStyles({ name: 'Custom', customizedColors })).toEqual(expectObj);
  });
  it('should run getNavItemStyles func correctly', () => {
    const customizedColors = fromJS({
      dark_accent_color: 20,
      dark_accent_color_darker: 30,
      primary_color: 'red',
      primary_color_darker: 30,
      primary_color_brighter: 30,
      dark_accent_color_brighter: 30,
      dark_accent_color_brighter_less: 30
    });
    const expectObj = {
        navItem: { ':hover': { background: 'linear-gradient(to bottom,  20 0%,30 100%)' } },
        active:
        {
            boxShadow: '0px 0px 0px rgba(000,000,000,0)',
            textShadow: '0px 0px 0px rgba(000,000,000,0)',
            background: 'linear-gradient(to bottom, 30 0%, 30 100%)'
        },
        myCart:
        {
            background: 'linear-gradient(to bottom,  red 0%, 30 100%)',
            ':hover': { background: 'linear-gradient(to bottom,  30 0%, red 100%)' }
        }
    };
    expect(_theme.getNavItemStyles({ name: 'test' })).toEqual({});
    expect(_theme.getNavItemStyles({ name: 'Custom', customizedColors })).toMatchObject(expectObj);
  });
  it('should run getSecondaryMenuStyles func correctly', () => {
    const customizedColors = fromJS({
      light_neutral_color: 'red'
    });
    const expectObj = { background: 'red' };
    expect(_theme.getSecondaryMenuStyles({ name: 'test' })).toEqual({});
    expect(_theme.getSecondaryMenuStyles({ name: 'Custom', customizedColors })).toEqual(expectObj);
  });
  it('should run getFooterLineStyles func correctly', () => {
    const customizedColors = fromJS({
      dark_accent_color: 'red'
    });
    const expectObj = { 'border-top': '1px solid red' };
    expect(_theme.getFooterLineStyles({ name: 'test' })).toEqual({});
    expect(_theme.getFooterLineStyles({ name: 'Custom', customizedColors })).toEqual(expectObj);
  });
  it('should run applyCustomizeColors func correctly', () => {
    const customized_theme = fromJS({
      light_neutral_color: 20,
      light_neutral_color_darker: 30,
      primary_color: 'red',
      primary_color_darker: 30,
      primary_color_brighter: 30,
      light_neutral_color_brighter: 30,
      light_neutral_color_brighter_less: 30
    });
    const theme = { current_theme: 'Custom', customized_theme };
    _theme.applyCustomizeColors(theme);
  });
  it('should initialize correctly',()=> {
    const theme = {
      customizeStyle: {
        current_theme: 'testTheme'
      }
    };
    _theme.initialize(theme);
    expect(document.documentElement.classList).toContain('an-theme-testTheme');
  });
});
