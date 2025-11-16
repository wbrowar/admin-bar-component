import { render } from 'vitest-browser-lit'
import { describe, expect, test } from 'vitest'
import { html } from 'lit'

describe('Checkbox Component', () => {
  test('Displays input', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-checkbox>Checkbox Label</admin-bar-checkbox>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Checkbox Label')).toBeVisible()
  })

  test('Displays input label when attribute is set', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-checkbox label-text="Checkbox Label"></admin-bar-checkbox>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Checkbox Label')).toBeVisible()
  })

  test('Displays label before checkbox when attribute is set', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-checkbox label-position="before">Checkbox Label</admin-bar-checkbox>
      </admin-bar>`
    )

    await expect(screen.baseElement.querySelector('admin-bar')).toMatchScreenshot(
      'admin-bar-checkbox-label-before-input',
      {
        comparatorOptions: {
          threshold: 0.3,
          allowedMismatchedPixelRatio: 0.3,
        },
      }
    )
  })

  test('Sets the input checked attribute', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-checkbox checked>Checkbox Label</admin-bar-checkbox>
      </admin-bar>`
    )

    await expect.element(screen.getByRole('checkbox', { checked: true })).toBeVisible()
  })

  test('Sets the input disabled attribute', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-checkbox disabled>Checkbox Label</admin-bar-checkbox>
      </admin-bar>`
    )

    await expect.element(screen.getByRole('checkbox', { disabled: true })).toBeVisible()
  })
})

describe('Events', () => {
  test.todo('Checkbox fires `change` event')
  test.todo('Checkbox fires `checked` event')
  test.todo('Checkbox fires `unchecked` event')
})
