import { render } from 'vitest-browser-lit'
import { describe, expect, test } from 'vitest'
import { html } from 'lit'
import { AdminBarBuilder } from '@/utils/AdminBarBuilder.ts'
import { BuilderAdminBar } from '../../types'
import { page } from 'vitest/browser'
import { fpoImageSrc, iconSvgPencil } from '../../vitest/helpers.ts'

const builderData: BuilderAdminBar = {
  buttons: [
    {
      buttonHref: 'https://wbrowar.com/web-components/admin-bar-component',
      labelText: 'Dashboard',
      icon: iconSvgPencil,
      type: 'button',
    },
    {
      labelText: 'Popover Children',
      // Icon will not render due to `<script>` tag
      icon: '<svg><p>Hahaha</p><script>console.log("This should NOT fire!")<' + '/script></svg>',
      popover: [
        {
          textContent: 'Popover content!',
          type: 'text',
        },
      ],
      type: 'button',
    },
    {
      labelText: 'Will not render',
      popover: [
        {
          textContent: 'Popover content!',
          type: 'text',
        },
        {
          // Invalid text element will not let the button render
          type: 'text',
        },
      ],
      type: 'button',
    },
    {
      textContent: 'This is a message!',
      type: 'text',
    },
  ],
  environment: {
    enable: true,
    label: 'DEV',
  },
  greeting: {
    avatarAlt: 'randomly generated image',
    avatarSrc: fpoImageSrc,
    enable: true,
    text: 'Hello, Author',
  },
  logout: {
    enable: true,
    href: '/logout',
    label: 'Logout',
  },
}

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

    await expect(screen.baseElement).toMatchScreenshot('admin-bar-builder')

    await screen.getByText('Popover Children').click()
    await expect(screen.baseElement).toMatchScreenshot('admin-bar-builder-popover')
  })
})
