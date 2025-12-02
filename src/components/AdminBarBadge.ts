import { css, html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'

export class AdminBarBadge extends LitElement {
  /**
   * =========================================================================
   * CSS
   * =========================================================================
   */
  static styles = css`
    :host {
      padding: 0.4em;
      background-color: var(--admin-bar-badge-color-bg, rgb(255 255 255 / 0.9));
      border-radius: 4px;
      text-box: trim-both cap alphabetic;
      font-size: 0.8em;
      color: var(--admin-bar-badge-color-text, black);
      transition:
        background var(--admin-bar-transition-duration, 0.3s) ease-out,
        color var(--admin-bar-transition-duration, 0.3s) ease-out;
    }
  `

  /**
   * =========================================================================
   * PROPS
   * =========================================================================
   */
  /**
   * Sets the text content for the `<admin-bar-badge>`. This can be used instead of the default slot.
   */
  @property({ attribute: 'text-content' })
  textContent = ''

  /**
   * =========================================================================
   * LIFECYCLE
   * =========================================================================
   */
  render() {
    return html`<span class="admin-bar-badge"><slot>${this.textContent}</slot></span>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-badge': AdminBarBadge
  }
}
