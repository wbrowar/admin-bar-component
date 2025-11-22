import { AdminBar, AdminBarBuilder, AdminBarButton, AdminBarCheckbox, AdminBarText } from '../lib/main.ts'

/**
 * Admin Bar Components
 */
export type TextDlContent = [string | number, string | number][]
export interface TextTableContent {
  footers?: string[]
  headers?: string[]
  rows: (string | number)[][]
}

/**
 * Admin Bar Builder
 */
export interface BuilderOptions {
  /* Classes to add to the `<admin-bar>` element. */
  adminBarClass?: string
  /* The `id` attribute on the `<admin-bar>` element. */
  adminBarId?: string
  /* CSS styles to add to the `<admin-bar>` element. */
  adminBarStyle?: Record<string, string>
}
export interface BuilderAdminBar {
  /* An array of properties used to build `<admin-bar-button>` and `<admin-bar-text>` elements. */
  buttons?: BuilderAdminBarSubComponent[]
  /* Options for the environment indicator that lets the user know they are on development or staging environments. */
  environment?: {
    /* Creates a `<admin-bar-text>` element that displays a badge for the current environment. */
    badge?: string
    /* Sets visually-hidden text that explains the reason why the environment warning is displayed. */
    description?: string
    /* Enables or disables the environment indicator. */
    enable: boolean
  }
  /* Options for the greeting area that confirms the logged-in user and welcomes them. */
  greeting?: {
    /* Sets the `alt` attribute for the logged-in user’s avatar. */
    avatarAlt?: string
    /* Sets the `src` attribute for the logged-in user’s avatar. */
    avatarSrc?: string
    /* Sets an ARIA label on the button that toggles the `greeting-popover` content. */
    buttonAriaLabel?: string
    /* Enables or disables the greeting text and avatar. */
    enable: boolean
    /* A string of text to display next to the logged-in user’s avatar. */
    text?: string
  }
  /* Options for the default logout button. */
  logout?: {
    /* Enables or disables the logout button. */
    enable: boolean
    /* The URL used to log the user out of the website. */
    href?: string
    /* The label of the logout button. */
    label?: string
  }
}
export interface BuilderAdminBarButton {
  /* Sets the `class` attribute on the `<admin-bar-button>` element. */
  class?: string
  /* Add an aria-label to the `button` or `a` element. */
  buttonAriaLabel?: string
  /* Turns the button into an `a` element and sets this as the `href` attribute. */
  buttonHref?: string
  /* An SVG string that is added in the `before-label` slot. */
  icon?: string
  /* The text of the button label. */
  labelText?: string
  /* Creates an onclick event listener that triggers this callback. This will pass the event into the callback. */
  onclick?: Function
  /* Turns this button into a popover trigger that displays the `<admin-bar-button>` and `<admin-bar-text>` children passed in. */
  popover?: BuilderAdminBarSubComponent[]
  /* Sets the `style` attribute on the `<admin-bar-button>` element. */
  style?: Record<string, string>
  /* Used to distinguish that these properties are for a `<admin-bar-button>` element. */
  type: 'button'
}
export interface BuilderAdminBarCheckbox {
  /* Sets the `class` attribute on the `<admin-bar-button>` element. */
  class?: string
  /* Add an aria-label to the `input` element. */
  inputAriaLabel?: string
  /* The `name` attribute of the checkbox. */
  inputName?: string
  /* Setting this to `true` will add the `switch` attribute to the checkbox element. */
  inputSwitch?: boolean
  /* Sets the value of the checkbox. */
  inputChecked?: boolean
  /* Disables the checkbox. */
  inputDisabled?: boolean
  /* Sets the position for the label in relation to the checkbox. Accepts: 'after', 'before' */
  labelPosition?: 'after' | 'before'
  /* The label text content for the checkbox. */
  labelText?: string
  /* Sets the `style` attribute on the `<admin-bar-button>` element. */
  style?: Record<string, string>
  /* Used to distinguish that these properties are for a `<admin-bar-button>` element. */
  type: 'checkbox'
}
export interface BuilderAdminBarText {
  /* Sets the `class` attribute on the `<admin-bar-text>` element. */
  class?: string
  /* Sets the badge text. */
  badgeContent?: string
  /* Moves the badge before or after the text. */
  badgePosition?: 'after' | 'before'
  /* Sets a definition list in place of the `textContent` text. If this is an object it will be converted to a string. If this is a string it will be passed through as-is. */
  dlContent?: TextDlContent
  /* Allows text to wrap when using `textContent`. */
  multiLine?: boolean
  /* Sets the `style` attribute on the `<admin-bar-text>` element. */
  style?: Record<string, string>
  /* Sets a definition list in place of the `textContent` text. If this is an object it will be converted to a string. If this is a string it will be passed through as-is. */
  tableContent?: TextTableContent
  /* Sets the text on the `<admin-bar-text>` element. */
  textContent?: string
  /* Used to distinguish that these properties are for a `<admin-bar-text>` element. */
  type: 'text'
}

export type BuilderAdminBarSubComponent = BuilderAdminBarButton | BuilderAdminBarCheckbox | BuilderAdminBarText

export { AdminBar, AdminBarButton, AdminBarBuilder, AdminBarCheckbox, AdminBarText }
