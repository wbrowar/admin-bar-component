import { css } from 'lit'

/*
 * Inspired by: https://www.joshwcomeau.com/css/backdrop-filter/
 */
export function glassStyles() {
  return css`
    /*
     * This code gets applied for folks using browsers that support backdrop-filter.
     */
    @supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {
      .glass-surface {
        position: absolute;
        height: 100%;
        width: 100%;
        inset: 0;
        -webkit-backdrop-filter: var(--admin-bar-backdrop-filter, blur(20px) saturate(200%));
        backdrop-filter: var(--admin-bar-backdrop-filter, blur(20px) saturate(200%));
        background: var(--admin-bar-glass-bg, linear-gradient(to bottom, rgba(0 0 0 / 0.8), transparent 10%));
        pointer-events: none;
      }

      .glass-edge {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        height: var(--admin-bar-glass-thickness);
        background: hsl(0deg 0% 100% / 0.1);
        -webkit-backdrop-filter: blur(12px) brightness(0.96);
        backdrop-filter: blur(12px) brightness(0.96);
        pointer-events: none;
        transform: translateY(100%);

        :host(.bottom) & {
          transform: translateY(calc(var(--admin-bar-glass-thickness) * -1));
        }
      }
    }
    /*
     * This code gets applied for folks using browsers that support mask-image. This adds the "consider near elements" optimization discussed in this article.
     */
    @supports (mask-image: none) or (-webkit-mask-image: none) {
      .glass-surface {
        --gradient-direction: bottom;
        height: 200%;
        -webkit-mask-image: linear-gradient(to var(--gradient-direction), black 0% 50%, transparent 50% 100%);
        mask-image: linear-gradient(to var(--gradient-direction), black 0% 50%, transparent 50% 100%);

        :host(.bottom) & {
          --gradient-direction: top;
          position: absolute;
          inset: auto 0 0 0;
        }
      }
      .glass-edge {
        --gradient-direction: bottom;
        height: 100%;
        inset: 0;
        -webkit-mask-image: linear-gradient(
          to var(--gradient-direction),
          black 0,
          black var(--admin-bar-glass-thickness),
          transparent var(--admin-bar-glass-thickness)
        );
        mask-image: linear-gradient(
          to var(--gradient-direction),
          black 0,
          black var(--admin-bar-glass-thickness),
          transparent var(--admin-bar-glass-thickness)
        );

        :host(.bottom) & {
          --gradient-direction: top;
          transform: translateY(-100%);
        }
      }
    }
  `
}
