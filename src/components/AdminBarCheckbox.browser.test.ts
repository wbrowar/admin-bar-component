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

  test.skip('Displays label before checkbox when attribute is set', async () => {
    const screen = render(
      html`<admin-bar>
        <admin-bar-checkbox label-position="before">Checkbox Label</admin-bar-checkbox>
      </admin-bar>`
    )

    await expect.element(screen.getByText('Checkbox Label')).toBeVisible()
    expect(screen.getByText('Checkbox Label').element()).toMatchInlineSnapshot(
      `"div >> internal:text="Checkbox Label"i"`
    )
  })
})
