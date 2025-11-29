import { css, html, LitElement, nothing } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { property, queryAssignedElements, state } from 'lit/decorators.js'

import { AdminBarButton } from './AdminBarButton.ts'

import { AdminBarSurface } from './AdminBarSurface.ts'
import { visuallyHidden } from '@/components/css.ts'
import { ToolbarToggleDrag, ToolbarToggleState } from '../../types'
import { DraggableState, makeDraggable } from '@/utils/draggable.ts'
import { collapseIcon, editIcon, moveIcon } from '@/utils/icons.ts'

export class AdminBar extends LitElement {
  #resizeObserver: ResizeObserver | undefined

  /**
   * ===========================================================================
   * CSS
   * ===========================================================================
   */
  static styles = css`
    :host {
      container-name: admin-bar;
      container-type: inline-size;
      display: block;
    }
    :host(.fixed) {
      --admin-bar-class-fixed: true;
    }
    :host(.sticky) {
      --admin-bar-class-sticky: true;
    }
    :host(.bottom) {
      --admin-bar-class-bottom: true;
    }

    * {
      position: relative;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .outer-toggle {
      display: inline-block;

      & > div {
        display: grid;
        grid-template-columns: max-content max-content;
      }
      p {
        ${visuallyHidden()}
      }
      .drag-handle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 100%;
        color: var(--admin-bar-color-text);
        cursor: grab;

        &.dragging {
          cursor: grabbing;
        }
        & > p {
          ${visuallyHidden()}
        }

        :host(:not([toolbar-toggle-drag])) & {
          display: none;
        }
      }

      :host([toolbar-toggle='toolbar']) &,
      :host(:not([toolbar-toggle])) & {
        display: none;
      }
    }

    .admin-bar {
      display: block;
      height: auto;

      & > div {
        --border-color: color-mix(in oklch, var(--admin-bar-color-text), transparent 90%);
        display: grid;
        grid-template-areas:
          'environment environment environment environment'
          'greeting buttons logout toggle';
        grid-template-columns: max-content 1fr max-content max-content;
        grid-template-rows: auto var(--admin-bar-height, 43px);
        align-items: center;
        background: var(--admin-bar-bg);
        border-radius: var(--admin-bar-border-radius);
        font-family: var(--admin-bar-font-stack);
        font-size: var(--admin-bar-font-size, 0.9rem);
        color: var(--admin-bar-color-text, oklch(1 0 89.876 / 0.8));

        :host([show-environment]) & {
          --admin-bar-show-environment: true;
        }
        :host([show-greeting]) & {
          --admin-bar-show-greeting: true;
        }
        :host([show-logout]) & {
          --admin-bar-show-logout: true;
        }

        @container style(--admin-bar-vertical: true) {
          & {
            grid-template-areas:
              'environment environment'
              'greeting toggle'
              'buttons buttons'
              'logout logout';
            grid-template-columns: 1fr max-content;
            grid-template-rows: auto var(--admin-bar-height, 43px) 1fr var(--admin-bar-height, 43px);
            align-items: stretch;
            height: 100%;
          }
        }
      }

      :host([toolbar-toggle='button']) & {
        display: none;
      }
    }

    .environment {
      grid-area: environment;
      height: 0;
      border-radius: var(--admin-bar-border-radius) var(--admin-bar-border-radius) 0 0;

      :host([show-environment]) & {
        height: var(--admin-bar-environment-height, 4px);
        background: var(
          --admin-bar-environment-bg,
          repeating-linear-gradient(
            -45deg,
            var(--admin-bar-environment-bg-color),
            var(--admin-bar-environment-bg-color) 18px,
            transparent 18px,
            transparent 30px
          )
        );
      }

      p {
        ${visuallyHidden()}
      }
    }

    admin-bar-button:is([greeting-button], [logout-button]),
    .logout {
      display: block;
      height: 100%;
    }
    .greeting {
      --admin-bar-vertical: false;
      grid-area: greeting;
      display: grid;

      &:not(admin-bar-button):not(:empty) {
        padding-inline: var(--admin-bar-inline-padding);
      }
      &::part(popover) {
        max-height: calc(100dvh - calc(var(--admin-bar-height, 43px) * 2));
      }
    }
    .greeting-content {
      --grid-template-columns: max-content;
      display: grid;
      grid-template-columns: var(--grid-template-columns);
      gap: 7px;
      align-items: center;
      margin-block-start: var(--margin-block-start, 0.5rem);
      margin-block-end: var(--margin-block-end, 0.5rem);
      border-end-start-radius: var(--admin-bar-border-radius);
      border-end-end-radius: var(--admin-bar-border-radius);
      white-space: nowrap;

      &:has(img) {
        --grid-template-columns: max-content max-content;
      }

      img {
        display: block;
        aspect-ratio: 1 / 1;
        width: var(--admin-bar-avatar-size, 25px);
        height: auto;
        background-size: cover;
        border-radius: 50%;
        box-shadow: var(--admin-bar-shadow-elements);
      }

      @container (width < 700px) and (not style(--admin-bar-vertical: true)) {
        &:has(img) {
          --grid-template-columns: max-content;
          display: grid;

          span {
            display: none;
          }
        }
      }
    }

    .inner-toggle {
      grid-area: toggle;
      display: none;

      :host([toolbar-toggle]) & {
        display: var(--admin-bar-toolbar-toggle-display, inline-flex);
      }

      p {
        ${visuallyHidden()}
      }
    }

    .buttons {
      grid-area: buttons;
      position: relative;
      width: 100%;
      height: 100%;

      :host([show-greeting]) & {
        border-left: 1px solid var(--border-color);

        @container style(--admin-bar-vertical: true) {
          & {
            border-top: 1px solid var(--border-color);
            border-left: none;
          }
        }
      }

      :host([show-logout]) & {
        border-right: 1px solid var(--border-color);

        @container style(--admin-bar-vertical: true) {
          & {
            border-bottom: 1px solid var(--border-color);
            border-right: none;
          }
        }
      }
    }
    .buttons-content {
      display: flex;
      flex-flow: row nowrap;
      position: absolute;
      inset: 0;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-color: color-mix(in oklch, var(--admin-bar-color-text), transparent 20%)
        color-mix(in oklch, var(--admin-bar-bg-color), transparent 20%);
      scrollbar-width: thin;

      @container style(--admin-bar-vertical: true) {
        & {
          display: grid;
          align-items: start;
          overflow-x: unset;
          overflow: auto;
        }
      }
    }

    .logout {
      grid-area: logout;
    }
  `

  /**
   * ===========================================================================
   * PROPS
   * ===========================================================================
   */
  /**
   * Automatically toggles between toolbar and button when resized.
   */
  @property({ attribute: 'auto-toggle-vertical', type: Boolean })
  autoToggleVertical = false

  /**
   * Sets the alt text on an avatar image.
   */
  @property({ attribute: 'avatar-alt' })
  avatarAlt = 'Avatar of logged in user.'

  /**
   * Sets the `src` on an avatar image and enables the avatar image to be displayed.
   */
  @property({ attribute: 'avatar-src' })
  avatarSrc: string | undefined

  /**
   * Sets visually hidden text that explains the reason why the environment warning is displayed.
   */
  @property({ attribute: 'environment-description' })
  environmentDescription: string | undefined

  /**
   * Sets an ARIA label on the button that toggles the `greeting-popover` content.
   */
  @property({ attribute: 'greeting-button-aria-label' })
  greetingButtonAriaLabel: string | undefined

  /**
   * Sets the greeting text content.
   */
  @property({ attribute: 'greeting-text' })
  greetingText: string | undefined

  /**
   * A URL added to the default logout button, when `show-logout` is added to an `<admin-bar>`.
   */
  @property({ attribute: 'logout-href' })
  logoutHref = '#'

  /**
   * The label of the default logout button.
   */
  @property({ attribute: 'logout-label' })
  logoutLabel = 'Sign out'

  /**
   * Displays a progress bar in the background of the `<admin-bar>` element.
   *
   * Setting different values determines the state of progress bar shown:
   * 1-99 – Displays progress as a percentage
   * 100 – Displays successful state
   * -1 – Displays error state
   *
   */
  @property({ attribute: 'progress', type: Number })
  progressValue = 0

  /**
   * Displays the environment warning, letting users know what environment they are currently logged into.
   */
  @property({ attribute: 'show-environment', type: Boolean })
  showEnvironment = false

  /**
   * Displays the avatar and greeting message.
   */
  @property({ attribute: 'show-greeting', type: Boolean })
  showGreeting = false

  /**
   * Displays the default logout button or content added to the `logout` slot.
   */
  @property({ attribute: 'show-logout', type: Boolean })
  showLogout = false

  /**
   * Displays the toggle button that toggles the display of Admin Bar.
   * Setting the value to `button` hides the toolbar and shows the button.
   * Setting the value to `toolbar` shows the toolbar.
   */
  @property({ attribute: 'toolbar-toggle', reflect: true })
  toolbarToggle: ToolbarToggleState | '' | undefined = undefined

  /**
   * Adds a drag handle to the toggle button that lets users reposition it when needed.
   * Setting the value to `remember` will store the button’s position and will restore it on reload.
   * Setting the value to `reset` will reset the button’s position upon page reload.
   */
  @property({ attribute: 'toolbar-toggle-drag', reflect: true })
  toolbarToggleDrag: ToolbarToggleDrag | '' | undefined = undefined

  /**
   * Add a description to guide the user on how the drag handle works.
   */
  @property({ attribute: 'toolbar-toggle-drag-handle-description' })
  toolbarToggleDragHandleDescription: string = 'Click to drag the toggle button to another position on the page.'

  /**
   * Add a description to guide the user on what will happen when the inner toggle button is clicked.
   */
  @property({ attribute: 'toolbar-toggle-inner-description' })
  toolbarToggleInnerDescription: string = 'Click to collapse toolbar.'

  /**
   * Add a description to guide the user on what will happen when the outer toggle button is clicked.
   */
  @property({ attribute: 'toolbar-toggle-outer-description' })
  toolbarToggleOuterDescription: string = 'Click to expand toolbar.'

  /**
   * =========================================================================
   * STATE
   * =========================================================================
   */
  /**
   * Stores information on the drag state of the outer toggle button.
   */
  @state()
  private _outerToggleDraggableState: DraggableState | undefined = undefined

  /**
   * Tracks whether the `greeting-popover` slot has content.
   */
  @state()
  private _hasGreetingPopoverSlot = false

  /**
   * Stores the width of the `<admin-bar>` element.
   */
  @state()
  private _hostWidth = 0

  /**
   * Stores the vertical state based on the CSS variable, `--admin-bar-vertical`.
   */
  @state()
  private _isVertical = false

  /**
   * =========================================================================
   * METHODS
   * =========================================================================
   */
  private _toggleVerticalAdminBar(newState: ToolbarToggleState) {
    this.toolbarToggle = newState
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
    selector: 'admin-bar-button',
  })
  private _adminBarButtonChildren!: Array<AdminBarButton>

  /**
   * Tracks whether the `greeting-popover` slot has content.
   */
  private _handleGreetingPopoverSlotchange(e: any) {
    const childNodes = e.target.assignedNodes({ flatten: true })

    this._hasGreetingPopoverSlot = childNodes.length > 0
  }

  /**
   * ===========================================================================
   * LIFECYCLE
   * ===========================================================================
   */
  constructor() {
    super()
    if (!customElements.get('admin-bar-button')) {
      customElements.define('admin-bar-button', AdminBarButton)
    }
    if (!customElements.get('admin-bar-surface')) {
      customElements.define('admin-bar-surface', AdminBarSurface)
    }
  }
  connectedCallback() {
    super.connectedCallback()

    if (this.parentElement) {
      this.#resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          // Toggles the value of `toolbarToggle` when the `<admin-bar>` element resizes.
          if (Math.round(entry.contentRect.width) !== this._hostWidth) {
            const isVertical = window.getComputedStyle(this).getPropertyValue('--admin-bar-vertical') === 'true'

            if (this._isVertical !== isVertical) {
              this._isVertical = isVertical

              // Toggles between `button` or `toolbar`.
              if (this.autoToggleVertical) {
                if (isVertical) {
                  this.toolbarToggle = 'button'
                } else {
                  this.toolbarToggle = 'toolbar'
                }
              }

              // Update child elements based on the vertical state.
              if (this._adminBarButtonChildren.length) {
                for (const child of this._adminBarButtonChildren) {
                  child?.updateInVertical()
                }
              }
            }
          }

          this._hostWidth = Math.round(entry.contentRect.width)
        }
      })

      this.#resizeObserver.observe(this.parentElement)
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback()

    this.#resizeObserver?.disconnect()
  }
  protected firstUpdated() {
    // Default `toolbar-toggle` to `toolbar` when a value isn’t provided.
    if (this.toolbarToggle === '') {
      this.toolbarToggle = this._isVertical ? 'button' : 'toolbar'
    }

    // Default `toolbar-toggle-drag` to `reset` when a value isn’t provided.
    if (this.toolbarToggleDrag === '') {
      this.toolbarToggleDrag = 'reset'
    }

    // Initialize the draggable state for the outer toggle button.
    if (this.toolbarToggleDrag) {
      const draggableElement: HTMLElement | null = this.shadowRoot?.querySelector('.outer-toggle') ?? null
      const dragHandle: HTMLElement | null = draggableElement?.querySelector('.drag-handle') ?? null

      if (draggableElement && dragHandle) {
        this._outerToggleDraggableState = {
          eventToCoordinates(event: PointerEvent) {
            return { x: event.clientX, y: event.clientY }
          },
          dragging: null,
          _pos: { x: 0, y: 0 },
          get pos() {
            return this._pos
          },
          set pos(p) {
            this._pos = p
            draggableElement.style.transform = `translate(${this._pos.x}px,${this._pos.y}px)`
          },
        }

        makeDraggable(this._outerToggleDraggableState, dragHandle)
      }
    }
  }

  render() {
    const adminBarClasses = {
      'admin-bar': true,
      'glass-surface': true,
    }

    const environmentContent = this.environmentDescription ? html`<p>${this.environmentDescription}</p>` : nothing

    const greetingInnerContent = html`<div data-testid="greeting-content" class="greeting-content">
      ${this.avatarSrc
        ? html`<img alt="${this.avatarAlt}" src="${this.avatarSrc}" width="25px" height="25px" part="avatar" />`
        : nothing}
      <span><slot name="greeting">${this.greetingText ?? editIcon}</slot></span>
    </div>`

    const greetingContent = this._hasGreetingPopoverSlot
      ? html`
          <admin-bar-button
            class="greeting"
            button-aria-label="${this.greetingButtonAriaLabel ?? nothing}"
            greeting-button
          >
            ${greetingInnerContent}
            <div slot="popover">
              <slot
                data-testid="greeting-popover--slotted"
                name="greeting-popover"
                @slotchange="${this._handleGreetingPopoverSlotchange}"
              ></slot>
            </div>
          </admin-bar-button>
        `
      : html`<div class="greeting">
          ${greetingInnerContent}<slot
            data-testid="greeting-popover--empty"
            name="greeting-popover"
            @slotchange="${this._handleGreetingPopoverSlotchange}"
          ></slot>
        </div>`

    const logoutContent = this.showLogout
      ? html`<slot name="logout"
          ><admin-bar-button
            logout-button
            button-href="${this.logoutHref}"
            label-text="${this.logoutLabel}"
          ></admin-bar-button
        ></slot>`
      : nothing

    return html`
      <admin-bar-surface class="outer-toggle" data-testid="outer-toggle">
        <div>
          <admin-bar-button @click="${() => this._toggleVerticalAdminBar('toolbar')}"
            ><p>${this.toolbarToggleOuterDescription}</p>
            <slot name="outer-toggle">${greetingInnerContent}</slot></admin-bar-button
          >
          <div class="drag-handle" data-testid="drag-handle">
            ${moveIcon}
            <p>${this.toolbarToggleDragHandleDescription}</p>
          </div>
        </div>
      </admin-bar-surface>

      <admin-bar-surface
        class="${classMap(adminBarClasses)}"
        progress-value="${this.progressValue}"
        part="toolbar"
        data-testid="toolbar"
      >
        <div>
          <div data-testid="environment" class="environment">${environmentContent}</div>
          ${this.showGreeting ? greetingContent : html`<div class="greeting"></div>`}
          <div class="buttons">
            <div class="buttons-content" part="buttons"><slot></slot></div>
          </div>
          <div class="logout">${logoutContent}</div>
          <admin-bar-button
            class="inner-toggle"
            data-testid="inner-toggle"
            @click="${() => this._toggleVerticalAdminBar('button')}"
            ><p>${this.toolbarToggleInnerDescription}</p>
            <slot name="inner-toggle">${collapseIcon}</slot></admin-bar-button
          >
        </div>
      </admin-bar-surface>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admin-bar': AdminBar
  }
}
