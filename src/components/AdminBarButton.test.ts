import { render } from 'vitest-browser-lit'
import { describe, expect, test } from 'vitest'
import { html } from 'lit'
import { page } from 'vitest/browser'

describe('Button Component', () => {
  test('Displays button', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-button>Button Label</admin-bar-button>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Button Label')).toBeVisible()
  })

  test('Includes ARIA label when attribute is set', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-button button-aria-label="test">Button Label</admin-bar-button>
      </admin-bar>`
    )

    await expect.element(screen.getByRole('button')).toBeVisible()
    expect(screen.getByRole('button').element().ariaLabel).toEqual('test')
  })

  test('Displays button label when attribute is set', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-button label-text="Button Label"></admin-bar-button>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Button Label')).toBeVisible()
  })

  test('Displays button as greeting button when attribute is set', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-button greeting-button>Button Label</admin-bar-button>
      </admin-bar>`
    )

    await screen.getByText('Button Label').hover()

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-button-greeting-button')
    }
  })

  test('Displays button as logout button when attribute is set', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-button logout-button>Button Label</admin-bar-button>
      </admin-bar>`
    )

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-button-logout-button')
    }
  })
})

describe('Button Actions', () => {
  test('Button is a link', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-button button-href="#">Button Label</admin-bar-button>
      </admin-bar>`
    )

    await expect.element(screen.getByRole('link')).toBeVisible()
  })

  test('Button click action works', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-button onclick="document.getElementById('tester').innerText = '1 click'"
          >Button Label</admin-bar-button
        >
        <p id="tester">0 clicks</p>
      </admin-bar>`
    )

    await screen.getByText('Button Label').click()
    await expect.element(screen.getByText('1 click')).toBeVisible()
  })

  test('Button click opens popover', async () => {
    await page.viewport(500, 500)

    const screen = render(
      html`<admin-bar>
        <admin-bar-button>
          Button Label
          <p slot="popover">Popover Content</p>
        </admin-bar-button>
      </admin-bar>`
    )

    await screen.getByText('Button Label').click()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-button-popover')
    }
  })

  test('Button click opens one popover at a time', async () => {
    await page.viewport(500, 500)

    const screen = render(
      html`<admin-bar>
        <admin-bar-button>
          Button One
          <p slot="popover">Popover Content</p>
        </admin-bar-button>
        <admin-bar-button>
          Button Two
          <p slot="popover">Popover Content</p>
        </admin-bar-button>
      </admin-bar>`
    )

    await screen.getByText('Button One').click()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-button-popover-button-one')
    }

    await screen.getByText('Button Two').click()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-button-popover-button-two')
    }
  })
})

describe('CSS Parts (pseudo-elements)', () => {
  test('`popover` part is stylable', async () => {
    const screen = render(html`
      <admin-bar>
        <admin-bar-button>
          Button Label
          <p slot="popover">Popover Content</p>
        </admin-bar-button>
      </admin-bar>
      <style>
        admin-bar-button::part(popover) {
          background-color: rebeccapurple;
        }
      </style>
    `)

    await screen.getByText('Button Label').click()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-button-css-part-popover')
    }
  })
})

describe('Keyboard Navigation', () => {
  test.todo('Button shows focus style')
  test.todo('Popover is shown when button is clicked via keyboard')
  test.todo('Popover is shown when arrow keys are pressed')
  test.todo('Arrow keys select the right item when popover is open')
  test.todo('Arrow keys select the right item when greeting popover is open')
})
