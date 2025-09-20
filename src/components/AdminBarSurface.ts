import { css, html, LitElement } from 'lit'

export class AdminBarSurface extends LitElement {
  /**
   * =========================================================================
   * CSS
   * =========================================================================
   */
  static styles = css`
    .wrapper {
      display: grid;
      border-radius: var(--admin-bar-border-radius);
      box-shadow:
        0 6px 6px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(0, 0, 0, 0.1);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
      overflow: hidden;

      & > div {
        border-radius: var(--admin-bar-border-radius);
      }

      @container style(--admin-bar-context-popover: true) {
        &,
        & > div {
          border-radius: var(--admin-bar-button-popover-border-radius, var(--admin-bar-border-radius));
        }
      }
    }
    .effect {
      position: absolute;
      inset: 0;
      -webkit-backdrop-filter: var(--admin-bar-bg-filter);
      backdrop-filter: var(--admin-bar-bg-filter);
      overflow: hidden;
      z-index: 0;

      @container style(--admin-bar-enable-glass: true) {
        & {
          -webkit-backdrop-filter: var(--admin-bar-bg-filter) url(#filter);
          backdrop-filter: var(--admin-bar-bg-filter) url(#filter);
        }
      }
    }
    .tint {
      position: absolute;
      inset: 0;
      background-color: var(--admin-bar-bg-color);
      background: var(--admin-bar-bg, var(--admin-bar-bg-color));
      z-index: 1;

      @container style(--admin-bar-context-popover: true) {
        & {
          background: var(--admin-bar-button-popover-bg, var(--admin-bar-bg-color));
        }
      }
    }
    .shine {
      position: absolute;
      inset: 0;
      box-shadow:
        inset 2px 2px 1px 0 color-mix(in oklch, var(--admin-bar-bg-color), rgb(255 255 255 / 0.5) 50%),
        inset -1px -1px 1px 1px color-mix(in oklch, var(--admin-bar-bg-color), rgb(255 255 255 / 0.5) 50%);
      overflow: hidden;
      z-index: 2;
    }
    .content {
      z-index: 3;
    }
  `

  /**
   * =========================================================================
   * LIFECYCLE
   * =========================================================================
   */
  render() {
    return html` <div class="wrapper">
      <div class="effect"></div>
      <div class="tint"></div>
      <div class="shine"></div>
      <div class="content">
        <slot></slot>
      </div>

      <svg width="0" height="0" style="position: absolute;">
        <defs>
          <filter id="filter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.001 0.015"
              numOctaves="1"
              seed="17"
              result="turbulence"
            />

            <feComponentTransfer in="turbulence" result="mapped">
              <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
              <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
              <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
            </feComponentTransfer>

            <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

            <feSpecularLighting
              in="softMap"
              surfaceScale="5"
              specularConstant="1"
              specularExponent="100"
              lighting-color="white"
              result="specLight"
            >
              <fePointLight x="-200" y="-200" z="300" />
            </feSpecularLighting>

            <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />

            <feDisplacementMap in="SourceGraphic" in2="softMap" scale="200" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-surface': AdminBarSurface
  }
}
