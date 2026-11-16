import { css, html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { TextDlContent } from '../../types'
import { AdminBarBadge } from '@/components/AdminBarBadge.ts'

export class AdminBarText extends LitElement {
  /**
   * =========================================================================
   * CSS
   * =========================================================================
   */
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      min-height: var(--admin-bar-height, 43px);
      text-box: trim-both cap alphabetic;
      color: var(--admin-bar-color-text, rgb(255 255 255 / 0.8));
    }
    .admin-bar-text {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      gap: 5px;
      padding: var(--admin-bar-text-padding, var(--admin-bar-block-padding) var(--admin-bar-inline-padding));
      height: 100%;
      background-color: var(--admin-bar-text-color-bg, transparent);
      font-size: var(--font-size);
      white-space: nowrap;
      transition:
        background var(--admin-bar-transition-duration, 0.3s) ease-out,
        color var(--admin-bar-transition-duration, 0.3s) ease-out;

      &:is(.multi-line, :has(dl)) {
        padding: var(--admin-bar-text-padding, var(--admin-bar-inline-padding));
        height: unset;
        white-space: normal;
      }

      & dl {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 1rem;
        margin: 0;

        & :is(dt, dd) {
          text-box: trim-both cap alphabetic;
        }
        & dt {
          max-width: var(--dt-max-width, 50ch);
          font-weight: var(--dt-font-weight, 700);
          text-align: var(--dt-text-align, end);
          text-wrap: var(--dt-text-wrap, balance);
        }
        & dd {
          margin: 0;
          max-width: var(--dd-max-width, 50ch);
          text-wrap: var(--dd-text-wrap, pretty);
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
   * A tuple array that is turned into an HTML definition list.
   */
  @property({ attribute: 'dl-content', type: Array })
  dlContent: TextDlContent = []

  /**
   * Sets the badge for the `<admin-bar-text>`.
   */
  @property({ attribute: 'badge-content' })
  badgeContent = ''

  /**
   * Sets the position for the badge. Accepts: 'after', 'before'
   */
  @property({ attribute: 'badge-position' })
  badgePosition: 'after' | 'before' = 'before'

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
  constructor() {
    super()

    if (!customElements.get('admin-bar-badge')) {
      customElements.define('admin-bar-badge', AdminBarBadge)
    }
  }

  render() {
    const textContent = []

    if (this.textContent ?? false) {
      textContent.push(html`<span class="text">${this.textContent}</span>`)
    } else if (this.dlContent.length) {
      textContent.push(
        html`<dl part="dl">
          ${this.dlContent.map(
            (row) =>
              html`<dt>${row[0] ?? ''}</dt>
                <dd>${row[1] ?? ''}</dd>`
          )}
        </dl>`
      )
    }

    let slotContent = html`<slot>${textContent}</slot>`

    // Add the badge before or after the text content
    if (this.badgeContent ?? false) {
      slotContent =
        this.badgePosition === 'before'
          ? html`<admin-bar-badge part="badge">${this.badgeContent}</admin-bar-badge>${slotContent}`
          : html`${slotContent}<admin-bar-badge part="badge">${this.badgeContent}</admin-bar-badge>`
    }

    return html`<span class="admin-bar-text${this.multiLine ? ' multi-line' : ''}">${slotContent}</span>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-text': AdminBarText
  }
}
