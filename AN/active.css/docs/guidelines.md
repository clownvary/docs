---
layout: simple
title: Guidelines
---

Best practices and guidelines for writing HTML and CSS with approachable formatting, syntax, and more.

## Contents

* Will be replaced with the ToC, excluding the 'Contents' header
{:toc}


## File Structure

The `index.less` files looks liks this:

    @charset 'UTF-8';

    // Index
    // --------------------------------------------------

    // Core variables and mixins
    @import 'variables';
    @import 'mixins';


    // reset
    @import (inline) 'normalize.css';
    @import 'reset';
    @import 'fonts';
    @import 'icon';


    // Base
    @import 'typography';


    // Layout
    @import 'components/grid';
    @import 'components/flex-grid';


    // Components
    @import 'components/button';
    @import 'components/pill';
    @import 'components/breadcrumb';
    @import 'components/alert';
    @import 'components/tooltip';
    @import 'components/list';
    @import 'components/tab';
    @import 'components/input';
    @import 'components/form';
    @import 'components/radio';
    @import 'components/checkbox';
    @import 'components/header';
    @import 'components/footer';
    @import 'components/table';
    @import 'components/tag';
    @import 'components/progress-steps';
    @import 'components/sidebar';
    @import 'components/label';
    @import 'components/radio';
    @import 'components/pagination';
    @import 'components/avatar';
    @import 'components/modal';
    @import 'components/dropdown';
    @import 'components/accordion';
    @import 'components/popover';
    @import 'components/well';
    @import 'components/input-group';
    @import 'components/date-picker';
    @import 'components/nav';
    @import 'components/more-button';
    @import 'components/radio-group';
    @import 'components/file-upload';
    @import 'components/toggle';

    // State
    @import 'states';


    // Utility classes
    @import 'utilities';


    @import 'animations';


We use [Normalize.css](http://necolas.github.io/normalize.css/) to correct small inconsistencies across browsers and devices and it standardizes CSS defaults across browsers.

## Style rules

We should sticks to these style rules:

- Prefer dashes over camelCasing in class names
    - **Underscores** and **PascalCasing** are okay if you are using **BEM**
    - No underscores or camelCase for selectors
- Use a new line for every selector and every declaration
- Do not use ID selectors
- Alphabetize declarations
- Use soft tabs with 2 spaces for indentation, not 4 spaces and not tabs
- Use lowercase and shorthand when appropriate, like `padding: 15px 0` or `#aaa`; and not `padding: 15px 0px 15px 0px`
- Generally, use the brand color variables When using a color, especially grayscale tones, prefer hsl(a) over hex and - rgb(a) when adding colors It’s easier to adjust the lightness or darkness, since you only have one variable to tweak
- No trailing whitespace
- Keep line length under 80 characters
- Place blank lines between rule declarations
- Include one space before the opening brace `{` in rule declarations and in declarations, put a space after, but not before the `:` character.
- Place closing braces `}` of declaration on a new line

## Tools

> Use only imports, variables, and mixins (and only for vender-prefixed features) from CSS preprocessors.

To keep our CSS readable and maintainable, we try our best to keep our CSS very vanilla. We use LESS, but only limited use imports, data-uri, variables, and some mixins.

Variable could help us define values which could be reused throughout the whole repo and we could import it in any LESS file.

Complex functions like `length`, `extract`, but `Grid` is the only one exception.

##  Components

>Syntax: `[<namespace>-]<componentName>[--descendentName][--modifierName]` 

>Square brackets denote optional parts

We use [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) as our naming methodology for the components. The naming convention follows this pattern:


    .block {}
    .block__element {}
    .block--modifier {}


- `.block` represents the higher level of an abstraction or component
- `.block__element` represents a descendent of .block that helps form `.block` as a whole
- `.block--modifier` represents a different state or version of `.block`

>The reason for double rather than single hyphens and underscores is so that your block itself can be hyphen delimited

It could bring several benefits for us when reading and writing HTML and CSS:

- It helps to distinguish between the classes for the root of the component, descendent elements, and modifications
- It keeps the specificity of selectors low
- It helps to decouple presentation semantics from document semantics
- It helps to keep code readable and maintainable
- ...

### namespace (**optional**)

Components can be prefixed with a namespace when necessary. For example, you may wish to avoid the potential for collisions between libraries and your custom components by prefixing all your components with a namespace.

```css
.awe-button { /* … */ }
.awe-tabs { /* … */ }
```

This makes it clear, when reading the HTML, which components are part of your library.

### component-name

The component's name should be written in dasherized. No one in the HTML/CSS uses pascal case.

```css
.site-search {} /* Block */
.site-search__field {} /* Element */
.site-search--full {} /* Modifier */
```

```html
<form class='site-search site-search--full'>
  <input type='text' class='site-search__field'>
  <input type='Submit' value ='Search' class='site-search__button'>
</form>
```

### my-component--modifier-name

A component modifier is a class that modifies the presentation of the base component in some form (e.g., for a certain configuration of the component). Modifier names also must be written dasherized format and be separated from the component name by two hyphens. The class should be included in the HTML in addition to the base component class.


### my-component--descendent-name

A component descendent is a class that is attached to a descendent node of a component. It's responsible for applying presentation directly to the descendent on behalf of a particular component. Descendent names must be written dasherized format.


### my-component.is-stateName

>A state is something that augments and overrides all other styles. 

`.is-` or `.has-`is used to signify that the piece of UI in question is currently styled a certain way because of a state or condition. This stateful namespace is gorgeous, and comes from SMACSS. It tells us that the DOM currently has a temporary, optional, or short-lived style applied to it due to a certain state being invoked.

Often, particularly with richer user interfaces, we need to style components to look different based on state. States such as opening, closing, showing, hiding, active, inactive, disabled, loading, loaded etc. To do this we must communicate this with an additional class name.

Use `is-stateName` for state-based modifications of components. The state name must be Camel case. **Never style these classes directly** and they should always be used as an adjoining class.

JS can add/remove these classes. This means that the same state names can be used in multiple contexts, but every component must define its own styles for the state (as they are scoped to the component).

```CSS
.dropdown { /* … */ }
.dropdown.is-open { /* … */ }
```

```html
<div class='dropdown dropdown.is-open'>
  <button class='dropdown__button'>
    ...
  </button>
  <ul>
    ...
  </ul>
</div>
```

#### Isnʼt it just a modifier?

There is plenty of similarity between a `my-component--modifier-name`style and a state style. They both modify the existing look of a component. However, they differ in two key ways:

- State styles can apply to layout and/or component styles
- **State styles indicate a JavaScript dependency**

It is this second point that is the most important distinction. Component modifier styles are applied to a component at render time and then are never changed again. State styles, however, are applied to elements to indicate a change in state while the page is still running on the client machine through JavaScript.

For example, clicking on a `dropdown` will activate that dropdown. Therefore, an `is-open` state class is appropriate. Clicking on a dialog close button will hide the dialog, therefore, an is-hidden class is appropriate.

## Mixins

>Prefix mixins with .m- and only use them sparingly for shared styles.

## Utilities

Certain CSS properties and patterns are used frequently. For example: floats, containing floats, vertical alignment, text truncation. Relying on utilities can help to reduce repetition and provide consistent implementations.

> Prefix utility classes with .u-.

Syntax: `u-<utilityName>`

### u-utilityName

`u-` is used to signify that this class is a Utility class. It has a very specific role (often providing only one declaration) and should not be bound onto or changed. It can be reused and is not tied to any specific piece of UI. You will probably recognise this namespace from libraries and methodologies like other CSS frameworks.

Utilities must use a camelCase name. We could compose various utilities to create a simple structure within a component

Utilities should be grouped by type. The names of utilities with similar concerns usually start with a common string, e.g., u-textCenter, u-textTruncate; u-linkClean, u-linkBlock.


```html
<div class='u-clearfix'>
  <a class='u-floatLeft' href='{{url}}'>
    <img class='u-imageResponsive' src='{{src}}' alt=''>
  </a>
  <p class='u-wordBreak'>
    ...
  </p>
</div>
```

### t-themeName

`t-` is used to signify that a class is responsible for adding a **Theme** to a view. It lets us know that UI Components’ current cosmetic appearance may be due to the presence of a theme.

## JavaScript CSS Class

> Separate style and behavior concerns by using `.js-` prefixed classes for behavior.

`js-` is used to signify that this piece of the DOM has some behaviour acting upon it, and that JavaScript binds onto it to provide that behaviour. If you’re not a developer working with JavaScript, leave these well alone.

## Performance

Yes, we also must put more focus on the CSS performance and always write efficient CSS.

- [Writing efficient CSS selectors](http://csswizardry.com/2011/09/writing-efficient-css-selectors/)
- [Efficiently Rendering CSS](https://css-tricks.com/efficiently-rendering-css/)
- [Write efficient CSS <sub>Guidelines for optimizing CSS code, and more specifically on how to write efficient selectors</sub>](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS)

## Reference

- [idiomatic-css <sub>Principles of writing consistent, idiomatic CSS.</sub>](https://github.com/necolas/idiomatic-css)
- [Trello CSS Style Guide](https://github.com/trello/trellisheets/blob/master/styleguide.md)
- [MindBEMding – getting your head ’round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
