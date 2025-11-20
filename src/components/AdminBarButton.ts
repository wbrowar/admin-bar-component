import { css, html, LitElement, nothing } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { property, queryAssignedElements, state } from 'lit/decorators.js'
import { AdminBarSurface } from './AdminBarSurface.ts'
import { focusElement, hoverClickableElement } from './css.ts'

export class AdminBarButton extends LitElement {
  /**
   * =========================================================================
   * CSS
   * =========================================================================
   */
  static styles = css`
    @position-try --popover-above {
      inset: auto;
      bottom: anchor(top);
    }
    @position-try --popover-below {
      inset: auto;
      top: anchor(bottom);
    }
    :host {
      display: block;
      height: var(--admin-bar-height, 43px);
      text-box: trim-both cap alphabetic;
    }
    :host:has(:focus-visible) {
      ${focusElement()}
    }
    .admin-bar-button {
      ${hoverClickableElement()}
      --popover-name: --popover-anchor;
      anchor-name: var(--popover-name);
      appearance: none;
      box-sizing: border-box;
      display: flex;
      flex-wrap: nowrap;
      gap: 5px;
      align-items: center;
      padding: var(--admin-bar-block-padding) var(--admin-bar-inline-padding);
      min-width: 100%;
      height: 100%;
      border: none;
      font-family: var(--admin-bar-font-stack);
      font-size: var(--font-size);
      text-decoration: none;
      outline: none;
      white-space: nowrap;

      &.admin-bar-button--greeting {
        border-start-start-radius: var(--admin-bar-border-radius);
        border-end-start-radius: var(--admin-bar-border-radius);

        @container style(--admin-bar-show-environment) {
          & {
            border-start-start-radius: 0;
          }
        }
      }

      &.admin-bar-button--logout {
        padding: var(--admin-bar-block-padding) clamp(10px, 3vw, 20px);
        border-end-end-radius: var(--admin-bar-border-radius);
        border-start-end-radius: var(--admin-bar-border-radius);

        &:hover {
          --admin-bar-button-color-bg: var(--admin-bar-color-highlight-logout, var(--admin-bar-color-highlight));
          --admin-bar-button-color-text: var(--admin-bar-color-text-logout);
        }

        @container style(--admin-bar-show-environment) {
          & {
            border-start-end-radius: 0;
          }
        }
      }
    }
    [popovertarget]:has(+ [popover]:popover-open) {
      --admin-bar-button-color-bg: color-mix(in srgb, var(--admin-bar-button-color-bg-hover), transparent 85%);

      &:hover {
        --admin-bar-button-color-bg: var(--admin-bar-button-color-bg-hover, var(--admin-bar-button-color-text, white));
        color: var(--admin-bar-color-highlight, oklch(0.6 0.4 83));
      }
    }

    [popover] {
      --admin-bar-context-popover: true;
      padding: 0;
      border: 0;
      background: transparent;
      border-radius: var(--admin-bar-button-popover-border-radius, var(--admin-bar-border-radius));
      color: var(--admin-bar-button-popover-color-text, rgb(255 255 255));
      box-shadow:
        0 6px 6px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(0, 0, 0, 0.1);
      scrollbar-color: color-mix(in srgb, var(--admin-bar-color-text), transparent 20%) var(--admin-bar-bg-color);
      scrollbar-width: thin;

      @supports (position-anchor: var(--popover-name)) and (position-try-fallbacks: flip-block) {
        & {
          position-anchor: var(--popover-name);
          position: fixed;
          position-try-fallbacks: --popover-above;
          justify-self: anchor-center;
          inset: auto;
          top: anchor(bottom);
          margin: 4px;

          @container style(--admin-bar-class-bottom: true) {
            position-try-fallbacks: --popover-below;
            inset: auto;
            bottom: anchor(top);
          }
        }
      }
      @supports not (position-anchor: --popover-anchor) {
        &::backdrop {
          backdrop-filter: blur(20px) saturate(200%);
          background: var(--admin-bar-button-popover-bg);
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
   * Add an aria-label to the `button` or `a` element.
   */
  @property({ attribute: 'button-aria-label' })
  buttonAriaLabel: string | undefined

  /**
   * Adding the `button-href` turns the `<admin-bar-button>` into an `<a>` elements and sets this string as its `href` attribute.
   */
  @property({ attribute: 'button-href' })
  href: string | undefined

  /**
   * Sets the label for the `<admin-bar-button>`.
   */
  @property({ attribute: 'label-text' })
  label = ''

  /**
   * Styles the button when it is used in the Admin Bar greeting area.
   */
  @property({ attribute: 'greeting-button', type: Boolean })
  isGreetingButton = false

  /**
   * Styles the button like the default logout button.
   */
  @property({ attribute: 'logout-button', type: Boolean })
  isLogoutButton = false

  /**
   * =========================================================================
   * STATE
   * =========================================================================
   */
  /**
   * Tracks whether the `popover` slot has content.
   */
  @state()
  private _hasPopoverSlot = false

  /**
   * Tracks whether the popover is currently open.
   */
  @state()
  private _popoverOpen = false

  /**
   * =========================================================================
   * METHODS
   * =========================================================================
   */
  /**
   * Handles keyboard navigation for the popover.
   */
  private _onPopoverButtonKeyDown(e: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault()

      // If the popover is closed, open it.
      if (!this._popoverOpen) {
        const popoverElement: HTMLElement | null = this.shadowRoot?.querySelector('[popovertarget]') ?? null

        if (popoverElement) {
          popoverElement.click()
        }
      }

      // Focus on the selected child element.
      if (this._popoverFocusableChildren.length) {
        const focusableSelectors =
          'admin-bar-button, admin-bar-checkbox, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

        // Look for focusable elements as the slotted element in the popover slot.
        let focusableElements = this._popoverFocusableChildren.filter((child) => {
          return child.matches(focusableSelectors)
        })

        // If no focusable elements were found, look for focusable elements in the children of the popover slotted elements.
        if (!focusableElements.length) {
          focusableElements = []
          const focusableParent = this.isGreetingButton
            ? this._popoverFocusableChildren[0].querySelector('slot')?.assignedNodes({ flatten: true })
            : this._popoverFocusableChildren

          if (focusableParent) {
            ;(focusableParent as HTMLElement[]).forEach((child) => {
              const focusableChildren: NodeListOf<HTMLElement> = child.querySelectorAll(focusableSelectors)
              for (const focusableChild of focusableChildren) {
                focusableElements.push(focusableChild)
              }
            })
          }
        }

        // If there are focusable elements, handle keyboard navigation.
        if (focusableElements.length) {
          let focusElement: HTMLElement | null = null
          const focusedElementIndex = focusableElements.findIndex((el) => el === document.activeElement)

          if (e.key === 'ArrowUp') {
            // If the focused element is the first element, move focus to the last element.
            if (focusedElementIndex <= 0) {
              focusElement = focusableElements[focusableElements.length - 1]
            } else {
              focusElement = focusableElements[focusedElementIndex - 1]
            }
          } else if (e.key === 'ArrowDown') {
            // If the focused element is the last element, move focus to the first element.
            if (focusedElementIndex >= focusableElements.length - 1) {
              focusElement = focusableElements[0]
            } else {
              focusElement = focusableElements[focusedElementIndex + 1]
            }
          }

          if (focusElement) {
            if (focusElement.tagName === 'ADMIN-BAR-BUTTON') {
              focusElement = focusElement.shadowRoot?.querySelector('a, button') ?? null
            } else if (focusElement.tagName === 'ADMIN-BAR-CHECKBOX') {
              focusElement = focusElement.shadowRoot?.querySelector('input') ?? null
            }

            if (focusElement) {
              focusElement.focus()
            }
          }
        }
      }
    }
  }

  /**
   * Emits events when the popover is opened or closed.
   */
  private _onPopoverToggle(e: ToggleEvent) {
    this._popoverOpen = e.newState === 'open'
    this.dispatchEvent(new CustomEvent('toggle', { detail: { open: this._popoverOpen } }))

    if (this._popoverOpen) {
      this.dispatchEvent(new CustomEvent('opened'))
    } else {
      this.dispatchEvent(new CustomEvent('closed'))
    }
  }

  /**
   * =========================================================================
   * SLOTS
   * =========================================================================
   */
  /**
   * The elements slotted into the popover slot.
   */
  @queryAssignedElements({
    flatten: true,
    slot: 'popover',
  })
  _popoverFocusableChildren!: Array<HTMLElement>

  /**
   * Event fired when content in the `popover` slot changes.
   */
  _handlePopoverSlotchange(e: any) {
    const childNodes = e.target.assignedNodes({ flatten: true })

    this._hasPopoverSlot = childNodes.length > 0
  }

  /**
   * =========================================================================
   * LIFECYCLE
   * =========================================================================
   */
  constructor() {
    super()
    if (!customElements.get('admin-bar-surface')) {
      customElements.define('admin-bar-surface', AdminBarSurface)
    }
  }
  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('keydown', this._onPopoverButtonKeyDown)
  }
  render() {
    const adminBarClasses = {
      'admin-bar-button': true,
      'admin-bar-button--el-a': false,
      'admin-bar-button--el-button': false,
      'admin-bar-button--el-select': false,
      'admin-bar-button--greeting': this.isGreetingButton,
      'admin-bar-button--logout': this.isLogoutButton,
    }

    const labelContent = html`<slot name="before-label"></slot
      ><slot>${(this.label ?? false) ? html`<span>${this.label}</span>` : nothing}</slot
      ><slot name="after-label"></slot>`

    if (this.href) {
      adminBarClasses['admin-bar-button--el-a'] = true
      return html`<a
        class="${classMap(adminBarClasses)}"
        aria-label="${this.buttonAriaLabel ?? nothing}"
        href="${this.href}"
        >${labelContent}</a
      >`
    }

    adminBarClasses['admin-bar-button--el-button'] = true

    if (this._hasPopoverSlot) {
      return html`<button
          class="${classMap(adminBarClasses)}"
          aria-label="${this.buttonAriaLabel ?? nothing}"
          popovertarget="admin-bar-button-popover"
        >
          ${labelContent}
        </button>
        <admin-bar-surface popover id="admin-bar-button-popover" part="popover" @toggle="${this._onPopoverToggle}">
          <slot name="popover" @slotchange="${this._handlePopoverSlotchange}"></slot>
        </admin-bar-surface>`
    }

    return html`<button class="${classMap(adminBarClasses)}" aria-label="${this.buttonAriaLabel ?? nothing}">
        ${labelContent}</button
      ><slot name="popover" @slotchange="${this._handlePopoverSlotchange}"></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-button': AdminBarButton
  }
}
