import { LitElement, css, html, nothing } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { customElement, property } from 'lit/decorators.js'

import './AdminBarButton.ts'

@customElement('admin-bar')
export class AdminBar extends LitElement {
  /**
   * ===========================================================================
   * CSS
   * ===========================================================================
   */
  static styles = css`
    :host {
      --environment-height: 0px;
      container-type: size;
      width: var(--admin-bar-width, 100%);
      height: calc(var(--admin-bar-height, 43px) + var(--environment-height));
    }
    :host([show-environment]) {
      --environment-height: var(--admin-bar-environment-height);
    }
    :host(.rtl) {
      direction: rtl;
    }
    :host(.fixed) {
      position: var(--admin-bar-position, fixed);
      top: var(--admin-bar-top, 0);
      right: var(--admin-bar-right, 0);
      left: var(--admin-bar-left, 0);
      z-index: var(--admin-bar-z-index, 1);
    }
    :host(.sticky) {
      position: var(--admin-bar-position, sticky);
      top: var(--admin-bar-top, 0);
      right: var(--admin-bar-right, 0);
      left: var(--admin-bar-left, 0);
      z-index: var(--admin-bar-z-index, 1);
    }
    :host(.bottom) {
      top: var(--admin-bar-top, auto);
      right: var(--admin-bar-right, 0);
      bottom: var(--admin-bar-bottom, 0);
      left: var(--admin-bar-left, 0);
    }

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
      grid-template-rows: 0 var(--admin-bar-height);
      background: var(--admin-bar-bg);
      backdrop-filter: blur(20px) saturate(200%);
      box-shadow: var(--admin-bar-shadow);
      font-family: var(--admin-bar-font-stack);
      font-size: var(--admin-bar-font-size, 0.9rem);
      color: var(--admin-bar-color-text, rgba(255, 255, 255, 0.8));

      &.admin-bar--environment {
        grid-template-rows: var(--environment-height) var(--admin-bar-height);
      }
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
      --grid-template-columns: 1fr;
      grid-area: greeting;
      display: grid;
      grid-template-columns: var(--grid-template-columns);
      gap: 7px;
      align-items: center;
      margin-block-start: 0.5rem;
      margin-block-end: 0.5rem;
      padding: 0 clamp(6px, 2vw, 15px);
      white-space: nowrap;

      &:has(img) {
        --grid-template-columns: var(--admin-bar-avatar-size, 25px) 1fr;
      }

      & img {
        width: var(--admin-bar-avatar-size, 0);
        height: var(--admin-bar-avatar-size);
        background-size: cover;
        border-radius: 50%;
        box-shadow: var(--admin-bar-shadow-elements);
      }

      @container (max-width: 700px) {
        &:has(img) {
          --grid-template-columns: var(--admin-bar-avatar-size, 25px);
          & *:not(img) {
            display: none;
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

    const greetingContent = this.showGreeting
      ? html`
          ${this.avatarSrc ? html`<img src="${this.avatarSrc}" alt="${this.avatarAlt}" />` : nothing}
          <span><slot name="greeting">Hello</slot></span>
        `
      : nothing

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
      <div class="${classMap(adminBarClasses)}">
        <div class="environment"></div>
        <div class="greeting">${greetingContent}</div>
        <div class="buttons"><slot></slot></div>
        <div class="logout">${logoutContent}</div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar': AdminBar
  }
}