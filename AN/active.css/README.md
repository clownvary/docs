# Active.css

>The CSS toolkit and guidelines that power ACTIVE.

## Contents

- [Background](#background)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
  - [Dependencies](#dependencies)
  - [Running locally](#running-locally)
  - [Publishing](#publishing)
  - [CSS Reporter](#css-reporter)
  - [Edit Icon Font](#edit-icon-font)
- [Build](#build)
- [Release](#release)
- [Lint](#lint)
- [Docs](#docs)
- [Versioning](#versioning)
- [ChangeLog maintaining](#changelog-maintaining)
- [License](#license)


## Background

In the past, every product team consumes its own CSS Styles implementation, so we're always facing the same problems:

- Hard to maintain and reuse the same CSS styles
- Keep the consistent experiences across ACTIVE web apps

Now, it's time to solve it.

[Active.css](http://css) is ACTIVE's internal CSS framework which enusres a consistent look-and-feel across our product and makes it easy to update for site-wide design refreshes. It provides dozens of flexible and practical reusable components that increase our productivity to streamline future feature work


## Installation

You could install **Active.css** as dependency with the help of **npm**.

```bash
npm i -S git+ssh://git@gitlab.dev.activenetwork.com:fee/active.css.git
```

### Manually

Download the [latest release](https://gitlab.dev.activenetwork.com/fee/active.css/repository/archive.zip?ref=latest) and copy the LESS files over to your own project. Once your files are in place, jump to the [Usage](#usage) for including styles into your own CSS.

## Usage

Once included, simply `@import` either the master LESS file, or the individual LESS component files as you need them.

```less
// Example: All of Styles
@import 'active.css/less/index';

// Example: Individual Compoent file
@import 'active.css/less/components/buttons';

// Example: Individual Fonts file
@import 'active.css/less/fonts';

// Example: Individual Typography file
@import 'active.css/less/typography';
```

## Documentations

See **docs** directory or [our online documentation](http://css).

As well as you could view the documentation on your local box with the command below. See [Running locally](#running-locally)

### Dependencies

You'll need the following packages installed:

- Latest Jekyll: `gem install jekyll`
- Latest LESS: `gem install less`
- [Node.js and npm](http://nodejs.org/download/)

Chances are you have all this already if you work on `github/github` or similar projects. If you have all those set up, now you can install the dependencies:

```bash
npm i
```

### Running locally

From the Terminal, start a local Jekyll server in order to view the CSS documentation:

```bash
jekyll s
// Or
jekyll s -w -H 0.0.0.0 -I // Binding your IP and enable incremental rebuild
```
Open a second terminal tab to automatically recompile the LESS files, run postcss:

```bash
npm run watch
```

### Publishing

Once you have run the command of `jekyll s` then you will get the `_site` directory, then you could deploy it anywhere you want as it's just a static web site.

We could deploy the documentation site on [prod-css-01w.aw.active.tan](http://prod-css-01w.aw.active.tan/) with the npm script below:

```bash
npm run deploy
```

> BTW, you need to add your SSH Public Key on the VM for allowing the SSH login.

### CSS Reporter

Use the included npm script to generate the stylesheet analysis result and it runs metrics on your stylesheets and will report on their complexity.

```bash
npm run reporter
```

### Edit Icon Font

The work follow is as the followings:
1. Import the `fonts/selection.json` into [iconmoon](https://icomoon.io/app) and start editing as your requirment.
2. Download the font file from iconmoon to your local and unzip it to `active.css/` or `any directory` you specified.
3. Execute command `npm run build:icon` at the root directory of active.css (The command will ask you the unzipped directory of above step)

> Notice: `Manually modify the font files is not allowed.`

```bash
run build:icon
```

## Build

Build the styles into **dist/css/active.css** with LESS and Postcss.

```bash
npm run build
```

## Release

Bump version and deploy **Active.css** artifact into [Active Nexus](http://nexus.dev.activenetwork.com/nexus/content/repositories/libs-releases/com/active/fnd/active.css/) for releasing with just one command.

```bash
npm run release
```

After running the command above then you will find the uplopaded zipped artifact [here](http://nexus.dev.activenetwork.com/nexus/content/repositories/libs-releases/com/active/fnd/active.css/)

Once the release is done, please send the Release Note to the respective stakeholders.

```
Front End China <FrontEndChina@activenetwork.com>; .ActiveNet FEE China <ActiveNetFEEChina@activenetwork.com>; .JumpForward.SoftwareEngineer <JumpForwardSoftwareEngineer@activenetwork.com>; VEB Dev All <veb.devall@activenetwork.com>; Guo, Gran <Gran.Guo@activenetwork.com>; Lei, Turbo <Turbo.Lei@activenetwork.com>; Jia, Kevin <Kevin.Jia@activenetwork.com>; Crusoe.Xia <Crusoe.Xia@activenetwork.com>
```

## Lint

Use [stylelint](https://github.com/stylelint/stylelint) as CSS linter and fixer that helps us avoid errors and enforce consistent conventions in our stylesheets

Run your lint:

```
yarn run lint
```

## Docs

See **docs** directory.

## ChangeLog maintaining

For every merge request, we require the mr also update the `CHANGELOG.md` to include what the mr changed the codes. Please refer to [keepachangelog](https://keepachangelog.com/en/1.0.0/) for how to update the change logs. Remember, this changelog is for our users, so only list the stuffs that will impact our user.

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, it is maintained under [the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up, but we'll adhere to those rules whenever possible.

## License

Active.css is derived from Twitter Bootstrap, and thus is licensed under the MIT license.
