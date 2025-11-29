## Upgrade from 1.x to 2.x

### General

- Admin Bar and subcomponents no longer automatically register themselves as custom elements. You can define them one-by-one or use the `defineCustomElements` function to define several components at once.

### CSS Styles

- Rename `--admin-bar-text-label-color-bg` variable to `--admin-bar-text-badge-color-bg`
- Rename `--admin-bar-text-label-color-text` variable to `--admin-bar-text-badge-color-text`

### Admin Bar Button Elements

- Rename `label-before` slot name to `before-label`
- Rename `label-after` slot name to `after-label`

### Admin Bar Text Elements

- Rename `label-content` attribute to `badge-content`
- Rename `label-position` attribute to `badge-position`
- Change `badge-position` value to `after`, if preferred.
