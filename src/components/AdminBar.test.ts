import { render } from 'vitest-browser-lit'
import { beforeEach, describe, expect, test } from 'vitest'
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

describe('Vertical Toolbar', () => {
  beforeEach(async () => {
    await page.viewport(350, 700)
  })

  test('Displays vertical toolbar on smaller screen', async () => {
    const screen = render(
      html`<admin-bar class="vertical" show-greeting show-logout>
        <admin-bar-text>Hello, World!</admin-bar-text>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Hello, World!')).toBeVisible()
  })

  test('Toolbar toggles between toolbar and toggle button', async () => {
    const screen = render(html`<admin-bar class="vertical" toolbar-toggle="toolbar"></admin-bar>`)

    await expect.element(screen.getByTestId('inner-toggle')).toBeVisible()
    await screen.getByTestId('inner-toggle').click()
    await expect.element(screen.getByTestId('outer-toggle')).toBeVisible()

    await expect.element(screen.getByTestId('outer-toggle')).toBeVisible()
    await screen.getByTestId('outer-toggle').click()
    await expect.element(screen.getByTestId('inner-toggle')).toBeVisible()
  })

  test('Toolbar automatically switches between toolbar and vertical toggle', async () => {
    const screen = render(
      html`<admin-bar class="vertical" auto-toggle-vertical>
        <admin-bar-text>Test</admin-bar-text>
      </admin-bar>`
    )

    await expect.element(screen.getByTestId('outer-toggle')).toBeVisible()
    await page.viewport(1000, 700)
    await expect.element(screen.getByText('Test')).toBeVisible()
    await page.viewport(350, 700)
    await expect.element(screen.getByTestId('outer-toggle')).toBeVisible()
    await screen.getByTestId('outer-toggle').click()
    await expect.element(screen.getByTestId('inner-toggle')).toBeVisible()
    await screen.getByTestId('inner-toggle').click()
    await expect.element(screen.getByTestId('outer-toggle')).toBeVisible()
  })

  test('Inner and outer descriptions are set', async () => {
    const screen = render(
      html`<admin-bar
        class="vertical"
        toolbar-toggle="button"
        toolbar-toggle-inner-description="inner description"
        toolbar-toggle-outer-description="outer description"
      ></admin-bar>`
    )

    await expect.element(screen.getByText('outer description')).toBeDefined()
    await screen.getByTestId('outer-toggle').click()
    await expect.element(screen.getByText('inner description')).toBeDefined()
  })

  test('Drag handle appears when attribute is added', async () => {
    const screen = render(html`<admin-bar class="vertical" toolbar-toggle="button" toolbar-toggle-drag></admin-bar>`)

    await expect.element(screen.getByTestId('drag-handle')).toBeVisible()
  })

  test('Drag handle description is set', async () => {
    const screen = render(
      html`<admin-bar
        class="vertical"
        toolbar-toggle="button"
        toolbar-toggle-drag
        toolbar-toggle-drag-handle-description="drag me"
      ></admin-bar>`
    )

    await expect.element(screen.getByText('drag me')).toBeDefined()
  })
})

describe('Greeting', () => {
  test('Displays greeting avatar and alt text', async () => {
    const screen = render(html`<admin-bar show-greeting avatar-alt="test" avatar-src="${fpoImageSrc}"></admin-bar>`)

    await expect.element(screen.getByTestId('toolbar').getByAltText('test')).toBeVisible()
  })

  test('Displays text in `greeting` slot', async () => {
    const screen = render(
      html`<admin-bar show-greeting>
        <p slot="greeting">Greeting Text</p>
      </admin-bar>`
    )

    await page.viewport(800, 100)
    screen.baseElement.style.width = '700px'
    await expect.element(screen.getByTestId('toolbar').getByTestId('greeting-content')).toBeVisible()
  })

  test('Includes ARIA label on greeting button when attribute is set', async () => {
    const screen = render(
      html`<admin-bar show-greeting greeting-button-aria-label="test" greeting-text="Greeting Label">
        <admin-bar-text slot="greeting-popover">Text in Popover</admin-bar-text>
      </admin-bar>`
    )

    await expect.element(screen.getByTestId('toolbar').getByText('Greeting Label')).toBeVisible()
    expect(screen.getByRole('button').element().ariaLabel).toEqual('test')
  })

  test('Displays greeting avatar and text when Admin Bar is wide enough', async () => {
    const screen = render(
      html`<admin-bar show-greeting avatar-alt="test" avatar-src="${fpoImageSrc}" greeting-text="Test"></admin-bar>`
    )

    await page.viewport(800, 100)
    screen.baseElement.style.width = '700px'
    await expect.element(screen.getByTestId('toolbar').getByText('Test')).toBeVisible()
    await expect.element(screen.getByTestId('toolbar').getByAltText('test')).toBeVisible()
  })

  test('Greeting avatar and text are hidden when Admin Bar is not wide enough', async () => {
    const screen = render(
      html`<admin-bar show-greeting avatar-alt="test" avatar-src="${fpoImageSrc}" greeting-text="Test"></admin-bar>`
    )

    await page.viewport(800, 100)
    screen.baseElement.style.width = '699px'
    await expect.element(screen.getByTestId('toolbar').getByText('Test')).not.toBeVisible()
    await expect.element(screen.getByTestId('toolbar').getByAltText('test')).toBeVisible()
  })

  test('Greeting popover slot is displayed', async () => {
    const screen = render(html`
      <admin-bar show-greeting avatar-alt="test" avatar-src="${fpoImageSrc}">
        <span slot="greeting-popover">Greeting Popover</span>
      </admin-bar>
    `)

    await screen.getByTestId('toolbar').getByAltText('test').click()
    await expect.element(screen.getByText('Greeting Popover')).toBeVisible()
  })
})

describe('Environment Warning', () => {
  test('Displays environment warning when attribute is set', async () => {
    const screen = render(html`<admin-bar></admin-bar>`)
    const adminBarElement = screen.baseElement.querySelector('admin-bar')!

    await expect.element(screen.getByTestId('environment')).not.toBeVisible()

    adminBarElement.setAttribute('show-environment', '')
    await expect.element(screen.getByTestId('environment')).toBeVisible()

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-environment')
    }
  })

  test('Environment description is set', async () => {
    const screen = render(html`<admin-bar show-environment environment-description="environment warning"></admin-bar>`)

    await expect.element(screen.getByText('environment warning')).toBeDefined()
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

    await expect.element(screen.getByTestId('toolbar').getByTestId('surface-progress')).toBeVisible()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot('admin-bar-progress')
    }
  })

  test('Display success progress bar when attribute is set to 100', async () => {
    const screen = render(html`<admin-bar progress="100"></admin-bar>`)

    await expect
      .element(screen.getByTestId('toolbar').getByTestId('surface-progress'))
      .toHaveStyle('--_progress-width: 100%;')
  })

  test('Display failure progress bar when attribute is set to -1', async () => {
    const screen = render(html`<admin-bar progress="-1"></admin-bar>`)

    await expect
      .element(screen.getByTestId('toolbar').getByTestId('surface-progress'))
      .toHaveStyle('--_progress-width: 100%;')
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
