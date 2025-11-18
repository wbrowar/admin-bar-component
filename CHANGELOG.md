# Admin Bar Component Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

> [!IMPORTANT]  
> This release includes some style-breaking changes. A few CSS variables have been removed and noted below. New CSS variables are added to the `public/admin-bar.css` file.


## 2.0.0 - 2025-10-13
### Added
- Added `defineAdminBarElements` method that makes it easier to define Admin Bar Component’s custom elements.
  - Calling this method defines the `<admin-bar>` and any other items specified. Sending in a blank array will still define `<admin-bar>`.
- Added AdminBarButton `toggle` event.

### Changed
- Added Vitest and replaced Cypress tests.

### Removed
- Removed `--admin-bar-gradient-direction` variable


## 1.10.1 - 2025-10-08
### Added
- Added `position: relative;` to the wrapper around `<admin-bar-surface>` elements.
  - This can help make sure the surface background stays put when resizing `[popover]` elements.


## 1.10.0 - 2025-10-08
### Changed
- Moved height or min-height properties to component `:host` selectors so you can adjust heights of text, button, or checkbox elements.
- Adjusted the height of the greeting slot and the logout button to match the height of the toolbar.
  - This helps when the toolbar is taller than the height of `--admin-bar-height`.


## 1.9.1 - 2025-11-07
### Fixed
- AdminBarCheckbox no longer fires change events until after first render.
- Added AdminBarCheckbox to types exports.


## 1.9.0 - 2025-11-05
### Added
- Added experimental component, called `<admin-bar-checkbox>`. The API for this component might change over the next few releases, so please feel free to give it a try, but know that it might break as props and slots naming are finalized.
  - NOTE: documentation for this component will be added when it is no longer experimental.


## 1.8.0 - 2025-10-07
### Added
- You can now use `<admin-bar>` as a visual progress bar.
  - Added a new `progress` attribute to `<admin-bar>` elements.
  - Added new CSS variables for progress styles:
    - `--admin-bar-progress-color`
    - `--admin-bar-progress-color-error`
    - `--admin-bar-progress-color-success`
    - `--admin-bar-progress-height`
- Added border radius to the default placeholder for when `<admin-bar>` is not yet defined.

### Changed
- Changed the default check for SVG filters to specifically exclude Safari and Firefox.
  - Ideally this check would be feature-based, but right now that is not possible with svg filters.


## 1.7.3 - 2025-09-20
### Fixed
- Fixed incorrect default value for `--admin-bar-color-text-logout`.


## 1.7.2 - 2025-09-20
### Added
- Added `--admin-bar-color-text-logout` CSS Variable.

### Changed
- Replaced box-shadow borders with gradient border on `<admin-bar-surface>` elements.

### Fixed
- Added box-shadows to popovers.


## 1.7.1 - 2025-09-19
### Fixed
- Ran build.


## 1.7.0 - 2025-09-19
### Added
- Added new glass effect and replaced previous "glass" styles.
  - This is off by default and can be enabled by setting `--admin-bar-enable-glass: true;`.
  - The glass effect works on browsers that support SVG filters in `backdrop-filter` and container `style()` queries.

### Changed
- Refactored anchor position to iron out a few issues found in Safari’s recent implementation of CSS Anchor Positioning.
- Updated dependencies and raised Node version to 22.

### Removed
- Removed the following CSS variables
    - `--admin-bar-bg-image`
      - Use `--admin-bar-bg` instead as it will be used in all areas where `--admin-bar-bg-image` was.


## 1.6.1 - 2025-07-04
### Changed
- Reduced the size of the noise pattern to lower make the CSS file size smaller.


## 1.6.0 - 2025-07-04

> [!IMPORTANT]  
> This release includes some style-breaking changes. A few CSS variables have been removed and noted below. New CSS variables are added to the `public/admin-bar.css` file.

### Added
- Added new CSS variables to manage the backdrop-filter (`--admin-bar-bg-filter`) and background-image (`--admin-bar-bg-image`) properties.
- Added `--admin-bar-inset-size` to add space between Admin Bar Component and its container.
  - On the `block` axis it adds `inset-block`
  - On the `inline` axis it adds `margin-inline`

### Changed
- Admin Bar Component has been slightly redesigned by the following concepts:
  - Replaced the glassy effect with a different implementation.
  - Used border radius CSS variable to round the corners on the `<admin-bar>` element.
  - Gave `<admin-bar>` inset values.
  - If you prefer to go back to the previous design, set:
    - `--admin-bar-inset-size: 0;`
    - `--admin-bar-border-radius: 0;` (and then override it again for `<admin-bar-button>` elements)
- Width of `<admin-bar>` is no longer set to `100%` by default.
  - This fixes some issues that come up when `position: fixed;` on `<admin-bar>` elements.
- Re-ordered default styles to be alphabetic in related groups.

### Removed
- Removed the following CSS variables
  - `--admin-bar-backdrop-filter`
    - Use `--admin-bar-bg-filter` instead.
  - `--admin-bar-glass-bg`
    - Use `--admin-bar-bg-color` instead.
  - `--admin-bar-glass-thickness`
  - `--admin-bar-shadow`


## 1.5.4 - 2025-07-01
### Added
- Automatically reduce the transparency on `<admin-bar>` and popover backgrounds using the `prefers-reduced-transparency` query.


## 1.5.3 - 2025-05-11
### Changed
- All `<admin-bar>`, `<admin-bar-button>`, and `<admin-bar-text>` elements will check to see if they are defined before defining their custom elements.


## 1.5.2 - 2025-05-07
### Changed
- Moved `AdminBarBuilder` into default module export.


## 1.5.1 - 2025-05-07
### Changed
- Moved type definitions to seperate file and included it in bundled package.

### Fixed
- Renamed private properties in `AdminBarBuilder` class.


## 1.5.0 - 2025-05-03
### Added
- Added `AdminBarBuilder` that programmatically generates and populates an `<admin-bar>` element.


## 1.4.2 - 2025-04-21
### Added
- Added CSS Custom Properties to `<admin-bar-text>` table and dl children.
- EXPERIMENTAL — Added `avatar` CSS part `<admin-bar>` greeting image.
  - If this works correctly it will become a documented feature, but until then please consider holding off on using it production.


## 1.4.1 - 2025-04-21
### Added
- EXPERIMENTAL — Added CSS parts for `dl` and `table` elements in `<admin-bar-text>` elements
  - If this works correctly it will become a documented feature, but until then please consider holding off on using it production.


## 1.4.0 - 2025-04-20
### Added
- EXPERIMENTAL — Added CSS parts for popovers and the Admin Bar buttons container.
  - If this works correctly it will become a documented feature, but until then please consider holding off on using it production.

### Fixed
- Fixed an issue on `<admin-bar-button>` where default slot was nested twice.


## 1.3.5 - 2025-03-24
### Changed
- Changed `flex-shrink` from previous version to area that can be overridden.


## 1.3.4 - 2025-03-24
### Changed
- Elements in the buttons area are now set to not shrink (`flex-shrink: 0`).

### Fixed
- Reverted overflow change in `1.3.3`.


## 1.3.3 - 2025-03-24
> {warning} There seem to be some issues with this implementation of popover and anchor positioning in Safari Tech Preview 215. Will keep an eye on it and look for solutions to resolve the issues before the next release of Safari.

### Changed
- The buttons container now sets `overflow-y` to `visible`


## 1.3.2 - 2025-03-17
### Fixed
- Fixed an issue where setting a custom font stack wasn’t being passed into all elements (including buttons and popovers).


## 1.3.1 - 2025-02-25
### Added
- Added `after-label` and `before-label` slots to `<admin-bar-button>` to match documentation.

### Changed
- Introduced `text-box` trimming to some elements and modified padding to align better.
- Changed default CSS anchor position behavior to use `position-area` instead of `top/left` position properties.

### Deprecated
- Deprecated `label-after` and `label-before` slots on `<admin-bar-button>` elements. This will be removed in a future major version.


## 1.3.0 - 2025-02-05
### Added
- Added the ability to add a popover to the greeting area. This can be used to add a user account-specific menu or user details.


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