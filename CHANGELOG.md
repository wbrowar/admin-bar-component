# Admin Bar Component Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## 1.2.1 - 2025-02-03
### Added
- Styled the scrollbars that appear on `<admin-bar>` and `<admin-bar-button>` popover elements.

### Changed
- Split padding on `<admin-bar-button>` and `<admin-bar-text>` elements into separate CSS Custom Properties, `--admin-bar-block-padding` and `--admin-bar-inline-padding`.


## 1.2.0 - 2024-12-30
### Added
- Added definition lists and tables to `<admin-bar-text>` elements.
  - The `dl-content` prop on `<admin-bar-text>` elements generates a `<dl>` from a stringified JSON tuple (array with only 2 values).
  - The `table-content` prop on `<admin-bar-text>` elements generates a `<table>` based on a stringified JSON object.

### Changed
- `<admin-bar-button>` buttons are now set to `box-sizing: border-box; min-width: 100%`.
- Removed default value for `--admin-bar-text-padding`.
  - Setting this will not hurt, but it gives you more flexibility to specify padding in popover content.


## 1.1.4 - 2024-12-23
### Changed
- Matched color of `<admin-bar-text>` labels to button text when a button containing a `<admin-bar-text>` element is hovered over.


## 1.1.3 - 2024-12-11
### Added
- Added `--admin-bar-button-popover-color-text` to allow you to set a default text color for popover content.
  - If you add `<admin-bar-button>` or `<admin-bar-text>` elements into a popover the text color will be determined by their respective CSS Custom Properties.
- Added right-aligned fallback positions for popovers.


## 1.1.2 - 2024-12-05
### Changed
- Minor default color tweaks for higher color contrast.


## 1.1.1 - 2024-12-04
### Added
- Added `--admin-bar-bg-color` CSS Custom Property. Setting this sets a default background color used in gradients and as background colors on popovers.


### Changed
- Moved some CSS color properties around in order to make it easier to style `<admin-bar>` elements and popovers more consistently.
- Increased the opacity of text in the default `--admin-bar-color-text` value to improve color contrast on `<admin-bar-text>` elements.
- Removed the `--admin-bar-bg` CSS Custom Property by default. Setting this to a CSS background image or color will override all other color effects.

### Fixed
- Changed all `rgba()` values to `rgb()`.


## 1.1.0 - 2024-12-03
### Added
- Added `popover` slot to `<admin-bar-button>` elements.
  - Add child `<admin-bar-button>` or `<admin-bar-text>` elements to maintain style consistency—or add your own HTML and style it in your CSS.
- Added `multi-line` attribute to `<admin-bar-text>` elements.
- Added "glass" effect to replace `backdrop-filter` styles on `<admin-bar>` elements.
- Added new CSS Custom Properties for a default `border-radius` value, popover styles, and "glass" styles.

### Changed
- Changed value of `--admin-bar-bg` CSS property from `linear-gradient` to a color;
- Upgraded dependencies.


## 1.0.1 - 2024-01-25
### Added
- Added `--admin-bar-text-padding` property–allowing you to adjust the padding on `<admin-bar-text>` elements.


## 1.0.0 - 2024-01-14
### Added
- Initial release