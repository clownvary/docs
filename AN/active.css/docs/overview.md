---
layout: page
title: Overview
---

Welcome to the Draft ACTIVE Style Guide Standards! Here, you'll find dozens of flexible and practical reusable components to create beautiful, consistent experiences across ACTIVE web apps.

Overview refers to the global resets and dependencies that **Active.css** is built upon.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Mobile first

**Active.css** supports reponsive design out of box and you can set up the basic layout for small devices at first, then, along with devices get larger and larger, you could put more enhancment on the layer to support responsive design.

## Box-sizing

We had reset `box-sizing` with `border-box` for every element with the code below in ACTIVE. Please refer to [Box Sizing](https://css-tricks.com/box-sizing/) article from [CSS-TRICKS](https://css-tricks.com/) for more details. After resetting that, it'd be help us to manage the layouts of elements with ease that have `padding` and `border` at the same time.

### The **Old** border-box Reset:

{% highlight CSS %}
*,
*::before,
*::after {
  box-sizing: border-box;
}
{% endhighlight %}

The promise for the implenmentation is that the `*` selector makes it difficult for developers to use `content-box` or `padding-box` elsewhere in the CSS.

### Universal Box Sizing with Inheritance:

{% highlight CSS %}
html
{
    box-sizing: border-box;
    // `-webkit-tap-highlight-color` is a non-standard CSS property that sets the color of the highlight that appears over a link while it's being tapped.
    // Here we want to prevent tap highlight color
    // See https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-tap-highlight-color
    -webkit-tap-highlight-color: rgba(0,0,0,0);

    // For better font rendering
    // See https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after
{
    box-sizing: inherit;
}
{% endhighlight %}

This reset gives you more flexibility than its predecessors — you can use `content-box` or `padding-box` at will, don't need to worry about a universal selector overriding your CSS.

> Head to [Inheriting box-sizing Probably Slightly Better Best-Practice](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/) for more depth on this technique and the reasoning behind it.

## Built on top of [Normalize.css](http://necolas.github.io/normalize.css/)

For improved cross-browser rendering, we use [Normalize.css](http://necolas.github.io/normalize.css/) to correct small inconsistencies across browsers and devices and makes browsers render all elements more consistently and in line with modern standards. [Normalize.css](http://necolas.github.io/normalize.css/) precisely targets only the styles that need normalizing.

## Disclosure

[Bootstrap.css](https://github.com/twbs/bootstrap) is the most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web, we had refered its parts of implemententation in order to avoiding repeat yourself. Here is the list for that:

For mixins:

- [less/mixins/alerts.less](https://gitlab.dev.activenetwork.com/fee/active.css/blob/master/less/mixins/alerts.less), including `.alert-variant`
- [less/mixins/buttons.less](https://gitlab.dev.activenetwork.com/fee/active.css/blob/master/less/mixins/buttons.less), partially, including `.m-button-variant` and `.m-button-size`
- [less/mixins/input.less](https://gitlab.dev.activenetwork.com/fee/active.css/blob/master/less/mixins/input.less): partially, including `.m-input-focus` and `.m-input-size`

For components:

- [components/pagination.less](https://gitlab.dev.activenetwork.com/fee/active.css/blob/master/less/components/pagination.less)
- [components/btn-group.less](https://gitlab.dev.activenetwork.com/fee/active.css/blob/master/less/components/pills.less) partially, only including `.btn-group` and `.btn-group-vertical`

For button groups component, we had renamed it as `pills` instead of `button-groups` according to our [Visual Spec](http://sgd.dev.activenetwork.com:3000/aui/navigation/pills).
