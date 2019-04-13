# react-static-plugin-scss-modules

An opinionated [React-Static](https://github.com/nozzle/react-static/) plugin that enables CSS Modules with SCSS syntax and PostCSS processing.

## Installation

```
yarn add react-static-plugin-scss-modules
```
or
```
npm install react-static-plugin-scss-modules
```

Then add to `plugins` array:

```js
// static.config.js
export default {
  // <…>
  plugins: [
    'react-static-plugin-scss-modules',
  ],
  // <…>
}
```
**Note:** if you already have other styling-related plugins included, make sure to remove them to prevent potentially conflicting behavior. This plugin takes care of all your styling needs.

## Configuration

No configuration is currently available. If you want to modify this plugin’s behavior, describe your scenario in an issue and I’ll add it in.

## Usage

```scss
// Button.scss
.root {
  color: red;
  
  &:hover {
    color: blue;
  }
}
```

```js
// Button.js
import React from 'react';
import styles from './Button.scss';

const Button = () => (
  <button className={styles.root}>Click here</button>
);
```

### Included PostCSS plugins

- [Autoprefixer](https://github.com/postcss/autoprefixer) – adds vendor prefixes. But make sure to define target browsers in a [browserslist](https://github.com/browserslist/browserslist)
- [Flexbugs Fixes](https://github.com/luisrudge/postcss-flexbugs-fixes) – tries to fix [flexbugs](https://github.com/philipwalton/flexbugs)
