import { css, html, LitElement, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import type { TextDlContent, TextTableContent } from '../../types'

export class AdminBarText extends LitElement {
  /**
   * =========================================================================
   * CSS
   * =========================================================================
   */
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      min-height: var(--admin-bar-height, 43px);
      text-box: trim-both cap alphabetic;
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
      color: var(--admin-bar-color-text, rgb(255 255 255 / 0.8));
      white-space: nowrap;
      transition:
        background var(--admin-bar-transition-duration, 0.4s) ease-out,
        color var(--admin-bar-transition-duration, 0.4s) ease-out;

      &:is(.multi-line, :has(dl, table)) {
        padding: var(--admin-bar-text-padding, var(--admin-bar-inline-padding));
        height: unset;
        white-space: unset;

        &:has(table) {
          padding: 0;
        }
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
      & table {
        --table-border-radius: calc(var(--admin-bar-border-radius) * 0.6);

        & thead {
          background-color: var(--admin-bar-text-label-color-bg);
          color: var(--admin-bar-text-label-color-text);

          & th:first-child {
            border-start-start-radius: var(--table-border-radius);
          }
          & th:last-child {
            border-start-end-radius: var(--table-border-radius);
          }
        }
        & tfoot {
          background-color: color-mix(in srgb, var(--admin-bar-text-label-color-bg), transparent 80%);

          & td:first-child {
            border-end-start-radius: var(--table-border-radius);
          }
          & td:last-child {
            border-end-end-radius: var(--table-border-radius);
          }
        }
        & :is(td, th) {
          padding: var(--admin-bar-text-padding, clamp(4px, 0.8vw, 10px));
          max-width: var(--td-max-width, 50ch);
          font-weight: initial;
          text-wrap: var(--td-text-wrap, pretty);
        }
      }
    }
    .label {
      padding: 0.4em;
      background-color: var(--admin-bar-text-label-color-bg, rgb(255 255 255 / 0.9));
      border-radius: 4px;
      line-height: 1;
      text-box: trim-both cap alphabetic;
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
   * A tuple array that is turned into an HTML definition list.
   */
  @property({ attribute: 'dl-content', type: Array })
  dlContent: TextDlContent = []

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
   * An object that is turned into an HTML table.
   */
  @property({ attribute: 'table-content', type: Object })
  tableContent: TextTableContent = { rows: [] }

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
    } else if (this.tableContent?.rows?.length) {
      textContent.push(
        html`<table part="table">
          ${this.tableContent?.headers?.length
            ? html`<thead>
                <tr>
                  ${this.tableContent.headers.map((header) => html`<th>${header ?? ''}</th>`)}
                </tr>
              </thead>`
            : nothing}
          ${html`<tbody>
            ${this.tableContent.rows.map(
              (row) =>
                html`<tr>
                  ${row.map((item) => html`<td>${item}</td>`)}
                </tr>`
            )}
          </tbody>`}
          ${this.tableContent?.footers?.length
            ? html`<tfoot>
                <tr>
                  ${this.tableContent.footers.map((header) => html`<td>${header ?? ''}</td>`)}
                </tr>
              </tfoot>`
            : nothing}
        </table>`
      )
    }

    let slotContent = html`<slot>${textContent}</slot>`

    // Add the label before or after the text content
    if (this.labelContent ?? false) {
      slotContent =
        this.labelPosition === 'before'
          ? html`<span class="label">${this.labelContent}</span>${slotContent}`
          : html`${slotContent}<span class="label">${this.labelContent}</span>`
    }

    return html`<span class="admin-bar-text${this.multiLine ? ' multi-line' : ''}">${slotContent}</span>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-text': AdminBarText
  }
}
