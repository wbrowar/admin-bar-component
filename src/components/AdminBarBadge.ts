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
      transition: background calc(var(--admin-bar-transition-duration, 0.3s) / 2) ease-out;

      /* Masking the letters and numbers */
      @container style(--admin-bar-badge-enable-mask: true) {
        -webkit-mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
        mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
        -webkit-mask-clip: padding-box, text;
        mask-clip: padding-box, text;
        -webkit-mask-composite: xor;
        mask-composite: exclude;
      }
    }
    span {
      color: var(--admin-bar-badge-color-text, transparent);
      transition: color calc(var(--admin-bar-transition-duration, 0.3s) / 2) ease-out;
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
