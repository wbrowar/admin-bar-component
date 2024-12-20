import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('admin-bar-text')
export class AdminBarText extends LitElement {
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
      display: inline-block;
    }
    .admin-bar-text {
      display: flex;
      flex-wrap: nowrap;
      gap: 5px;
      align-items: center;
      padding: var(--admin-bar-text-padding, 0 clamp(4px, 1vw, 13px));
      height: var(--admin-bar-height, 43px);
      background-color: var(--admin-bar-text-color-bg, transparent);
      font-size: var(--font-size);
      color: var(--admin-bar-color-text, rgb(255 255 255 / 0.8));
      white-space: nowrap;
      transition:
        background var(--admin-bar-transition-duration, 0.4s) ease-out,
        color var(--admin-bar-transition-duration, 0.4s) ease-out;

      &.multi-line {
        padding: var(--admin-bar-text-padding, clamp(4px, 1vw, 13px));
        height: unset;
        white-space: unset;
      }
    }
    .label {
      padding: 3px 5px;
      background-color: var(--admin-bar-text-label-color-bg, rgb(255 255 255 / 0.9));
      border-radius: 4px;
      line-height: 1;
      font-size: 0.8em;
      color: var(--admin-bar-text-label-color-text, black);
    }
  `

  /**
   * =========================================================================
   * PROPS
   * =========================================================================
   */
  /**
   * Sets the label for the `<admin-bar-text>`.
   */
  @property({ attribute: 'label-content' })
  labelContent = ''

  /**
   * Sets the position for the label. Accepts: 'after', 'before'
   */
  @property({ attribute: 'label-position' })
  labelPosition: 'after' | 'before' = 'after'

  /**
   * Allows the content to wrap to the next line.
   */
  @property({ attribute: 'multi-line', type: Boolean })
  multiLine = false

  /**
   * Sets the text content for the `<admin-bar-text>`. This can be used instead of the default slot.
   */
  @property({ attribute: 'text-content' })
  textContent = ''

  /**
   * =========================================================================
   * LIFECYCLE
   * =========================================================================
   */
  render() {
    let textContent = html`<slot
      >${(this.textContent ?? false) ? html`<span>${this.textContent}</span>` : nothing}</slot
    >`

    // Add the label before or after the text content
    if (this.labelContent ?? false) {
      textContent =
        this.labelPosition === 'before'
          ? html`<span class="label">${this.labelContent}</span>${textContent}`
          : html`${textContent}<span class="label">${this.labelContent}</span>`
    }

    return html`<span class="admin-bar-text${this.multiLine ? ' multi-line' : ''}">${textContent}</span>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-text': AdminBarText
  }
}
