import { css } from 'lit'

/*
 * Inspired by: https://www.joshwcomeau.com/css/backdrop-filter/
 */
export function glassStyles() {
  // 3D glass effect generated at: https://glass3d.dev
  return css`
    & {
      background: unset;
      z-index: 4;
      box-shadow:
        0 0 0.75px hsl(205 20% 10% / 0.2),
        0.7px 0.8px 1.2px -0.4px hsl(205 20% 10% / 0.1),
        1.3px 1.5px 2.2px -0.8px hsl(205 20% 10% / 0.1),
        2.3px 2.6px 3.9px -1.2px hsl(205 20% 10% / 0.1),
        3.9px 4.4px 6.6px -1.7px hsl(205 20% 10% / 0.1),
        6.5px 7.2px 10.9px -2.1px hsl(205 20% 10% / 0.1),
        8px 9px 14px -2.5px hsl(205 20% 10% / 0.2);
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      overflow: hidden;
      z-index: 3;

      -webkit-backdrop-filter: var(--admin-bar-bg-filter);
      backdrop-filter: var(--admin-bar-bg-filter);
      background-color: var(--admin-bar-bg-color);
      background-image: var(--admin-bar-bg-image);
      background-size: 100px;
      background-repeat: repeat;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      overflow: hidden;
      z-index: 5;

      box-shadow:
        inset 2px 2px 1px -3px hsl(205 20% 90% / 0.8),
        inset 4px 4px 2px -6px hsl(205 20% 90% / 0.3),
        inset 1.5px 1.5px 1.5px -0.75px hsl(205 20% 90% / 0.15),
        inset 1.5px 1.5px 0.25px hsl(205 20% 90% / 0.03),
        inset 0 0 0.25px 0.5px hsl(205 20% 90% / 0.03);
    }

    & > *,
    & > slot::slotted(*) {
      position: relative;
      z-index: 6;
    }
  `
}
