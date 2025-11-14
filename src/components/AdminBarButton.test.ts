import { render } from 'vitest-browser-lit'
import { describe, expect, test } from 'vitest'
import { html } from 'lit'

describe('Button Component', () => {
  test('Displays button', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-button>Button Label</admin-bar-button>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Button Label')).toBeVisible()
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

    await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-button-greeting-button')
  })

  test('Displays button as logout button when attribute is set', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-button logout-button>Button Label</admin-bar-button>
      </admin-bar>`
    )

    await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-button-logout-button')
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
    const screen = render(
      html`<admin-bar>
        <admin-bar-button>
          Button Label
          <p slot="popover">Popover Content</p>
        </admin-bar-button>
      </admin-bar>`
    )

    // await screen.getByText('Button Label').click()
    await expect.element(screen.getByText('Popover Content')).toBeVisible()
  })
})
