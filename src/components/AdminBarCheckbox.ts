import { css, html, LitElement, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { hoverClickableElement } from './css.ts'

/**
 * WARNING: This component is currently in development and is not yet ready for production use. It will be released in a future version.
 */

export class AdminBarCheckbox extends LitElement {
  /**
   * =========================================================================
   * CSS
   * =========================================================================
   */
  static styles = css`
    .admin-bar-checkbox {
      ${hoverClickableElement()}
      display: flex;
      flex-wrap: nowrap;
      gap: 5px;
      align-items: center;
      padding: var(--admin-bar-text-padding, var(--admin-bar-block-padding) var(--admin-bar-inline-padding));
      height: var(--admin-bar-height, 43px);
      accent-color: var(--admin-bar-color-highlight);
      white-space: nowrap;
    }
  `

  /**
   * =========================================================================
   * PROPS
   * =========================================================================
   */
  /**
   * TODO documentation
   */
  @property({ attribute: 'label-text' })
  inputLabel: string = ''

  /**
   * Sets the position for the label. Accepts: 'after', 'before'
   */
  @property({ attribute: 'label-position' })
  labelPosition: 'after' | 'before' = 'after'

  /**
   * TODO documentation
   */
  @property({ attribute: 'input-name' })
  inputName: string = ''

  /**
   * TODO documentation
   */
  @property({ attribute: 'input-switch', type: Boolean })
  inputSwitch: boolean = false

  /**
   * TODO documentation
   */
  @property({ attribute: 'input-value', type: Boolean })
  inputValue: boolean = false

  /**
   * =========================================================================
   * LIFECYCLE
   * =========================================================================
   */
  render() {
    const labelContent = html`<slot>${this.inputLabel}</slot>`

    return html`<label class="admin-bar-checkbox"
      >${this.labelPosition === 'before' ? labelContent : nothing}<input
        name="${this.inputName}"
        ?switch="${this.inputSwitch}"
        ?checked="${this.inputValue}"
        type="checkbox"
      />${this.labelPosition === 'after' ? labelContent : nothing}</label
    >`
  }
}

if (!customElements.get('admin-bar-checkbox')) {
  customElements.define('admin-bar-checkbox', AdminBarCheckbox)
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-checkbox': AdminBarCheckbox
  }
}
