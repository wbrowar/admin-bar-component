import { render } from 'vitest-browser-lit'
import { describe, expect, test } from 'vitest'
import { html } from 'lit'
import { page } from 'vitest/browser'
import { fpoImageSrc } from '../../vitest/helpers.ts'

describe('Toolbar Component', () => {
  test('Displays toolbar', async () => {
    const screen = render(html`<admin-bar></admin-bar>`)

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-blank')
    }
  })
})

describe('Greeting', () => {
  test('Displays greeting avatar and alt text', async () => {
    const screen = render(html`<admin-bar show-greeting avatar-alt="test" avatar-src="${fpoImageSrc}"></admin-bar>`)

    await expect.element(screen.getByAltText('test')).toBeVisible()
  })

  test('Displays text in `greeting` slot', async () => {
    const screen = render(
      html`<admin-bar show-greeting>
        <p slot="greeting">Greeting Text</p>
      </admin-bar>`
    )

    await page.viewport(800, 100)
    screen.baseElement.style.width = '700px'
    await expect.element(screen.getByText('Greeting Text')).toBeVisible()
  })

  test('Displays greeting avatar and text when Admin Bar is wide enough', async () => {
    const screen = render(
      html`<admin-bar show-greeting avatar-alt="test" avatar-src="${fpoImageSrc}" greeting-text="Test"></admin-bar>`
    )

    await page.viewport(800, 100)
    screen.baseElement.style.width = '700px'
    await expect.element(screen.getByText('Test')).toBeVisible()
    await expect.element(screen.getByAltText('test')).toBeVisible()
  })

  test('Greeting avatar and text are hidden when Admin Bar is not wide enough', async () => {
    const screen = render(
      html`<admin-bar show-greeting avatar-alt="test" avatar-src="${fpoImageSrc}" greeting-text="Test"></admin-bar>`
    )

    await page.viewport(800, 100)
    screen.baseElement.style.width = '699px'
    await expect.element(screen.getByText('Test')).not.toBeVisible()
    await expect.element(screen.getByAltText('test')).toBeVisible()
  })

  test('Greeting popover slot is displayed', async () => {
    const screen = render(html`
      <admin-bar show-greeting avatar-alt="test" avatar-src="${fpoImageSrc}">
        <span slot="greeting-popover">Greeting Popover</span>
      </admin-bar>
    `)

    await screen.getByAltText('test').click()
    await expect.element(screen.getByText('Greeting Popover')).toBeVisible()
  })
})

describe('Environment Warning', () => {
  test('Displays environment warning when attribute is set', async () => {
    const screen = render(html`<admin-bar></admin-bar>`)
    const adminBarElement = screen.baseElement.querySelector('admin-bar')!

    await expect.element(screen.getByTestId('admin-bar-environment')).not.toBeVisible()

    adminBarElement.setAttribute('show-environment', '')
    await expect.element(screen.getByTestId('admin-bar-environment')).toBeVisible()

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-environment')
    }
  })
})

describe('Logout Button', () => {
  test('Display logout button when attribute is set', async () => {
    const screen = render(html`<admin-bar show-logout logout-href="#" logout-label="Logout Button"></admin-bar>`)

    await expect.element(screen.getByText('Logout Button')).toBeVisible()
  })

  test('Displays element in `logout` slot', async () => {
    const screen = render(
      html`<admin-bar show-logout>
        <button slot="logout">Logout Button</button>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Logout Button')).toBeVisible()
  })
})

describe('Progress Bar', () => {
  test('Display progress bar at 50% when attribute is set', async () => {
    const screen = render(html`<admin-bar progress="50"></admin-bar>`)

    await expect.element(screen.getByTestId('admin-bar-surface-progress')).toBeVisible()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-progress')
    }
  })

  test('Display success progress bar when attribute is set to 100', async () => {
    const screen = render(html`<admin-bar progress="100"></admin-bar>`)

    await expect.element(screen.getByTestId('admin-bar-surface-progress')).toHaveStyle('--_progress-width: 100%;')
  })

  test('Display failure progress bar when attribute is set to -1', async () => {
    const screen = render(html`<admin-bar progress="-1"></admin-bar>`)

    await expect.element(screen.getByTestId('admin-bar-surface-progress')).toHaveStyle('--_progress-width: 100%;')
  })
})

describe('CSS Parts (pseudo-elements)', () => {
  test('`avatar` part is stylable', async () => {
    const screen = render(html`
      <admin-bar show-greeting avatar-src="${fpoImageSrc}"></admin-bar>
      <style>
        admin-bar::part(avatar) {
          border-radius: 3px;
        }
      </style>
    `)

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-css-part-avatar')
    }
  })

  test('`buttons` part is stylable', async () => {
    const screen = render(html`
      <admin-bar><admin-bar-text>Text Eelement</admin-bar-text></admin-bar>
      <style>
        admin-bar::part(buttons) {
          display: flex;
          background-color: rebeccapurple;
        }
      </style>
    `)

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-css-part-buttons')
    }
  })
})
