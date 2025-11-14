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

    if (import.meta.env.VISUAL_TEST) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-checkbox-label-before-input')
    }
  })

  test('Sets the input name', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-checkbox input-name="Hello">Checkbox Label</admin-bar-checkbox>
      </admin-bar>`
    )

    await expect.element(screen.getByRole('checkbox')).toBeVisible()
  })
})
