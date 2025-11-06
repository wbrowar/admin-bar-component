import { css, html, LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'

export type ProgressState = 'error' | 'progress' | 'reset' | 'success'

export class AdminBarSurface extends LitElement {
  /**
   * =========================================================================
   * CSS
   * =========================================================================
   */
  static styles = css`
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
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
      background: linear-gradient(
          140deg,
          color-mix(in oklch, var(--admin-bar-bg-color), oklch(1 0 89.876 / 0.8)),
          10%,
          var(--admin-bar-bg-color) 70%,
          color-mix(in oklch, var(--admin-bar-bg-color), oklch(1 0 89.876 / 0.7))
        )
        border-box;
      border: 1px solid transparent;
      border-radius: var(--admin-bar-border-radius);
      mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      overflow: hidden;
      z-index: 2;
    }

    .progress {
      --_progress-color: var(--admin-bar-progress-color, oklch(0.6 0.24 253.14 / 0.7));
      position: absolute;
      inset-block-end: 0;
      height: var(--admin-bar-progress-height, var(--admin-bar-height));
      width: var(--_progress-width, 0);
      background-color: var(--_progress-color);
      border-radius: var(--admin-bar-border-radius);
      box-shadow:
        0 0 5px color-mix(in oklch, var(--_progress-color), transparent 10%),
        0 0 40px color-mix(in oklch, var(--_progress-color), transparent 50%);
      transition:
        background-color var(--admin-bar-transition-duration) ease-out,
        box-shadow var(--admin-bar-transition-duration) ease-out,
        width var(--admin-bar-transition-duration) ease-out;
      z-index: 3;

      &:is(.error, .success) {
        animation: fadeOut calc(var(--admin-bar-transition-duration) * 2) ease-out forwards 2s;

        &.error {
          animation-delay: 5s;
        }
      }
      &.reset {
        transition:
          background-color var(--admin-bar-transition-duration) ease-out,
          box-shadow var(--admin-bar-transition-duration) ease-out,
          width 0s ease-out;
        width: 0;
      }
      &.error {
        --_progress-color: var(--admin-bar-progress-color-error, oklch(0.66 0.29 30.27 / 0.7));
      }
      &.success {
        --_progress-color: var(--admin-bar-progress-color-success, oklch(0.85 0.36 146.38 / 0.7));
      }
    }

    .content {
      z-index: 4;
    }
  `

  /**
   * ===========================================================================
   * PROPS
   * ===========================================================================
   */
  /**
   * TODO
   */
  @property({ attribute: 'progress-value', type: Number })
  progressValue = 0

  /**
   * =========================================================================
   * STATE
   * =========================================================================
   */
  /**
   * TODO
   */
  @state()
  private _progressState: ProgressState = 'reset'

  /**
   * TODO
   */
  @state()
  private _progressWidth = 0

  /**
   * =========================================================================
   * METHODS
   * =========================================================================
   */
  private _onProgressAnimationEnd() {
    if (['error', 'success'].includes(this._progressState)) {
      this._progressState = 'reset'
    }
  }

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
      <div
        class="progress ${this._progressState}"
        @animationend="${this._onProgressAnimationEnd}"
        style="--_progress-width: ${this._progressWidth}%;"
      ></div>
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

  protected willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('progressValue')) {
      this._progressWidth = 0

      if (this.progressValue < 0) {
        this._progressState = 'error'
        this._progressWidth = 100
      } else if (this.progressValue >= 100) {
        this._progressState = 'success'
        this._progressWidth = 100
      } else if (this.progressValue >= 0 && this.progressValue < 100) {
        this._progressState = 'progress'
        this._progressWidth = this.progressValue
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-surface': AdminBarSurface
  }
}
