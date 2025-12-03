import { css, html, LitElement, nothing, PropertyValues } from 'lit'
import { property, state } from 'lit/decorators.js'
import { focusElement, hoverClickableElement, visuallyHidden } from './css.ts'
import { classMap } from 'lit/directives/class-map.js'

export class AdminBarCheckbox extends LitElement {
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true }

  /**
   * =========================================================================
   * CSS
   * =========================================================================
   */
  static styles = css`
    :host {
      display: block;
      height: var(--admin-bar-height, 43px);
    }
    .admin-bar-checkbox {
      ${hoverClickableElement()}
      display: flex;
      flex-wrap: nowrap;
      gap: 5px;
      align-items: center;
      padding: var(--admin-bar-text-padding, var(--admin-bar-block-padding) var(--admin-bar-inline-padding));
      height: 100%;
      accent-color: var(--admin-bar-color-highlight);
      white-space: nowrap;

      &:has(:focus-visible) {
        ${focusElement()}
      }

      input {
        outline: none;
      }
      :host([disabled]) & {
        cursor: not-allowed;
      }
      &.admin-bar-checkbox--has-icon input[type='checkbox'] {
        ${visuallyHidden()}
      }
    }
  `

  /**
   * =========================================================================
   * PROPS
   * =========================================================================
   */
  /**
   * Add an aria-label to the `input` element.
   */
  @property({ attribute: 'input-aria-label' })
  inputAriaLabel: string | undefined

  /**
   * Sets the value of the checkbox.
   */
  @property({ attribute: 'checked', reflect: true, type: Boolean, useDefault: true })
  inputChecked: boolean = false

  /**
   * Disables the checkbox.
   */
  @property({ attribute: 'disabled', type: Boolean })
  inputDisabled: boolean = false

  /**
   * The label text content for the checkbox.
   */
  @property({ attribute: 'label-text' })
  inputLabel: string = ''

  /**
   * The `name` attribute of the checkbox.
   */
  @property({ attribute: 'input-name' })
  inputName: string = 'checkbox'

  /**
   * Setting this to `true` will add the `switch` attribute to the checkbox element.
   */
  @property({ attribute: 'input-switch', type: Boolean })
  inputSwitch: boolean = false

  /**
   * Sets the position for the label in relation to the checkbox. Accepts: 'after', 'before'
   */
  @property({ attribute: 'label-position' })
  labelPosition: 'after' | 'before' = 'after'

  /**
   * =========================================================================
   * STATE
   * =========================================================================
   */
  /**
   * Tracks whether the `checked-icon` slot has content.
   */
  @state()
  private _hasCheckedIconSlot = false

  /**
   * Tracks whether the `unchecked-icon` slot has content.
   */
  @state()
  private _hasUncheckedIconSlot = false

  /**
   * Tracks whether the `unchecked-icon` slot has content.
   */
  @state()
  private _readyForUpdates = false

  /**
   * =========================================================================
   * SLOTS
   * =========================================================================
   */
  /**
   * Event fired when content in the `checked-icon` slot changes.
   */
  handleCheckedIconSlotchange(e: any) {
    const childNodes = e.target.assignedNodes({ flatten: true })

    this._hasCheckedIconSlot = childNodes.length > 0
  }
  /**
   * Event fired when content in the `checked-icon` slot changes.
   */
  handleUncheckedIconSlotchange(e: any) {
    const childNodes = e.target.assignedNodes({ flatten: true })

    this._hasUncheckedIconSlot = childNodes.length > 0
  }

  /**
   * =========================================================================
   * METHODS
   * =========================================================================
   */
  private _toggleChecked() {
    this.inputChecked = !this.inputChecked
  }

  /**
   * =========================================================================
   * LIFECYCLE
   * =========================================================================
   */
  protected firstUpdated(_changedProperties: PropertyValues) {
    this._readyForUpdates = true
  }
  render() {
    const labelContent = html`<slot>${this.inputLabel}</slot>`
    const iconContent = this.inputChecked
      ? html`<slot name="checked-icon" @slotchange="${this.handleCheckedIconSlotchange}"></slot>`
      : html`<slot name="unchecked-icon" @slotchange="${this.handleUncheckedIconSlotchange}"></slot>`

    const labelClasses = {
      'admin-bar-checkbox': true,
      'admin-bar-checkbox--disabled': this.inputDisabled,
      'admin-bar-checkbox--has-icon': this.inputChecked ? this._hasCheckedIconSlot : this._hasUncheckedIconSlot,
    }

    return html`<label class="${classMap(labelClasses)}"
      >${this.labelPosition === 'before' ? labelContent : nothing}${iconContent}<input
        id="${this.inputName}"
        name="${this.inputName}"
        ?switch="${this.inputSwitch}"
        ?checked="${this.inputChecked ? 'checked' : nothing}"
        ?disabled="${this.inputDisabled ? 'disabled' : nothing}"
        aria-label="${this.inputAriaLabel ?? nothing}"
        type="checkbox"
        @click="${this._toggleChecked}"
      />${this.labelPosition === 'after' ? labelContent : nothing}</label
    >`
  }

  protected willUpdate(changedProperties: Map<string, any>) {
    if (this._readyForUpdates && changedProperties.has('inputChecked')) {
      this.dispatchEvent(new AdminBarCheckboxChangeEvent(this.inputChecked))

      if (this.inputChecked) {
        this.dispatchEvent(new AdminBarCheckboxCheckedEvent())
      } else {
        this.dispatchEvent(new AdminBarCheckboxUncheckedEvent())
      }
    }
  }
}

/**
 * =========================================================================
 * EVENTS
 * =========================================================================
 */
/**
 * Event fired when the checkbox state changes.
 * Usage:
 * ```js
 * checkbox.addEventListener('change', (e) => {
 *   console.log(e.checked);
 * });
 * ```
 */
export class AdminBarCheckboxChangeEvent extends Event {
  static readonly eventName = 'change'

  readonly checked: boolean = false

  constructor(checked: boolean) {
    super(AdminBarCheckboxChangeEvent.eventName, { bubbles: true, composed: true })

    this.checked = checked
  }
}

/**
 * Event fired when the checkbox state changes to checked.
 * Usage:
 * ```js
 * checkbox.addEventListener('checked', (e) => {
 *   // Do something based on chechbox getting checked.
 * });
 * ```
 */
export class AdminBarCheckboxCheckedEvent extends Event {
  static readonly eventName = 'checked'

  constructor() {
    super(AdminBarCheckboxCheckedEvent.eventName, { bubbles: true, composed: true })
  }
}

/**
 * Event fired when the checkbox state changes to unchecked.
 * Usage:
 * ```js
 * checkbox.addEventListener('checked', (e) => {
 *   // Do something based on chechbox removing checked.
 * });
 * ```
 */
export class AdminBarCheckboxUncheckedEvent extends Event {
  static readonly eventName = 'unchecked'

  constructor() {
    super(AdminBarCheckboxUncheckedEvent.eventName, { bubbles: true, composed: true })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-checkbox': AdminBarCheckbox
  }
}
