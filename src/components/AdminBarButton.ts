import { css, html, LitElement, nothing } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('admin-bar-button')
export class AdminBarButton extends LitElement {
  /**
   * =========================================================================
   * CSS
   * =========================================================================
   */
  static styles = css`
    :host {
      --padding-left: 10px;
      --padding-right: 10px;
      --margin: 4px;
      --border-radius: 4px;
      display: block;
      --achor-name: --popover-anchor;
    }
    .admin-bar-button {
      anchor-name: var(--achor-name);
      display: flex;
      flex-wrap: nowrap;
      gap: 5px;
      align-items: center;
      padding: 0 clamp(4px, 1vw, 13px);
      height: var(--admin-bar-height, 43px);
      background-color: var(--admin-bar-button-color-bg, transparent);
      appearance: none;
      border: none;
      outline-color: var(--admin-bar-color-highlight);
      font-size: var(--font-size);
      text-decoration: none;
      color: var(--admin-bar-button-color-text, white);
      white-space: nowrap;
      cursor: pointer;
      transition:
        background var(--admin-bar-transition-duration, 0.4s) ease-out,
        color var(--admin-bar-transition-duration, 0.4s) ease-out;

      &:hover {
        transition-duration: calc(var(--admin-bar-transition-duration, 0.4s) / 2);
      }
      &:not(.admin-bar-button--logout):hover {
        --admin-bar-button-color-bg: var(--admin-bar-button-color-bg-hover, var(--admin-bar-button-color-text, white));
        color: var(--admin-bar-color-highlight, oklch(0.6 0.4 83));
      }

      &.admin-bar-button--logout {
        padding: 0 clamp(10px, 3vw, 20px);

        &:hover {
          --admin-bar-button-color-bg: var(--admin-bar-color-highlight-logout, var(--admin-bar-color-highlight));
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

    @position-try --popover-bottom-right {
      left: auto;
      right: anchor(var(--achor-name) right);
    }
    @position-try --popover-top-left {
      margin: 0 0 2px 0;
      top: auto;
      top: anchor(var(--achor-name) none);
      bottom: anchor(var(--achor-name) top);
    }
    @position-try --popover-top-right {
      margin: 0 0 2px 0;
      top: auto;
      top: anchor(var(--achor-name) none);
      bottom: anchor(var(--achor-name) top);
      left: auto;
      right: anchor(var(--achor-name) right);
    }
    [popover] {
      padding: 0;
      border: 0;
      background: var(--admin-bar-button-popover-bg, var(--admin-bar-bg-color));
      backdrop-filter: var(--admin-bar-backdrop-filter, blur(20px) saturate(200%));
      border: 2px solid color-mix(in srgb, var(--admin-bar-button-color-bg-hover), transparent 80%);
      border-radius: var(--admin-bar-button-popover-border-radius, var(--admin-bar-border-radius));
      box-shadow: var(--admin-bar-shadow);
      color: var(--admin-bar-button-popover-color-text, rgb(255 255 255));

      @supports (position-anchor: --popover-anchor) and (position-try-fallbacks: --popover-top) {
        & {
          position-anchor: --popover-anchor;
          position-try-fallbacks: --popover-bottom-right, --popover-top-left, --popover-top-right;
          position: fixed;
          top: anchor(var(--achor-name) bottom);
          left: anchor(var(--achor-name) left);
          margin: 2px 0 0 0;
        }
      }
      @supports not (position-anchor: --popover-anchor) {
        &::backdrop {
          backdrop-filter: var(--admin-bar-backdrop-filter, blur(20px) saturate(200%));
          background: var(--admin-bar-button-popover-bg, var(--admin-bar-bg-color));
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
  @property({ attribute: 'button-href', type: [String, Function, Array] })
  href: string | undefined

  /**
   * Sets the label for the `<admin-bar-button>`.
   */
  @property({ attribute: 'label-text' })
  label = ''

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
   * List of guides being displayed, along with their related information.
   */
  @state()
  private _hasPopoverSlot = false

  /**
   * =========================================================================
   * SLOTS
   * =========================================================================
   */
  // @queryAssignedNodes({ slot: 'popover' })
  // _popoverChildren!: Array<Node>

  handlePopoverSlotchange(e: any) {
    const childNodes = e.target.assignedNodes({ flatten: true })

    this._hasPopoverSlot = childNodes.length > 0
  }

  /**
   * =========================================================================
   * LIFECYCLE
   * =========================================================================
   */
  render() {
    const adminBarClasses = {
      'admin-bar-button': true,
      'admin-bar-button--el-a': false,
      'admin-bar-button--el-button': false,
      'admin-bar-button--el-select': false,
      'admin-bar-button--logout': this.isLogoutButton,
    }

    const labelContent = html`<slot name="label-before"></slot
      ><slot>${(this.label ?? false) ? html`<span>${this.label}</span>` : nothing}</slot
      ><slot name="label-after"></slot>`

    if (this.href) {
      adminBarClasses['admin-bar-button--el-a'] = true
      return html`<a class="${classMap(adminBarClasses)}" href="${this.href}">${labelContent}</a>`
    }

    adminBarClasses['admin-bar-button--el-button'] = true

    if (this._hasPopoverSlot) {
      return html`<button class="${classMap(adminBarClasses)}" popovertarget="admin-bar-button-popover">
          ${labelContent}
        </button>
        <div popover id="admin-bar-button-popover">
          <div class="glass-surface"></div>
          <div class="glass-edge"></div>
          <slot name="popover" @slotchange="${this.handlePopoverSlotchange}"></slot>
        </div>`
    }

    return html`<button class="${classMap(adminBarClasses)}">${labelContent}</button
      ><slot name="popover" @slotchange="${this.handlePopoverSlotchange}"></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-button': AdminBarButton
  }
}
