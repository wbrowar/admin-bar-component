import { render } from 'vitest-browser-lit'
import { describe, expect, test } from 'vitest'
import { html } from 'lit'
import { AdminBarBuilder } from '@/utils/AdminBarBuilder.ts'
import { page } from 'vitest/browser'
import { builderData } from '../../vitest/builder-data.ts'

describe('defineAdminBarElements', () => {
  test('`defineAdminBarElements` renders all child elements', async () => {
    await page.viewport(1000, 500)

    const screen = render(html` <div id="my-toolbar"></div> `)

    new AdminBarBuilder({
      options: {
        adminBarClass: 'sticky',
      },
      container: screen.baseElement.querySelector('#my-toolbar')! as HTMLElement,
      data: builderData,
    })

    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-builder')
    }

    await screen.getByText('Popover Children').click()
    if (import.meta.env.ENABLE_SCREENSHOTS) {
      await expect(screen.baseElement).toMatchScreenshot('admin-bar-builder-popover')
    }
  })
})
