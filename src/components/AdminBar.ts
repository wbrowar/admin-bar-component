import { css, html, LitElement, nothing } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { property, state } from 'lit/decorators.js'

import './AdminBarButton.ts'
import { glassStyles } from './css.ts'

export class AdminBar extends LitElement {
  /**
   * ===========================================================================
   * CSS
   * ===========================================================================
   */
  static styles = css`
    * {
      position: relative;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .admin-bar {
      --border-color: color-mix(in srgb, currentColor, transparent 80%);
      display: grid;
      grid-template-areas:
        'environment environment environment'
        'greeting buttons logout';
      grid-template-columns: max-content 1fr max-content;
      grid-template-rows: 0 var(--admin-bar-height, 43px);
      align-items: center;
      background: var(--admin-bar-bg, var(--admin-bar-bg-color, rgba(0 0 0 / 0.8)));
      box-shadow: var(--admin-bar-shadow);
      font-family: var(--admin-bar-font-stack);
      font-size: var(--admin-bar-font-size, 0.9rem);
      color: var(--admin-bar-color-text, rgb(255 255 255 / 0.8));
      scrollbar-color: color-mix(in srgb, var(--admin-bar-color-text), transparent 20%)
        color-mix(in srgb, var(--admin-bar-bg-color), transparent 90%);
      scrollbar-width: thin;

      &.admin-bar--environment {
        grid-template-rows: var(--environment-height) var(--admin-bar-height, 43px);
      }

      ${glassStyles()}
    }

    .environment {
      grid-area: environment;

      .admin-bar--environment & {
        height: var(--environment-height);
        background-color: red;
        background: var(
          --admin-bar-environment-bg,
          repeating-linear-gradient(
            -45deg,
            var(--admin-bar-environment-bg-color),
            var(--admin-bar-environment-bg-color) 18px,
            transparent 18px,
            transparent 30px
          )
        );
      }
    }

    .admin-bar--greeting .greeting {
      grid-area: greeting;
      display: none;
      grid-template-columns: var(--grid-template-columns, 1fr);
      gap: 7px;
      align-items: center;
      margin-block-start: var(--margin-block-start, 0.5rem);
      margin-block-end: var(--margin-block-end, 0.5rem);
      padding: 0 clamp(6px, 2vw, 15px);
      white-space: nowrap;

      &:has(+ [slot='popover']) {
        padding: 0;
      }

      &:has(img) {
        display: grid;

        & *:not(img) {
          display: none;
        }
      }

      & img {
        display: block;
        aspect-ratio: 1 / 1;
        width: var(--admin-bar-avatar-size, 25px);
        height: auto;
        background-size: cover;
        border-radius: 50%;
        box-shadow: var(--admin-bar-shadow-elements);
      }
    }

    @media (min-width: 700px) {
      .admin-bar--greeting .greeting {
        --grid-template-columns: 1fr;
        display: grid;

        @supports not selector(:has(*)) {
          display: flex;
        }

        &:has(img) {
          --grid-template-columns: var(--admin-bar-avatar-size, 25px) 1fr;

          & *:not(img) {
            display: initial;
          }
        }
      }
    }

    .buttons {
      grid-area: buttons;
      display: flex;
      min-width: 1px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;

      .admin-bar--greeting & {
        border-left: 1px solid var(--border-color);
      }
      .admin-bar--logout & {
        border-right: 1px solid var(--border-color);
      }
    }

    .logout {
      grid-area: logout;
    }
  `

  /**
   * ===========================================================================
   * PROPS
   * ===========================================================================
   */
  /**
   * Sets the alt text on an avatar image.
   */
  @property({ attribute: 'avatar-alt' })
  avatarAlt = 'Avatar of logged in user.'

  /**
   * Sets the `src` on an avatar image and enables the avatar image to be displayed.
   */
  @property({ attribute: 'avatar-src' })
  avatarSrc: string | undefined

  /**
   * Sets the greeting text content.
   */
  @property({ attribute: 'greeting-text' })
  greetingText = 'Hello'

  /**
   * A URL added to the default logout button, when `show-logout` is added to an `<admin-bar>`.
   */
  @property({ attribute: 'logout-href' })
  logoutHref = '#'

  /**
   * The label of the default logout button.
   */
  @property({ attribute: 'logout-label' })
  logoutLabel = 'Sign out'

  /**
   * Displays the environment warning, letting users know what environment they are currently logged into.
   */
  @property({ attribute: 'show-environment', type: Boolean })
  showEnvironment = false

  /**
   * Displays the avatar and greeting message.
   */
  @property({ attribute: 'show-greeting', type: Boolean })
  showGreeting = false

  /**
   * Displays the default logout button or content added to the `logout` slot.
   */
  @property({ attribute: 'show-logout', type: Boolean })
  showLogout = false

  /**
   * =========================================================================
   * STATE
   * =========================================================================
   */
  /**
   * Tracks whether the `greeting-popover` slot has content.
   */
  @state()
  private _hasGreetingPopoverSlot = false

  /**
   * =========================================================================
   * SLOTS
   * =========================================================================
   */
  handleGreetingPopoverSlotchange(e: any) {
    const childNodes = e.target.assignedNodes({ flatten: true })

    this._hasGreetingPopoverSlot = childNodes.length > 0
  }

  /**
   * ===========================================================================
   * LIFECYCLE
   * ===========================================================================
   */
  render() {
    const adminBarClasses = {
      'admin-bar': true,
      'admin-bar--environment': this.showEnvironment,
      'admin-bar--greeting': this.showGreeting,
      'admin-bar--logout': this.showLogout,
    }

    const greetingInnerContent = this.showGreeting
      ? html`<div class="greeting">
          ${this.avatarSrc
            ? html`<img alt="${this.avatarAlt}" src="${this.avatarSrc}" width="25px" height="25px" part="avatar" />`
            : nothing}
          <span><slot name="greeting">${this.greetingText}</slot></span>
        </div>`
      : nothing

    const greetingContent = this._hasGreetingPopoverSlot
      ? html`
          <admin-bar-button>
            ${greetingInnerContent}
            <div slot="popover">
              <slot name="greeting-popover" @slotchange="${this.handleGreetingPopoverSlotchange}"></slot>
            </div>
          </admin-bar-button>
        `
      : html`${greetingInnerContent}<slot
            name="greeting-popover"
            @slotchange="${this.handleGreetingPopoverSlotchange}"
          ></slot>`

    const logoutContent = this.showLogout
      ? html`<slot name="logout"
          ><admin-bar-button
            logout-button
            button-href="${this.logoutHref}"
            label-text="${this.logoutLabel}"
          ></admin-bar-button
        ></slot>`
      : nothing

    return html`
      <nav class="${classMap(adminBarClasses)}">
        <div class="glass-surface"></div>
        <div class="glass-edge"></div>
        <div class="environment"></div>
        ${greetingContent}
        <div class="buttons" part="buttons"><slot></slot></div>
        <div class="logout">${logoutContent}</div>
      </nav>
    `
  }
}

if (!customElements.get('admin-bar')) {
  customElements.define('admin-bar', AdminBar)
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar': AdminBar
  }
}
