---
layout: simple
title: About
---

Learn more about this styleguide, particularly **how** it's built, **why** we built it, the benefits we could get and who maintains it.

### What and why

[Active.css](http://css/) is ACTIVE's internal CSS framework which enusres a consistent look-and-feel across our products and makes it easy to update for site-wide design refreshes. It provides dozens of flexible and practical reusable components that increase our productivity to streamline future feature work, and also developers, designers, product managers, marketing and external agencie will be able to easily reference defined application UI designs and streamline workflow processes.

This is a general guide, and there will be some exceptions where products with unique functions will need to reiterate on some UI elements while following a consistent style. It includes basic global styling for typography, small components like buttons and alerts, and our general guidelines for writing HTML and CSS. It's been used internally at ACTIVE for years now.

### Problems we're solving

In the past, every product team consumes its own CSS Styles implementation, so we're always facing the same problems:

- Hard to maintain and reuse the same CSS styles
- Keep the consistent experiences across ACTIVE web apps

### Benefits

So why we craft this CSS Style Guide? Why invest the time and effort into building the system for our company? For us we saw a few key benefits:

- Standardization
  - Maintain a level of standards and best practices for the CSS Style Guide throughout the company

- Consistency
  - Establish the common language for designers, developers, product managers, marketing and external agencie
  - Keep the ACTIVE products with a consistent look and feel for our mutli-device Web
  - A more consistent experience will give your customers more confidence when they use your product

- Efficiency
  - DRY
  - Resue the standard patterns easily throughout the company as a source of truth regradless of platforms or techs
  - Help team members worry less about how things should look and gets them focusing more on how things should work

- Maintainability
  - We're taking a modular based approach and building small sets of components that can work together to form a cohesive look and feel for our product
  - Working this way we can worry less about the design as whole and focus solely on smaller parts of the UI.

### Who uses it

The following ACTIVE products are in use:

- [Active.css Living Documentation](http://css/) (Yes, the pages you're seeing!) (Static Web Site)
- [AWE AUI](https://fndsvn.dev.activenetwork.com/foundations/endurance/fnd-webserver-endurance/) (Backbone + ARCH-HTML + Java)
- [AWS AUI](https://gitlab.dev.activenetwork.com/groups/Swimming) (Backbone + ARCH-HTML + Java)
- [LeagueOne](https://gitlab.dev.activenetwork.com/groups/LeagueOne) (.NET)
  - [LeagueOne AUI](https://gitlab.dev.activenetwork.com/LeagueOne/aui)
  - [LeagueOne CUI](https://gitlab.dev.activenetwork.com/LeagueOne/cui)
- [ANET](https://gitlab.dev.activenetwork.com/groups/ActiveNet) (React + Java)
  - [ANET AUI Facility Redesign](https://gitlab.dev.activenetwork.com/ActiveNet/aui)
  - [ANET CUI NEW Shopping Cart](https://gitlab.dev.activenetwork.com/ActiveNet/cui)
- Checkout UI: **in progress**
- [VEB](http://www.virtualeventbags.com/): By gradullay introducing React to an existing project and apply Product Style Guide styles.

### Browser support

Active.css currently supports Internet Explorer 10+ and the latest two versions of Chrome, Safari, and Firefox on OS X and Windows. While not a responsive or mobile-focused project, Mobile Safari and Chrome for Android should render just fine. Support for Linux-based browsers is not strictly guaranteed, but accounted for whenever possible.

Refer to the [ACTIVE TESTED BROWSERS STATEMENT](http://dashboard.activenetwork.com/boards/23073) for more details and some exceptions.

Here is a quick view:

>All Active web applications are tested with the following browsers, unless an exception is noted below.
  - IE11
  - Firefox (latest)
  - Chrome (latest)
  - Mobile Devices
  - Safari 7.0

> Exceptions:
>
>  - **Activity Cloud**(Activity cloud follows the same tested browser list stated above, but has specific tested devices.)
>    - iPad with iOS7 and Safari
>    - Samsung Galaxy Tab with the default Android 4.0 browser
>  - **RTP**: IE8, IE9, Chrome latest.  Mobile devices Safari 7.0.
>  - **AWO**
>    - **UWP**: IE10, IE11, FF latest, Chrome latest. Mobile iOS devices Safari, Android devices.
>    - **AWO Client**: IE7 (rec.gov only), IE9, IE10, IE11 (Issuer Manager only).
>    - **Field Manager Mobile**: iOS safari, Android Chrome, Surface IE10
>  - **ActiveNet**
>    - AUI: IE10, IE11 (Windows7 and Windows8) and IE11 (Windows10)
>    - CUI: IE11, Edge, Chrome Latest, Safari Latest on iOS devices

### Future updates

See the [roadmap](/roadmap) for a rough outline on what's slated for future versions of Active.

### Dependencies

- Our styles are built with LESS.
- Postcss is used to tranforming our styles through many focused optimisations, to ensure that the final result is as small as possible for a production environment. See **.postcss.json** for the plugins we have used.

### Who

Currently maintained by the ACTIVE FEE China team and any questions and technical supports please contact [Khalil Zhang](mailto:Khalil.Zhang@activenetwork.com) at first.
