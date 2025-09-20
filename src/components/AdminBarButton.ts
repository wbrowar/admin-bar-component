import { css, html, LitElement, nothing } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { property, state } from 'lit/decorators.js'
import { AdminBarSurface } from './AdminBarSurface.ts'
import { hoverClickableElement } from './css.ts'

export class AdminBarButton extends LitElement {
  /**
   * =========================================================================
   * CSS
   * =========================================================================
   */
  static styles = css`
    @position-try --popover-above {
      inset: auto;
      bottom: anchor(top);
    }
    @position-try --popover-below {
      inset: auto;
      top: anchor(bottom);
    }
    :host {
      display: block;
      text-box: trim-both cap alphabetic;
    }
    .admin-bar-button {
      ${hoverClickableElement()}
      --popover-name: --popover-anchor;
      anchor-name: var(--popover-name);
      appearance: none;
      box-sizing: border-box;
      display: flex;
      flex-wrap: nowrap;
      gap: 5px;
      align-items: center;
      padding: var(--admin-bar-block-padding) var(--admin-bar-inline-padding);
      min-width: 100%;
      height: var(--admin-bar-height, 43px);
      border: none;
      outline-color: var(--admin-bar-color-highlight);
      font-family: var(--admin-bar-font-stack);
      font-size: var(--font-size);
      text-decoration: none;
      white-space: nowrap;

      &.admin-bar-button--greeting {
        border-start-start-radius: var(--admin-bar-border-radius);
        border-end-start-radius: var(--admin-bar-border-radius);

        @container style(--admin-bar-show-environment) {
          & {
            border-start-start-radius: 0;
          }
        }
      }

      &.admin-bar-button--logout {
        padding: var(--admin-bar-block-padding) clamp(10px, 3vw, 20px);
        border-end-end-radius: var(--admin-bar-border-radius);
        border-start-end-radius: var(--admin-bar-border-radius);

        &:hover {
          --admin-bar-button-color-bg: var(--admin-bar-color-highlight-logout, var(--admin-bar-color-highlight));
          --admin-bar-button-color-text: var(--admin-bar-color-text-logout);
        }

        @container style(--admin-bar-show-environment) {
          & {
            border-start-end-radius: 0;
          }
        }
      }
    }
    [popovertarget]:has(+ [popover]:popover-open) {
      --admin-bar-button-color-bg: color-mix(in srgb, var(--admin-bar-button-color-bg-hover), transparent 85%);

      &:hover {
        --admin-bar-button-color-bg: var(--admin-bar-button-color-bg-hover, var(--admin-bar-button-color-text, white));
        color: var(--admin-bar-color-highlight, oklch(0.6 0.4 83));
      }
    }

    [popover] {
      --admin-bar-context-popover: true;
      padding: 0;
      border: 0;
      background: transparent;
      border-radius: var(--admin-bar-button-popover-border-radius, var(--admin-bar-border-radius));
      color: var(--admin-bar-button-popover-color-text, rgb(255 255 255));
      box-shadow:
        0 6px 6px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(0, 0, 0, 0.1);
      scrollbar-color: color-mix(in srgb, var(--admin-bar-color-text), transparent 20%) var(--admin-bar-bg-color);
      scrollbar-width: thin;

      @supports (position-anchor: var(--popover-name)) and (position-try-fallbacks: flip-block) {
        & {
          position-anchor: var(--popover-name);
          position: fixed;
          position-try-fallbacks: --popover-above;
          justify-self: anchor-center;
          inset: auto;
          top: anchor(bottom);
          margin: 4px;

          @container style(--admin-bar-class-bottom: true) {
            position-try-fallbacks: --popover-below;
            inset: auto;
            bottom: anchor(top);
          }
        }
      }
      @supports not (position-anchor: --popover-anchor) {
        &::backdrop {
          backdrop-filter: blur(20px) saturate(200%);
          background: var(--admin-bar-button-popover-bg);
        }
      }
    }
  `

  /**
   * =========================================================================
   * PROPS
   * =========================================================================
   */
  /**
   * Adding the `button-href` turns the `<admin-bar-button>` into an `<a>` elements and sets this string as its `href` attribute.
   */
  @property({ attribute: 'button-href' })
  href: string | undefined

  /**
   * Sets the label for the `<admin-bar-button>`.
   */
  @property({ attribute: 'label-text' })
  label = ''

  /**
   * Styles the button when it is used in the Admin Bar greeting area.
   */
  @property({ attribute: 'greeting-button', type: Boolean })
  isGreetingButton = false

  /**
   * Styles the button like the default logout button.
   */
  @property({ attribute: 'logout-button', type: Boolean })
  isLogoutButton = false

  /**
   * =========================================================================
   * STATE
   * =========================================================================
   */
  /**
   * Tracks whether the `popover` slot has content.
   */
  @state()
  private _hasPopoverSlot = false

  /**
   * =========================================================================
   * SLOTS
   * =========================================================================
   */
  handlePopoverSlotchange(e: any) {
    const childNodes = e.target.assignedNodes({ flatten: true })

    this._hasPopoverSlot = childNodes.length > 0
  }

  /**
   * =========================================================================
   * LIFECYCLE
   * =========================================================================
   */
  constructor() {
    super()
    if (!customElements.get('admin-bar-surface')) {
      customElements.define('admin-bar-surface', AdminBarSurface)
    }
  }
  render() {
    const adminBarClasses = {
      'admin-bar-button': true,
      'admin-bar-button--el-a': false,
      'admin-bar-button--el-button': false,
      'admin-bar-button--el-select': false,
      'admin-bar-button--greeting': this.isGreetingButton,
      'admin-bar-button--logout': this.isLogoutButton,
    }

    // TODO:2.x remove `label-before` and `label-after` slots
    const labelContent = html`<slot name="before-label"></slot><slot name="label-before"></slot
      ><slot>${(this.label ?? false) ? html`<span>${this.label}</span>` : nothing}</slot><slot name="label-after"></slot
      ><slot name="after-label"></slot>`

    if (this.href) {
      adminBarClasses['admin-bar-button--el-a'] = true
      return html`<a class="${classMap(adminBarClasses)}" href="${this.href}">${labelContent}</a>`
    }

    adminBarClasses['admin-bar-button--el-button'] = true

    if (this._hasPopoverSlot) {
      return html`<button class="${classMap(adminBarClasses)}" popovertarget="admin-bar-button-popover">
          ${labelContent}
        </button>
        <admin-bar-surface popover id="admin-bar-button-popover" part="popover">
          <slot name="popover" @slotchange="${this.handlePopoverSlotchange}"></slot>
        </admin-bar-surface>`
    }

    return html`<button class="${classMap(adminBarClasses)}">${labelContent}</button
      ><slot name="popover" @slotchange="${this.handlePopoverSlotchange}"></slot>`
  }
}

if (!customElements.get('admin-bar-button')) {
  customElements.define('admin-bar-button', AdminBarButton)
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-button': AdminBarButton
  }
}
