import { describe, expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-lit'
import { html, nothing } from 'lit'
import { fpoImageSrc } from '../vitest/helpers.ts'

describe('Admin Bar general styles', () => {
  test.each([
    {
      name: '--admin-bar-avatar-size',
      css: `admin-bar { --admin-bar-avatar-size: 50px; }`,
      options: [],
    },
    {
      name: '--admin-bar-bg',
      css: `admin-bar { --admin-bar-bg: linear-gradient(to bottom, rebeccapurple, aliceblue); }`,
      options: [],
    },
    {
      name: '--admin-bar-bg-color',
      css: `admin-bar { --admin-bar-bg-color: rebeccapurple; }`,
      options: [],
    },
    {
      name: '--admin-bar-bg-filter',
      css: `
        body { background-image: linear-gradient(45deg, #428ecc 25%, #4b4969 25%, #4b4969 50%, #428ecc 50%, #428ecc 75%,
        #4b4969 75%, #4b4969 100%); background-size: 56.57px 56.57px; }
        admin-bar { --admin-bar-bg-filter: saturate(.2); }
      `,
      options: [],
    },
    {
      name: '--admin-bar-block-padding',
      css: `admin-bar { --admin-bar-block-padding: 30px; }`,
      options: ['click-popover'],
    },
    {
      name: '--admin-bar-border-radius',
      css: `admin-bar { --admin-bar-border-radius: calc(var(--admin-bar-height) / 2); }`,
      options: [],
    },
    {
      name: '--admin-bar-color-highlight',
      css: `admin-bar { --admin-bar-color-highlight: oklch(0.858 0.289 142.119); }`,
      options: ['hover-button'],
    },
    {
      name: '--admin-bar-color-highlight-logout',
      css: `admin-bar { --admin-bar-color-highlight-logout: rebeccapurple; }`,
      options: ['hover-logout'],
    },
    {
      name: '--admin-bar-color-text-logout',
      css: `admin-bar { --admin-bar-color-text-logout: oklch(0.823 0.137 217.279 / 0.9); }`,
      options: ['hover-logout'],
    },
    {
      name: '--admin-bar-environment-bg',
      css: `admin-bar { --admin-bar-environment-bg: oklch(0.823 0.137 217.279 / 0.9); }`,
      options: [],
    },
    {
      name: '--admin-bar-environment-bg-color',
      css: `admin-bar { --admin-bar-environment-bg-color: oklch(0.823 0.137 217.279 / 0.9); }`,
      options: [],
    },
    {
      name: '--admin-bar-environment-height',
      css: `admin-bar { --admin-bar-environment-height: 10px; }`,
      options: [],
    },
    {
      name: '--admin-bar-font-size',
      css: `admin-bar { --admin-bar-font-size: 1.3rem; }`,
      options: [],
    },
    {
      name: '--admin-bar-font-stack',
      css: `admin-bar { --admin-bar-font-stack: monospace; }`,
      options: [],
    },
    {
      name: '--admin-bar-height',
      css: `admin-bar { --admin-bar-height: 60px; }`,
      options: ['click-popover'],
    },
    {
      name: '--admin-bar-inline-padding',
      css: `admin-bar { --admin-bar-inline-padding: 20px; }`,
      options: [],
    },
    {
      name: '--admin-bar-inset-size',
      css: `admin-bar { --admin-bar-inset-size: 20px; }`,
      options: [],
    },
    {
      name: '--admin-bar-shadow-elements',
      css: `admin-bar { --admin-bar-shadow-elements: 0 0 5px oklch(0.823 0.137 217.279 / 0.9); }`,
      options: [],
    },
    {
      name: '--admin-bar-progress-color',
      css: `admin-bar { --admin-bar-progress-color: oklch(0.823 0.137 217.279 / 0.9); }`,
      options: ['show-progress'],
    },
    {
      name: '--admin-bar-progress-color-error',
      css: `admin-bar { --admin-bar-progress-color-error: oklch(0.732 0.186 52.985 / 0.7); }`,
      options: ['show-progress-error'],
    },
    {
      name: '--admin-bar-progress-color-success',
      css: `admin-bar { --admin-bar-progress-color-success: oklch(0.497 0.295 282.78 / 0.7); }`,
      options: ['show-progress-success'],
    },
    {
      name: '--admin-bar-progress-height',
      css: `admin-bar { --admin-bar-progress-height: 6px; }`,
      options: ['show-progress'],
    },
    {
      name: '--admin-bar-button-color-bg',
      css: `admin-bar { --admin-bar-button-color-bg: oklch(0.823 0.137 217.279 / 0.9); }`,
      options: [],
    },
    {
      name: '--admin-bar-button-color-bg-hover',
      css: `admin-bar { --admin-bar-button-color-bg-hover: oklch(0.823 0.137 217.279 / 0.9); }`,
      options: ['hover-button'],
    },
    {
      name: '--admin-bar-button-color-text',
      css: `admin-bar { --admin-bar-button-color-text: oklch(0.823 0.137 217.279 / 0.9); }`,
      options: [],
    },
    {
      name: '--admin-bar-button-popover-color-text',
      css: `admin-bar { --admin-bar-button-popover-color-text: oklch(0.823 0.137 217.279 / 0.9); }`,
      options: ['click-popover'],
    },
    {
      name: '--admin-bar-button-popover-bg',
      css: `admin-bar { --admin-bar-button-popover-bg: oklch(0.823 0.137 217.279 / 0.9); }`,
      options: ['click-popover'],
    },
    {
      name: '--admin-bar-button-popover-border-radius',
      css: `admin-bar { --admin-bar-button-popover-border-radius: 20px; }`,
      options: ['click-popover'],
    },
    {
      name: '--admin-bar-text-padding',
      css: `admin-bar { --admin-bar-text-padding: 20px; }`,
      options: [],
    },
    {
      name: '--admin-bar-text-label-color-bg',
      css: `admin-bar { --admin-bar-text-label-color-bg: oklch(0.823 0.137 217.279 / 0.9); }`,
      options: [],
    },
    {
      name: '--admin-bar-text-label-color-text',
      css: `admin-bar { --admin-bar-text-label-color-text: oklch(0.823 0.137 217.279 / 0.9); }`,
      options: [],
    },
  ])('$name', async ({ name, css, options }) => {
    await page.viewport(1000, 500)

    let progressValue = ''
    if (options.includes('show-progress')) {
      progressValue = '50'
    } else if (options.includes('show-progress-error')) {
      progressValue = '-1'
    } else if (options.includes('show-progress-success')) {
      progressValue = '100'
    }

    const screen = render(html`
      <admin-bar
        class="sticky"
        show-environment
        show-greeting
        show-logout
        avatar-alt="avatar"
        avatar-src="${fpoImageSrc}"
        greeting-text="Hi, Author"
        logout-label="Logout"
        logout-url="#"
        progress="${progressValue !== '' ? progressValue : nothing}"
      >
        <admin-bar-button>
          Button Label
          <p slot="popover">Popover Content</p>
        </admin-bar-button>
        <admin-bar-checkbox>Checkbox Label</admin-bar-checkbox>
        <admin-bar-text badge-content="67">Text Label</admin-bar-text>
      </admin-bar>
      <style>
        ${css} admin-bar {
          --admin-bar-transition-duration: 0s;
        }
        *,
        *::before,
        *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      </style>
      <div style="position: fixed; inset-block-end: 0; width: 20px; aspect-ratio: 1;" data-testid="reset-button"></div>
    `)

    if (options.includes('click-popover')) {
      await userEvent.click(screen.getByText('Button Label'))
    }
    if (options.includes('hover-button')) {
      await userEvent.hover(screen.getByText('Button Label'))
    } else if (options.includes('hover-logout')) {
      await userEvent.hover(screen.getByText('Logout'))
    }

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot(`css-variable${name}`)
    }

    await userEvent.click(screen.getByTestId('reset-button'))
    await userEvent.hover(screen.getByTestId('reset-button'))
  })
})

describe('Admin Bar classes', () => {
  test('Displays text in correct reading order when setting `rtl` class', async () => {
    const screen = render(
      html`<admin-bar
        class="rtl"
        show-environment
        show-greeting
        show-logout
        avatar-alt="avatar"
        avatar-src="${fpoImageSrc}"
        greeting-text="Hi, Author"
        logout-label="Logout"
        logout-url="#"
        progress="50"
      >
        <admin-bar-button>
          Button Label
          <p slot="popover">Popover Content</p>
        </admin-bar-button>
        <admin-bar-checkbox>Checkbox Label</admin-bar-checkbox>
        <admin-bar-text badge-content="67">Text Label</admin-bar-text>
      </admin-bar>`
    )

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-class-rtl')
    }
  })

  test('Displays toolbar is in the correct position when setting `fixed` class', async () => {
    await page.viewport(1000, 500)

    const screen = render(
      html`<div style="aspect-ratio: 1; width: 400px; background-color: deeppink;"></div>
        <admin-bar
          class="fixed"
          show-environment
          show-greeting
          show-logout
          avatar-alt="avatar"
          avatar-src="${fpoImageSrc}"
          greeting-text="Hi, Author"
          logout-label="Logout"
          logout-url="#"
          progress="50"
        >
          <admin-bar-button>
            Button Label
            <p slot="popover">Popover Content</p>
          </admin-bar-button>
          <admin-bar-checkbox>Checkbox Label</admin-bar-checkbox>
          <admin-bar-text badge-content="67">Text Label</admin-bar-text>
        </admin-bar>
        <style>
          body {
            background-image: linear-gradient(
              45deg,
              #428ecc 25%,
              #4b4969 25%,
              #4b4969 50%,
              #428ecc 50%,
              #428ecc 75%,
              #4b4969 75%,
              #4b4969 100%
            );
            background-size: 56.57px 56.57px;
          }
        </style>`
    )

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-class-fixed')
    }
  })

  test('Displays toolbar is in the correct position when setting `fixed bottom` class', async () => {
    await page.viewport(1000, 500)

    const screen = render(
      html`<div style="aspect-ratio: 1; width: 400px; background-color: deeppink;"></div>
        <admin-bar
          class="fixed bottom"
          show-environment
          show-greeting
          show-logout
          avatar-alt="avatar"
          avatar-src="${fpoImageSrc}"
          greeting-text="Hi, Author"
          logout-label="Logout"
          logout-url="#"
          progress="50"
        >
          <admin-bar-button>
            Button Label
            <p slot="popover">Popover Content</p>
          </admin-bar-button>
          <admin-bar-checkbox>Checkbox Label</admin-bar-checkbox>
          <admin-bar-text badge-content="67">Text Label</admin-bar-text>
        </admin-bar>
        <style>
          body {
            background-image: linear-gradient(
              45deg,
              #428ecc 25%,
              #4b4969 25%,
              #4b4969 50%,
              #428ecc 50%,
              #428ecc 75%,
              #4b4969 75%,
              #4b4969 100%
            );
            background-size: 56.57px 56.57px;
          }
        </style>`
    )

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-class-fixed-bottom')
    }
  })

  test('Displays toolbar is in the correct position when setting `sticky` class', async () => {
    await page.viewport(1000, 500)

    const screen = render(
      html`<admin-bar
          class="sticky"
          show-environment
          show-greeting
          show-logout
          avatar-alt="avatar"
          avatar-src="${fpoImageSrc}"
          greeting-text="Hi, Author"
          logout-label="Logout"
          logout-url="#"
          progress="50"
        >
          <admin-bar-button>
            Button Label
            <p slot="popover">Popover Content</p>
          </admin-bar-button>
          <admin-bar-checkbox>Checkbox Label</admin-bar-checkbox>
          <admin-bar-text badge-content="67">Text Label</admin-bar-text>
        </admin-bar>
        <div style="aspect-ratio: 1; width: 400px; background-color: deeppink;"></div>
        <style>
          body {
            background-image: linear-gradient(
              45deg,
              #428ecc 25%,
              #4b4969 25%,
              #4b4969 50%,
              #428ecc 50%,
              #428ecc 75%,
              #4b4969 75%,
              #4b4969 100%
            );
            background-size: 56.57px 56.57px;
          }
        </style>`
    )

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-class-sticky')
    }
  })

  test('Displays toolbar is in the correct position when setting `sticky bottom` class', async () => {
    await page.viewport(1000, 500)

    const screen = render(
      html`<div style="aspect-ratio: 1; width: 400px; background-color: deeppink;"></div>
        <admin-bar
          class="sticky bottom"
          show-environment
          show-greeting
          show-logout
          avatar-alt="avatar"
          avatar-src="${fpoImageSrc}"
          greeting-text="Hi, Author"
          logout-label="Logout"
          logout-url="#"
          progress="50"
        >
          <admin-bar-button>
            Button Label
            <p slot="popover">Popover Content</p>
          </admin-bar-button>
          <admin-bar-checkbox>Checkbox Label</admin-bar-checkbox>
          <admin-bar-text label-content="67">Text Label</admin-bar-text>
        </admin-bar>
        <style>
          body {
            background-image: linear-gradient(
              45deg,
              #428ecc 25%,
              #4b4969 25%,
              #4b4969 50%,
              #428ecc 50%,
              #428ecc 75%,
              #4b4969 75%,
              #4b4969 100%
            );
            background-size: 56.57px 56.57px;
          }
        </style>`
    )

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-class-sticky-bottom')
    }
  })
})
