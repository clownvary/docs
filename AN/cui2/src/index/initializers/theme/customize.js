export function isCustomizedTheme(name) {
  if (!name) {
    return undefined;
  }
  return name === 'Custom';
}

export function getNavBarClass({ name }) {
  return isCustomizedTheme(name) ? null : `${name}-bar`;
}

export function getNavBarStyles(theme) {
  if (!isCustomizedTheme(theme.name)) {
    return {};
  }
  const {
    dark_accent_color: darkAccentColor,
    dark_accent_color_darker: darkAccentColorDarker
  } = theme.customizedColors.toJS();
  return {
    color: '#ffffff',
    background: `linear-gradient(to bottom,  ${darkAccentColor} 0%, ${darkAccentColorDarker} 100%)`, // eslint-disable-line
    boxShadow: '0px 0px 0px rgba(000,000,000,0)',
    textShadow: '0px 0px 0px rgba(000,000,000,0)',
    borderBottom: `1px solid ${darkAccentColorDarker}`
  };
}

export function getNavItemStyles(theme) {
  if (!isCustomizedTheme(theme.name)) {
    return {};
  }
  const {
    dark_accent_color: darkAccentColor,
    dark_accent_color_darker: darkAccentColorDarker,
    primary_color: primaryColor,
    primary_color_darker: primaryColorDarker,
    primary_color_brighter: primaryColorBrighter,
    dark_accent_color_brighter: darkAccentColorBrighter,
    dark_accent_color_brighter_less: darkAccentColorBrighterLess
  } = theme.customizedColors.toJS();
  return {
    navItem: {
      ':hover': {
        background: `linear-gradient(to bottom,  ${darkAccentColor} 0%,${darkAccentColorDarker} 100%)`,// eslint-disable-line
        border: `0px solid ${darkAccentColorDarker}`
      }
    },
    active: {
      boxShadow: '0px 0px 0px rgba(000,000,000,0)',
      textShadow: '0px 0px 0px rgba(000,000,000,0)',
      background: `linear-gradient(to bottom, ${darkAccentColorBrighterLess} 0%, ${darkAccentColorBrighter} 100%)`
    },
    myCart: {
      background: `linear-gradient(to bottom,  ${primaryColor} 0%, ${primaryColorDarker} 100%)`,// eslint-disable-line
      border: '0px',
      ':hover': {
        background: `linear-gradient(to bottom,  ${primaryColorBrighter} 0%, ${primaryColor} 100%)`// eslint-disable-line
      }
    }
  };
}

export function getSecondaryMenuStyles(theme) {
  if (!isCustomizedTheme(theme.name)) {
    return {};
  }
  return {
    background: `${theme.customizedColors.get('light_neutral_color')}`
  };
}

export function getFooterLineStyles(theme) {
  if (!isCustomizedTheme(theme.name)) {
    return {};
  }
  return {
    'border-top': `1px solid ${theme.customizedColors.get('dark_accent_color')}`
  };
}

function getCustomizeStyle(colorSettings) {
  let style = '';
  const themeName = '.an-theme-Custom';
    // istanbul ignore else
  if (colorSettings) {
    style = `
      ${themeName} .btn.btn-strong {
        background:${colorSettings.primary_color};
        border:solid 1px ${colorSettings.primary_color};
      }
      ${themeName} .btn.btn-strong:hover,.btn.btn-strong.focus,.btn.btn-strong:focus,.btn.btn-strong:active,.btn.btn-strong.active,
      .btn.btn-strong:active:hover, .btn.btn-strong.active:hover, .btn.btn-strong:active:focus, .btn.btn-strong.active:focus,
       .btn.btn-strong:active.focus, .btn.btn-strong.active.focus {
        background-color:${colorSettings.primary_color_darker};
        border-color:${colorSettings.primary_color_darker};
      }
      ${themeName} .btn.btn-strong.disabled:hover, .btn.btn-strong[disabled]:hover,.btn.btn-strong.disabled:focus,
      .btn.btn-strong[disabled]:focus, .btn.btn-strong.disabled.focus, .btn.btn-strong[disabled].focus {
        background-color:${colorSettings.primary_color};
        border-color:${colorSettings.primary_color};
      }
      ${themeName} .btn.btn-primary {
        background:${colorSettings.secondary_color};
        border:solid 1px ${colorSettings.secondary_color};
      }
      ${themeName} .btn.btn-primary:hover,.btn.btn-primary.focus,.btn.btn-primary:focus,.btn.btn-primary:active,.btn.btn-primary.active,
      .btn.btn-primary:active:hover, .btn.btn-primary.active:hover, .btn.btn-primary:active:focus, .btn.btn-primary.active:focus,
       .btn.btn-primary:active.focus, .btn.btn-primary.active.focus  {
        background-color:${colorSettings.secondary_color_darker};
        border-color:${colorSettings.secondary_color_darker};
      }
      ${themeName} .btn.btn-primary.disabled:hover, .btn.btn-primary[disabled]:hover,.btn.btn-primary.disabled:focus,
      .btn.btn-primary[disabled]:focus, .btn.btn-primary.disabled.focus, .btn.btn-primary[disabled].focus {
        background-color:${colorSettings.secondary_color};
        border-color:${colorSettings.secondary_color};
      }
      ${themeName} #app-root .an-main .payment-comp__tab.is-active > .tab-box {
        border-color:${colorSettings.secondary_color};
      }
      ${themeName} #app-root .an-main .payment-comp__tab.is-active > .tab-box span{
        color:${colorSettings.secondary_color};
      }
      ${themeName} .u-bg-color--light-neutral, ${themeName} .an-simple-table, ${themeName} .transactions-layouts .transaction__title,
      ${themeName} .an-bubble {
        background-color:${colorSettings.light_neutral_color};
      }
      ${themeName} .u-bg-color--dark-accent {
        background-color:${colorSettings.dark_accent_color};
      }
      ${themeName} .an-simple-table > tbody, ${themeName} .an-simple-table > thead, ${themeName} .an-simple-table tbody > tr {
        border-bottom-color: ${colorSettings.dark_accent_color};
      }
      ${themeName} .an-bubble::after {
        border-right-color:${colorSettings.light_neutral_color};
      }
      ${themeName} .an-responsiveHeader .an-responsiveHeader__menu button:active, ${themeName} .an-responsiveHeader .an-responsiveHeader__cart button:active {
        background-color: ${colorSettings.primary_color};
      }
      ${themeName} .an-responsiveHeader .an-responsiveHeader__menu button:active .icon-svg , ${themeName} .an-responsiveHeader .an-responsiveHeader__cart button:active .icon-svg {
        color: #ffffff;
      }
      ${themeName} .an-responsiveHeader .an-responsiveHeader__cart button:active .an-responsiveHeader__cart-count {
        background-color: #ffffff;
        color:${colorSettings.primary_color};
      }
      ${themeName} .an-responsiveHeader .an-responsiveHeader__cart button .an-responsiveHeader__cart-count {
        background-color: ${colorSettings.primary_color};
        color: #ffffff
      }
      ${themeName} .an-responsiveNavigation__wrapper ul > li:not(.sign-in-bar):hover, ${themeName} .an-responsiveNavigation__wrapper ul > li:not(.sign-in-bar) a:hover {
        background-color: ${colorSettings.secondary_color};
      }
      ${themeName} .an-responsiveNavigation__wrapper ul > li:not(.sign-in-bar).current-menu a > span {
        color: ${colorSettings.secondary_color};
      }
      ${themeName} .an-responsiveNavigation__wrapper ul > li:not(.sign-in-bar).current-menu:hover a > span {
        color: #ffffff;
      }`;
  }
  return style;
}

export function applyCustomizeColors(theme) {
  if (isCustomizedTheme(theme.current_theme)) {
    const styleStr = getCustomizeStyle(theme.customized_theme);
    const nod = document.createElement('style');
    nod.type = 'text/css';
      // istanbul ignore if
    if (nod.styleSheet) {
      nod.styleSheet.cssText = styleStr;
    } else {
      nod.innerHTML = styleStr;
    }
    document.getElementsByTagName('head')[0].appendChild(nod);
  }
}

export function initializeTheme(theme) {
  if (theme) {
    document.documentElement.classList.add(`an-theme-${theme.current_theme}`);
    applyCustomizeColors(theme);
  }
}
