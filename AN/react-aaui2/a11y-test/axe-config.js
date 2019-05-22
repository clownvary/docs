// default rule list: https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md
const config = {
  rules: {
    'link-in-text-block': { enabled: true },
    // WCAG2AA UI improvement
    'color-contrast': { enabled: false },
    // will be done when generate unique Id
    label: { enabled: false },
    tabindex: { enabled: false },
  },
}

export default config
