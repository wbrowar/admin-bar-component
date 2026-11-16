import { css } from 'lit'

/**
 * Border style used in between elements.
 */
export function borderStyle() {
  return css`1px solid color-mix(in oklch, var(--admin-bar-color-text), transparent 90%)`
}

/**
 * Styles for elements in the `focus-visible` state.
 */
export function focusElement() {
  return css`
    & {
      background-color: color-mix(in srgb, var(--admin-bar-button-color-text, white), transparent 90%);
      outline: 3px solid color-mix(in srgb, var(--admin-bar-color-highlight), transparent 10%);
      outline-offset: -3px;
    }
  `
}

/*
 * The hover styles for an element that can be interacted with, such as buttons or checkbox labels.
 */
export function hoverClickableElement() {
  return css`
    & {
      background-color: var(--admin-bar-button-color-bg, transparent);
      color: var(--admin-bar-button-color-text, white);
      cursor: pointer;
      transition:
        background var(--admin-bar-transition-duration, 0.4s) ease-out,
        color var(--admin-bar-transition-duration, 0.4s) ease-out;

      &:hover {
        transition-duration: calc(var(--admin-bar-transition-duration, 0.4s) / 2);
      }
    }

    &:hover {
      --admin-bar-button-color-bg: var(--admin-bar-button-color-bg-hover, var(--admin-bar-button-color-text, white));
      --admin-bar-text-label-color-bg: var(--admin-bar-color-highlight);
      --admin-bar-text-label-color-text: var(--admin-bar-button-color-bg-hover);
      color: var(--admin-bar-color-highlight, oklch(0.6 0.4 83));
    }
  `
}

/*
 * Styles for elements that are visually hidden, but remain accessible to screen readers.
 */
export function visuallyHidden() {
  return css`
    & {
      clip: rect(0 0 0 0);
      clip-path: inset(100%);
      position: absolute;
      width: 1px;
      height: 1px;
      white-space: nowrap;
      overflow: hidden;
    }
  `
}
