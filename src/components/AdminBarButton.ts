import { LitElement, css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { customElement, property } from 'lit/decorators.js'

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
    }
    :host(.flat) {
      --margin: 0px;
      --border-radius: 0;
      --admin-bar-shadow-elements: none;
    }
    .admin-bar-button {
      display: flex;
      flex-wrap: nowrap;
      gap: 5px;
      align-items: center;
      margin: var(--margin);
      border-radius: var(--border-radius);
      padding: 0 clamp(4px, 2vw, 15px);
      height: calc(var(--admin-bar-height, 43px) - calc(var(--margin) * 2));
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
        box-shadow: var(--admin-bar-shadow-elements);
      }
      &:not(.admin-bar-button--logout):hover {
        --admin-bar-button-color-bg: var(--admin-bar-button-color-text, white);
        color: var(--admin-bar-color-highlight, oklch(0.6 0.4 83));
      }

      &.admin-bar-button--logout {
        padding: 0 clamp(10px, 4vw, 25px);

        &:hover {
          --admin-bar-button-color-bg: var(--admin-bar-color-highlight-logout, var(--admin-bar-color-highlight));
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
   * TODO
   */
  @property({ attribute: 'button-href', type: [String, Function, Array] })
  href: string | undefined

  /**
   * TODO
   */
  @property({ attribute: 'label-text' })
  label = ''

  /**
   * TODO
   */
  @property({ attribute: 'logout-button', type: Boolean })
  isLogoutButton = false

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

    const labelContent = html`<slot name="label-before"></slot><slot><span>${this.label}</span></slot
      ><slot name="label-after"></slot>`

    if (this.href) {
      adminBarClasses['admin-bar-button--el-a'] = true
      return html`<a class="${classMap(adminBarClasses)}" href="${this.href}">${labelContent}</a>`
    }

    adminBarClasses['admin-bar-button--el-button'] = true
    return html`<button class="${classMap(adminBarClasses)}">${labelContent}</button>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-button': AdminBarButton
  }
}
