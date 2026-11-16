import { render } from 'vitest-browser-lit'
import { describe, expect, test } from 'vitest'
import { html } from 'lit'
import { page } from 'vitest/browser'

describe('Text Component', () => {
  test('Display slot content', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-text>Hello, World!</admin-bar-text>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Hello, World!')).toBeVisible()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-text')
    }
  })

  test('Display slotted elements as flex content', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-text><span>Hello</span><span>🌎</span></admin-bar-text>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Hello')).toBeVisible()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-text-slot-flex')
    }
  })

  test('Display text content', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-text text-content="Hello, World!"></admin-bar-text>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Hello, World!')).toBeVisible()
  })

  test('Display multi-line text content', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-button>
          <admin-bar-text multi-line style="max-width: 8ch;" slot="popover">multiple words</admin-bar-text>
          Button Label
        </admin-bar-button>
      </admin-bar>`
    )

    await screen.getByText('Button Label').click()
    await expect.element(screen.getByText('multiple words')).toBeVisible()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-text-multi-line')
    }
  })
})

describe('Badges', () => {
  test('Display badge content', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-text badge-content="Badge">Hello, World!</admin-bar-text>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Badge')).toBeVisible()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-text-badge-content')
    }
  })

  test('Display badge before text content', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-text badge-content="Badge" badge-position="before">Hello, World!</admin-bar-text>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Badge')).toBeVisible()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot(
        'admin-bar-text-badge-position-before'
      )
    }
  })
})

describe('Definition List', () => {
  test('Display definition list in popover', async () => {
    await page.viewport(500, 500)

    const screen = render(
      html`<admin-bar>
        <admin-bar-button>
          <admin-bar-text
            dl-content='[["Line 1 title", "Line 1 content"], ["Line 2 title", "Line 2 content"]]'
            slot="popover"
          ></admin-bar-text>
          Button Label
        </admin-bar-button>
      </admin-bar>`
    )

    await screen.getByText('Button Label').click()
    await expect.element(screen.getByText('Line 1 title')).toBeVisible()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-text-dl-content')
    }
  })
})

describe('CSS Parts (pseudo-elements)', () => {
  test('`dl` part is stylable', async () => {
    const screen = render(html`
      <admin-bar>
        <admin-bar-button>
          <admin-bar-text
            dl-content='[["Line 1 title", "Line 1 content"], ["Line 2 title", "Line 2 content"]]'
            slot="popover"
          ></admin-bar-text>
          Button Label
        </admin-bar-button>
      </admin-bar>
      <style>
        admin-bar-text::part(dl) {
          gap: 50px;
        }
      </style>
    `)

    await screen.getByText('Button Label').click()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-button-css-part-dl')
    }
  })
})
