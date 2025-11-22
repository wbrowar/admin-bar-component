import type { BuilderAdminBar, BuilderAdminBarButton, BuilderAdminBarText, BuilderOptions } from '../../types'

export class AdminBarBuilder {
  // The element where the `<admin-bar>` is rendered. It will replace the contents of the container element.
  #container: HTMLElement | null = null

  // Data formatted for render
  #formattedData: BuilderAdminBar | null = null

  // Options that add attributes to the `<admin-bar>` element.
  #options: BuilderOptions = {}

  constructor({
    autoRender = true,
    container = null,
    data,
    options = {},
  }: {
    autoRender?: boolean
    container?: HTMLElement | null
    data?: BuilderAdminBar
    options?: BuilderOptions
  } = {}) {
    if (container) {
      this.#container = container
    }
    if (data) {
      this._formatAdminBarData(data)
    }
    if (options) {
      this.#options = options
    }

    if (autoRender) {
      const adminBarElement = this.getAdminBar()
      if (adminBarElement) {
        this.addAdminBar(adminBarElement)
      }
    }
  }

  addAdminBar(adminBarElement: HTMLElement | null = null) {
    const newAdminBarElement = adminBarElement ?? this.getAdminBar()
    if (newAdminBarElement) {
      this.#container?.replaceChildren(newAdminBarElement)
    }
  }

  /**
   * Renders `<admin-bar>` in container element
   */
  getAdminBar() {
    if (!this.#formattedData) {
      return null
    }

    const { adminBarClass, adminBarId, adminBarStyle }: BuilderOptions = this.#options

    // Create `<admin-bar>` element
    const adminBarElement = document.createElement('admin-bar')

    // Add `id` attribute to `<admin-bar>`.
    adminBarElement.setAttribute('id', adminBarId ?? 'admin-bar')

    // Add `class` attribute to `<admin-bar>`.
    if (adminBarClass) {
      const classes = adminBarClass.split(' ')
      classes.forEach((classString) => {
        adminBarElement.classList.add(classString)
      })
    }

    // Add `style` attribute to `<admin-bar>`.
    if (adminBarStyle) {
      this._addStylesToElement(adminBarStyle, adminBarElement)
    }

    // Add buttons to default slot
    this.#formattedData?.buttons?.forEach((button) => {
      if (button.type === 'button') {
        adminBarElement.append(this._addChildButton(button))
      } else if (button.type === 'text') {
        adminBarElement.append(this._addChildText(button))
      }
    })

    // Add spacer element to default slot
    const spacerSpan = document.createElement('span')
    spacerSpan.style.flexGrow = '1'
    adminBarElement.append(spacerSpan)

    // Add environment warning and label
    if (this.#formattedData?.environment) {
      adminBarElement.setAttribute('show-environment', '')
      adminBarElement.append(
        this._addChildText({
          badgeContent: this.#formattedData.environment.badge,
          style: {
            '--admin-bar-text-label-color-bg': 'var(--admin-bar-environment-bg-color)',
          },
          type: 'text',
        })
      )
    }

    // Add greeting text and user avatar
    if (this.#formattedData?.greeting) {
      adminBarElement.setAttribute('show-greeting', '')
      if (this.#formattedData.greeting.avatarAlt) {
        adminBarElement.setAttribute('avatar-alt', this.#formattedData.greeting.avatarAlt)
      }
      if (this.#formattedData.greeting.avatarSrc) {
        adminBarElement.setAttribute('avatar-src', this.#formattedData.greeting.avatarSrc)
      }
      if (this.#formattedData.greeting.text) {
        adminBarElement.setAttribute('greeting-text', this.#formattedData.greeting.text)
      }
    }

    // Add logout button
    if (this.#formattedData?.logout) {
      adminBarElement.setAttribute('show-logout', '')
      if (this.#formattedData.logout.href) {
        adminBarElement.setAttribute('logout-href', this.#formattedData.logout.href)
      }
      if (this.#formattedData.logout.label) {
        adminBarElement.setAttribute('logout-label', this.#formattedData.logout.label)
      }
    }

    // If valid, return formatted data
    return adminBarElement ?? null
  }

  setOptions(options: BuilderOptions) {
    this.#options = options
  }

  setContainer(element: HTMLElement) {
    this.#container = element
  }

  setData(data: BuilderAdminBar) {
    this._formatAdminBarData(data)
  }

  /**
   * Creates an `<admin-bar-button>` element.
   *
   * @private
   */
  private _addChildButton({
    class: buttonClass,
    buttonHref,
    icon,
    labelText,
    onclick,
    popover,
    style,
  }: BuilderAdminBarButton) {
    const buttonElement = document.createElement('admin-bar-button')

    if (buttonClass) {
      const classes = buttonClass.split(' ')
      classes.forEach((classString) => {
        buttonElement.classList.add(classString)
      })
    }
    if (icon) {
      const parser = new DOMParser()
      const svg = parser.parseFromString(icon, 'image/svg+xml')
      const svgElement = svg.documentElement
      if (this._validateSvg(svgElement)) {
        const beforeLabelElement = document.createElement('span')
        beforeLabelElement.setAttribute('slot', 'before-label')
        beforeLabelElement.append(svgElement)
        buttonElement.append(beforeLabelElement)
      }
    }
    if (labelText) {
      buttonElement.setAttribute('label-text', labelText)
    }
    if (onclick) {
      buttonElement.addEventListener('click', (e) => onclick(e))
    } else if (popover?.length) {
      const popoverSlot = document.createElement('span')
      popoverSlot.setAttribute('slot', 'popover')
      popover?.forEach((button) => {
        if (button.type === 'button') {
          popoverSlot.append(this._addChildButton(button))
        } else if (button.type === 'text') {
          popoverSlot.append(this._addChildText(button))
        }
      })
      buttonElement.append(popoverSlot)
    } else if (buttonHref) {
      buttonElement.setAttribute('button-href', buttonHref)
    }
    if (style) {
      const cssProperties: Record<string, string> = {}
      // If CSS Custom Propery, set it right away
      // If regular CSS property, add it to object and add it later
      Object.keys(style).forEach((key: string) => {
        if (key.startsWith('--')) {
          buttonElement.style.setProperty(key, style[key])
        } else {
          cssProperties[key] = style[key]
        }
      })
      Object.assign(buttonElement.style, cssProperties)
    }

    return buttonElement
  }

  /**
   * Creates an `<admin-bar-text>` element.
   *
   * @param badgeContent
   * @param badgePosition
   * @param style
   * @param textContent
   * @private
   */
  private _addChildText({
    class: textClass,
    dlContent,
    badgeContent,
    badgePosition,
    multiLine,
    style,
    tableContent,
    textContent,
  }: BuilderAdminBarText) {
    const textElement = document.createElement('admin-bar-text')

    if (textClass) {
      const classes = textClass.split(' ')
      classes.forEach((classString) => {
        textElement.classList.add(classString)
      })
    }
    if (badgeContent) {
      textElement.setAttribute('badge-content', badgeContent)
    }
    if (badgePosition) {
      textElement.setAttribute('badge-position', badgePosition)
    }
    if (multiLine) {
      textElement.setAttribute('multi-line', '')
    }
    if (style) {
      this._addStylesToElement(style, textElement)
    }
    if (dlContent) {
      textElement.setAttribute('dl-content', typeof dlContent === 'string' ? dlContent : JSON.stringify(dlContent))
    } else if (tableContent) {
      textElement.setAttribute(
        'table-content',
        typeof tableContent === 'string' ? tableContent : JSON.stringify(tableContent)
      )
    } else if (textContent) {
      textElement.setAttribute('text-content', textContent)
    }

    return textElement
  }

  private _addStylesToElement(styles: Record<string, string>, element: HTMLElement) {
    const cssProperties: Record<string, string> = {}
    // If CSS Custom Property, set it right away
    // If regular CSS property, add it to object and add it later
    Object.keys(styles).forEach((key: string) => {
      if (key.startsWith('--')) {
        element.style.setProperty(key, styles[key])
      } else {
        cssProperties[key] = styles[key]
      }
    })
    return Object.assign(element.style, cssProperties)
  }

  /**
   * Prepares and sanitizes data to be rendered as an `<admin-bar>`.
   *
   * @param data
   * @private
   */
  private _formatAdminBarData({ buttons, environment, greeting, logout }: BuilderAdminBar) {
    let isValid = false
    const formattedData: BuilderAdminBar = {}
    this.#formattedData = null

    if (buttons?.length) {
      const childIsValid = (button: BuilderAdminBarButton | BuilderAdminBarText) => {
        let isValidChild = false
        const childIsValidButton =
          button.type === 'button' &&
          (button.onclick !== undefined || button.popover?.length !== undefined || button.buttonHref !== undefined)
        const childIsValidText =
          button.type === 'text' &&
          (button.dlContent !== undefined || button.tableContent !== undefined || button.textContent !== undefined)

        isValidChild = childIsValidButton || childIsValidText

        if (button.type === 'button' && button.popover?.length) {
          button.popover.forEach((popoverChild) => {
            isValidChild = isValidChild && childIsValid(popoverChild)
          })
        }

        return isValidChild
      }

      const validButtons: (BuilderAdminBarButton | BuilderAdminBarText)[] = []
      buttons.forEach((button) => {
        if (childIsValid(button)) {
          validButtons.push(button)
        }
      })

      if (validButtons.length) {
        isValid = true
        formattedData.buttons = validButtons
      }
    }

    // Verify greeting properties
    if (environment?.enable) {
      formattedData.environment = {
        enable: environment.enable,
        label: environment.label ?? undefined,
      }
    }

    // Verify greeting properties
    if (greeting?.enable) {
      formattedData.greeting = {
        avatarAlt: greeting.avatarAlt ?? undefined,
        avatarSrc: greeting.avatarSrc ?? undefined,
        enable: greeting.enable,
        text: greeting.text ?? undefined,
      }
    }

    // Verify logout properties
    if (logout?.enable) {
      formattedData.logout = {
        enable: logout.enable,
        href: logout.href ?? undefined,
        label: logout.label ?? undefined,
      }
    }

    if (isValid) {
      this.#formattedData = formattedData
    }
  }

  /**
   * Ensures SVG can be rendered and that it doesn’t contain any malicious code.
   *
   * @param svg
   * @private
   */
  private _validateSvg(svg: HTMLElement) {
    let isValid = true
    const names = svg.getElementsByTagName('*')
    for (let i = 0; i < names.length; i++) {
      if (['parsererror', 'script'].includes(names[i].tagName)) {
        isValid = false
      }
    }
    return isValid
  }
}
