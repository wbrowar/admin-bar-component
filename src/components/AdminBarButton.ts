import { css, html, LitElement, nothing } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { property, queryAssignedElements, state } from 'lit/decorators.js'
import { AdminBarSurface } from './AdminBarSurface.ts'
import { focusElement, hoverClickableElement } from './css.ts'
import { AdminBarBadge } from '@/components/AdminBarBadge.ts'

export class AdminBarButton extends LitElement {
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true }

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
      --popover-name: --popover-anchor;
      display: block;
      text-box: trim-both cap alphabetic;
    }

    .admin-bar-button {
      ${hoverClickableElement()}
      anchor-name: var(--popover-name);
      appearance: none;
      box-sizing: border-box;
      display: flex;
      flex-wrap: nowrap;
      gap: 5px;
      align-items: center;
      padding: var(--admin-bar-block-padding) var(--admin-bar-inline-padding);
      min-width: 100%;
      min-height: var(--admin-bar-height, 43px);
      height: 100%;
      border: none;
      font-family: var(--admin-bar-font-stack);
      font-size: var(--font-size);
      text-decoration: none;
      outline: none;
      white-space: nowrap;

      &:focus-visible {
        ${focusElement()}
      }

      :host([logout-button]) &:hover {
        background-color: var(--admin-bar-color-highlight-logout, var(--admin-bar-color-highlight));
        color: var(--admin-bar-color-text-logout);
      }
      &:hover {
        .badge {
          background-color: var(--admin-bar-color-highlight);
          color: var(--admin-bar-color-text);
        }
      }
    }
    [popovertarget]:has(+ [popover]:popover-open) {
      --admin-bar-button-color-bg: color-mix(in srgb, var(--admin-bar-button-color-bg-hover), transparent 85%);

      &:hover {
        --admin-bar-button-color-bg: var(--admin-bar-button-color-bg-hover, var(--admin-bar-button-color-text, white));
        color: var(--admin-bar-color-highlight, oklch(0.6 0.4 83));

        .badge {
          background-color: var(--admin-bar-color-highlight);
          color: var(--admin-bar-color-text);
        }
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
          inset-block-start: calc(anchor(end) + 4px);
          margin: 0 4px;
          height: auto;

          @container style(--admin-bar-class-bottom: true) {
            position-try-fallbacks: --popover-below;
            inset: auto;
            inset-block-end: anchor(start);
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

    .vertical-popover {
      display: none;
      box-sizing: border-box;
      position: relative;
      margin: 5px;
      height: auto;
      background-color: var(--admin-bar-button-popover-bg, var(--admin-bar-bg-color));
      border-radius: var(--admin-bar-button-popover-border-radius, var(--admin-bar-border-radius));

      &[data-open] {
        display: flex;
      }
    }
  `

  /**
   * =========================================================================
   * PROPS
   * =========================================================================
   */
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
   * Stores the vertical state based on the CSS variable, `--admin-bar-vertical`.
   */
  @state()
  private _inVertical = false

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
  private _onVerticalPopoverButtonClick() {
    if (this._inVertical) {
      this._popoverOpen = !this._popoverOpen
    }
  }
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

  updateInVertical() {
    this._popoverOpen = false
    this._inVertical = window.getComputedStyle(this).getPropertyValue('--admin-bar-vertical') === 'true'
  }

  /**
   * Emits events when the popover is opened or closed.
   */
  private _onPopoverToggle(e: ToggleEvent) {
    this._popoverOpen = e.newState === 'open'
    this.dispatchEvent(new AdminBarButtonToggleEvent(e.oldState, e.newState))

    if (this._popoverOpen) {
      this.dispatchEvent(new AdminBarButtonOpenedEvent())
    } else {
      this.dispatchEvent(new AdminBarButtonClosedEvent())
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
  private _popoverFocusableChildren!: Array<HTMLElement>

  /**
   * Event fired when content in the `popover` slot changes.
   */
  private _handlePopoverSlotchange(e: any) {
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

    if (!customElements.get('admin-bar-badge')) {
      customElements.define('admin-bar-badge', AdminBarBadge)
    }
    if (!customElements.get('admin-bar-surface')) {
      customElements.define('admin-bar-surface', AdminBarSurface)
    }
  }
  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('keydown', this._onPopoverButtonKeyDown)

    this.updateInVertical()
  }

  render() {
    const adminBarClasses = {
      'admin-bar-button': true,
    }

    const badgeContent = this.badgeContent
      ? html`<admin-bar-badge class="badge" text-content="${this.badgeContent}" part="badge"></admin-bar-badge>`
      : null

    const labelContent = html`<slot name="before-label"></slot>${this.badgeContent && this.badgePosition === 'before'
        ? badgeContent
        : nothing}<slot>${(this.label ?? false) ? html`<span>${this.label}</span>` : nothing}</slot>${this
        .badgeContent && this.badgePosition === 'after'
        ? badgeContent
        : nothing}<slot name="after-label"></slot>`

    // Render `a` element.
    if (this.href) {
      return html`<a
        class="${classMap(adminBarClasses)}"
        aria-label="${this.buttonAriaLabel ?? nothing}"
        href="${this.href}"
        >${labelContent}</a
      >`
    }

    if (this._hasPopoverSlot) {
      const buttonElement = html`<button
        class="${classMap(adminBarClasses)}"
        aria-label="${this.buttonAriaLabel ?? nothing}"
        popovertarget="${!this._inVertical ? 'admin-bar-button-popover' : nothing}"
        @click="${this._onVerticalPopoverButtonClick}"
      >
        ${labelContent}
      </button>`

      // Render popover content below button.
      if (this._inVertical) {
        return html`${buttonElement}
          <div class="vertical-popover" ?data-open="${this._popoverOpen}">
            <slot name="popover" @slotchange="${this._handlePopoverSlotchange}"></slot>
          </div>`
      }

      // Render popover as HTML popover.
      return html`${buttonElement}<admin-bar-surface
          popover
          id="admin-bar-button-popover"
          part="popover"
          @toggle="${this._onPopoverToggle}"
          ><slot name="popover" @slotchange="${this._handlePopoverSlotchange}"></slot
        ></admin-bar-surface>`
    }

    // Render `button` element.
    return html`<button class="${classMap(adminBarClasses)}" aria-label="${this.buttonAriaLabel ?? nothing}">
        ${labelContent}</button
      ><slot name="popover" @slotchange="${this._handlePopoverSlotchange}"></slot>`
  }
}

/**
 * =========================================================================
 * EVENTS
 * =========================================================================
 */
/**
 * Event fired when the checkbox state changes.
 *
 * Returns `open` value that is `true` when the popover is open and `false` when it is closed.
 * It also provides the `oldState` and `newState` values from the internal popover `toggle` event.
 *
 * Usage:
 * ```js
 * checkbox.addEventListener('toggle', (e) => {
 *   console.log(e.newState === 'open');
 *   console.log(e.open);
 * });
 * ```
 */
export class AdminBarButtonToggleEvent extends Event {
  static readonly eventName = 'toggle'

  readonly newState: string = 'closed'
  readonly oldState: string = 'closed'
  readonly open: boolean = false

  constructor(oldState: string, newState: string) {
    super(AdminBarButtonToggleEvent.eventName, { bubbles: true, composed: true })

    this.newState = newState
    this.oldState = oldState
    this.open = newState === 'open'
  }
}

/**
 * Event fired when the popover is opened.
 * Usage:
 * ```js
 * checkbox.addEventListener('opened', (e) => {
 *   // Do something based on popover opening.
 * });
 * ```
 */
export class AdminBarButtonOpenedEvent extends Event {
  static readonly eventName = 'opened'

  constructor() {
    super(AdminBarButtonOpenedEvent.eventName, { bubbles: true, composed: true })
  }
}

/**
 * Event fired when the popover is closed.
 * Usage:
 * ```js
 * checkbox.addEventListener('closed', (e) => {
 *   // Do something based on popover closing.
 * });
 * ```
 */
export class AdminBarButtonClosedEvent extends Event {
  static readonly eventName = 'closed'

  constructor() {
    super(AdminBarButtonClosedEvent.eventName, { bubbles: true, composed: true })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar-button': AdminBarButton
  }
}
