# Active UI

[![PRs Welcome](https://img.shields.io/badge/prs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> This library contains a set of flexible and practical reusable components conforming to the ACTIVE product styleguide and React-based implementation.

## Table of Contents

- [Background](#background)
- [Features](#features)
- [Goal](#goal)
- [Release](#release)
- [Who uses it](#who-uses-it)
- [Browser compatibility](#browser-compatibility)
- [Build](#build)
- [Release](#release)
- [Installation](#installation)
- [Usage](#usage)
- [Dev Env Setup](#dev-env-setup)
- [Samples](#samples)
- [Lint](#lint)
- [Test](#test)
- [Contribute](#contribute)
- [Versioning](#versioning)
- [CHANGELOG](#CHANGELOG)
- [License](#license)

## Background

Before, we always craft our web app based on [arch-html](https://gitlab.dev.activenetwork.com/EnterpriseArchitecture/html) which is a JavaScript framework built and consumed by ACTIVE internal.
It's built upon RequireJS + jQuery and provide lots of reusable components. However, it's hard for us to maintain and custimized it according to various requirements, so we decide to
re-create all of the components based on React. If you want know more technical details, please move to [FAQ](http://fee/guides/faq).

[React](https://facebook.github.io/react/) is a JavaScript library for building user interfaces and advocated by Facebook. There're lots of sites using React, incluing **Airbnb**, **Netflix**, **Twitter Mobile**, **Alipay**, etc. React renders stuff quickly in the browser, but that's not of primary concern to most developers. What really matters is to be able to change stuff safely, and add improvements or features easily as our app grows large.

Also we can gradullay introduce it to an existing project, even if you work on a few years old legacy application you can still design a new screen using it, it not all or nothing.

## Features

- It's a library, not a framework
- Declarative components (tags like HTML)
- Will not mess up your CSS
- Customized builds, use only what you need
- Customization of components styles possible
- Composable and reusable

## Goal

Having a collection of components that can be reused in future projects.

### Who uses it

The following ACTIVE products are in use:

- [react-aaui online documentation](http://fee/)
- [ACTIVE Reader Cloud](https://gitlab.dev.activenetwork.com/ActiveWorks-TimingCloud/arc-ui)
- [LeagueOne](https://gitlab.dev.activenetwork.com/groups/LeagueOne) (.NET)
  - [LeagueOne AUI](https://gitlab.dev.activenetwork.com/LeagueOne/aui)
  - [LeagueOne CUI](https://gitlab.dev.activenetwork.com/LeagueOne/cui)
- [ANET](https://gitlab.dev.activenetwork.com/groups/ActiveNet) (Java)
  - [ANET AUI Facility Redesign](https://gitlab.dev.activenetwork.com/ActiveNet/aui)
  - [ANET CUI NEW Shopping Cart](https://gitlab.dev.activenetwork.com/ActiveNet/cui)
  - [react-base-ui](https://gitlab.dev.activenetwork.com/ActiveNet/react-base-ui/)
- [AWS AUI](https://gitlab.dev.activenetwork.com/groups/Swimming): **in progress** (Java)
- [VEB](http://www.virtualeventbags.com/): Starts from **[Content Builder](https://jirafnd.dev.activenetwork.com/browse/VEB-1518)** and **[DRIP Campaigin](https://jirafnd.dev.activenetwork.com/browse/VEB-2279)** (RoR)
- [Checkout lib](https://gitlab.dev.activenetwork.com/PlatformServices/checkout-lib) (Java)
- [Checkout web](https://gitlab.dev.activenetwork.com/PlatformServices/checkout-web) (Java)
- [Endurance MyEvents](https://gitlab.dev.activenetwork.com/Endurance/myevents-webui) (Java)
- [CCM](https://gitlab.dev.activenetwork.com/fee/camps-ui/) (Java)
- Active Results CUI: **in progress** (Java)
- ...

## Browser compatibility

IE10 and above are supported.

## Build

Ship `react-aaui` out with **AMD**, **CommonJS** or **ES2015** module formats.

```bash
npm run build
```

Btw, we also support **[jsnext:main](https://github.com/rollup/rollup/wiki/jsnext:main)** and **[pkg.module](https://github.com/rollup/rollup/wiki/pkg.module)**. (They're the same thing, except that **pkg.module** is more likely to become standardised.))

> jsnext:main or module will point to a module that has ES2015 module syntax but otherwise only syntax features that node supports.

## Release

We need to [automate the release process](http://fee-ci-01w.dev.activenetwork.com:8080/job/release-react-aaui/) in order to make it consumed by others for conveniently.

```bash
npm run release
```

The release script will do:

1. Make sure the tests pass
1. Build and publish the **AMD**, **CommonJS** or **ES2015** module formats (Ignore this step if we had set up the private npm registry)
1. Increment the package version in package.json
1. Create a new commit
1. Create a **v*** tag that points to that commit
1. Push to the same branch
1. Push the **v*** tag to GitLab
1. Push the **latest** tag to GitLab

Refer to [release.js](https://gitlab.dev.activenetwork.com/fee/react-aaui/blob/master/scripts/release.js) for more details.

Once the release is done, please send the Release Note to the respective stakeholders.

```
Front End China <FrontEndChina@activenetwork.com>; .ActiveNet FEE China <ActiveNetFEEChina@activenetwork.com>; .JumpForward.SoftwareEngineer <JumpForwardSoftwareEngineer@activenetwork.com>; VEB Dev All <veb.devall@activenetwork.com>; Guo, Gran <Gran.Guo@activenetwork.com>; Lei, Turbo <Turbo.Lei@activenetwork.com>; Jia, Kevin <Kevin.Jia@activenetwork.com>; Crusoe.Xia <Crusoe.Xia@activenetwork.com>
```

## Installation

Install `react-aaui` with npm and have your `package.json` configured like the way below:

```JavaScript

{
  "dependencies": {
    "active.css": "git+ssh://git@gitlab.dev.activenetwork.com:fee/active.css.git",
    "react-aaui": "git+ssh://git@gitlab.dev.activenetwork.com:fee/react-aaui.git"
  },
  ...
}
```

You can then use one of the module formats:

- `main`: `lib/index.js` - exports itself as a CommonJS module
- `global`: `dist/react-aaui.js` and `dist/react-aaui.min.js` - exports
  itself as a [umd][umd] module which is consumable in several environments, the
  most notable as a global.
- `jsnext:main` and `module`: `es/index.js` - exports itself using the
  ES modules specification, you'll need to configure webpack to make use of this
  file do this using the [resolve.mainFields][mainFields] property.

> Go add a SSH key in GitLab if you haven't do so already

Then run `npm i`.

Configure your Webpack so it:

- Loads LESS files, image files and font files
- Include `node_modules/react-aaui` in your loaders

```JavaScript
{
  ...,
  resolve: {
    extensions: ['', '.js', '.less'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/react-aaui)/,
        loader: "babel",
        query: {
          presets: ["es2015", "stage-2", "react"],
          cacheDirectory: true
        }
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules(?!\/react-aaui)/,
        ...
      },
      {
        test: /\.less$/,
        exclude: /node_modules(?!\/react-aaui)/,
        ...
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        exclude: /node_modules(?!\/react-aaui)/,
        ...
      },
      ...
    ]
  },
  ...
```

## Usage

For convenience, React AAUI exposes its full API on the top-level `react-aaui` import. However, this causes the entire React AAUI library and its dependencies to be included in client bundles that include code that imports from the top-level CommonJS bundle.

Instead, the bindings exported from `react-aaui` are also available in `react-aaui/lib`. When using CommonJS modules, you can import directly from `react-aaui/lib` to avoid pulling in unused modules.

Assuming you are transpiling ES2015 modules into CommonJS modules, instead of:

```JavaScript
import { Button, Alert, Checkbox } from 'react-aaui'
```

use:

```JavaScript
import Button from 'react-aaui/lib/Button'
import Alert from 'react-aaui/lib/Alert'
import Checkbox from 'react-aaui/lib/Checkbox'
```

**And import style manually(starts from [v1.14.0](https://gitlab.dev.activenetwork.com/fee/react-aaui/tags/v1.14.0)]:**

```
import 'active.css/less/index.less'
```

The public API available in this manner is defined as the set of imports available from the top-level `react-aaui` module. Anything not available through the top-level `react-aaui` module is a private API, and is subject to change without notice.

Here is a more comprehensive sample:

```JavaScript
import React, { PureComponent } from 'react'

import { Button } from 'react-aaui'

class Foo extends PureComponent {
  render() {
    <div>
      <Button type="primary" onClick={this.onClick}>My Button</Button>
    </div>
  }

  onClick(e) {
    // ...
  }
}
```

> If you had started to use Webpack 2.x then maybe you don't need to do it like this way, because Webpack 2.x came with the built-in support for ES2015 modules(support **pkg.module** field in your **package.json**) and [Tree Shaking](https://webpack.js.org/guides/tree-shaking/#components/sidebar/sidebar.jsx) for dead-code elimination.

## Dev Env Setup

Clone the `react-aaui` repo and `cd` into the project folder. With [npm](https://npmjs.org/) installed, run:

```bash
git clone git@gitlab.dev.activenetwork.com:fee/react-aaui.git
cd react-aaui
npm i
```

Please notice the following points:

- Source codes are placed in the **src** directory and have to be written in **ES6**
- [LESS](http://lesscss.org/) is our CSS preprocessor, write **LESS**
- We use [NPM scripts](https://docs.npmjs.com/misc/scripts) as our general task automation tool
- [Webpack](http://webpack.github.io/docs/) is a module bundler for javascript and friends
- For each component you write, you have to create a respective test page under `tests` folder
- If you need to use icons(we're using [icomoon](https://icomoon.io/), ask **@kzhang** to package it or do it by yourself(PR is always welcome!)
- Create branches for you features and bug fixes, if a feature or bug fix is worked on with more than 1 people, then create your own branch from the feature branch again and name it with your name. E.g, if 2 people are all working on a feature `foo`, then each one has to create their own branch from `foo` named `foo-[name]` (like `foo-kzhang`).
- Strive to maintain a linear history with `git rebase`, the merging master will specifically ask you to do so before accepting merge requests. For details on how to do so, please take a look here: `smb://10.109.2.30/fee/trainings/git/merging-pull-requests.mp4`. If you want to learn more about interactive rebase, take a look here: `smb://10.109.2.30/fee/trainings/git/interactive-rebase.mp4`.
- ~~Special naming convention has to be followed. Every name is namespaced, be it a component name, a CSS class name, a LESS variable name or a folder name. `aaui` prefix is used following by the component's name. E.g, `aaui-tabs`, `aaui-tabs-title`, `aauiTabsActive`, `@aauiTabsBgColor`. Refer to the existing source code, and be consistent.~~ We want to make it more generic so discard this rule start from 1.x.x.
- Refer to the existing source code and project structure and be consistent.
- No jQuery. You can probably find what you need [here](http://youmightnotneedjquery.com/)
- Think twice before introducing any external libraries as they contribute on file size. Smaller payload over the wire, fewer lines of code to parse, faster to execute. You might want to find some [micro alternatives](http://microjs.com/#) or write it yourself. Anyway, we should leverage third-party libraries whenever possible as it could reduce our costs and mitigate the risks.

## Samples

Run the sample page with the command below:

```bash
npm run sample
```
> If you just run `npm run sample` then it'd generate entries for all samples. That means it would recompile all of the code base even though you just modify one small piece.

Run the specific samples:

```bash
COMPONENTS=input,button npm run sample
```

## Lint

Run your lint:

```
npm run lint
```

If you want to get the **checkstyle** formatter(which is mainly used to integrate with our CI) then run:

```
npm run lint:checkstyle
```

## Test

We use [Jest](http://facebook.github.io/jest/) + [Enzyme](https://github.com/airbnb/enzyme) to test the components, run the unit test with command below:

```bash
npm test
```

Bascially, the unit tests of react-aaui had covered every component and shared util methods, and [reached around 98% test code coverage](http://fee-ci-01w.dev.activenetwork.com:8080//job/react-aaui/LCOV_Report/), so with these proper tests in place, we can refactor code like crazy and have enough confidence that we don't break anything. At the same time, we could add new features and tweak existing code bases with the same confidence.

For feature development or bug fixes the respective unit tests is a must. Please refer to details if you want to know [HOW TO CONTRIBUTE](https://gitlab.dev.activenetwork.com/fee/react-aaui/blob/master/CONTRIBUTING.md).

### Immersive Test Watch Mode

If you want to make your tests instant and respond quickly after a file change then run:

```
npm run test:watch
```

### LCOV Report

[react-aaui LCOV Report](http://fee-ci-01w.dev.activenetwork.com:8080//job/react-aaui/LCOV_Report/)

## Extract properties files into **JSON** files

```bash
npm run parse-properties
```

## Contribute

Please see [CONTRIBUTING.md](https://gitlab.dev.activenetwork.com/fee/react-aaui/blob/master/CONTRIBUTING.md).

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, it is maintained under [the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up, but we'll adhere to those rules whenever possible.

## CHANGELOG

Please see [CHANGELOG.md](https://gitlab.dev.activenetwork.com/fee/react-aaui/blob/master/CHANGELOG.md).

## License

**PRIVATE**

[mainFields]: https://webpack.js.org/configuration/resolve/#resolve-mainfields
