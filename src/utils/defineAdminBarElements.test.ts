import { render } from 'vitest-browser-lit'
import { describe, expect, test } from 'vitest'
import { html } from 'lit'

describe('defineAdminBarElements', () => {
  test('`defineAdminBarElements` renders all child elements', async () => {
    const screen = render(html`
      <admin-bar>
        <admin-bar-button> Button Label </admin-bar-button>
        <admin-bar-checkbox>Checkbox Label</admin-bar-checkbox>
        <admin-bar-text>Text Label</admin-bar-text>
      </admin-bar>
    `)

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('define-admin-bar-elements-all-elements')
    }
  })
})
