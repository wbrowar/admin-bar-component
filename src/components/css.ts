import { css } from 'lit'

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

    &:not(.admin-bar-button--logout):hover {
      --admin-bar-button-color-bg: var(--admin-bar-button-color-bg-hover, var(--admin-bar-button-color-text, white));
      --admin-bar-text-label-color-bg: var(--admin-bar-color-highlight);
      --admin-bar-text-label-color-text: var(--admin-bar-button-color-bg-hover);
      color: var(--admin-bar-color-highlight, oklch(0.6 0.4 83));
    }
  `
}
