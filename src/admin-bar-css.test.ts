import { beforeEach, describe, expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-lit'
import { html } from 'lit'
import { fpoImageSrc } from '../vitest/helpers.ts'

describe('Admin Bar general styles', () => {
  beforeEach(async () => {
    await page.viewport(1000, 500)
  })

  test.each([
    {
      name: '--admin-bar-avatar-size',
      css: html`admin-bar { --admin-bar-avatar-size: 50px; }`,
      userEvent: [],
    },
    {
      name: '--admin-bar-bg',
      css: html`admin-bar { --admin-bar-bg: linear-gradient(to bottom, rebeccapurple, aliceblue); }`,
      userEvent: [],
    },
    {
      name: '--admin-bar-bg-color',
      css: html`admin-bar { --admin-bar-bg-color: rebeccapurple; }`,
      userEvent: [],
    },
    {
      name: '--admin-bar-bg-filter',
      css: html`admin-bar { --admin-bar-bg-filter: brightness(0.01); }`,
      userEvent: [],
    },
    {
      name: '--admin-bar-block-padding',
      css: html`admin-bar { --admin-bar-block-padding: 30px; }`,
      userEvent: ['click-popover'],
    },
    {
      name: '--admin-bar-border-radius',
      css: html`admin-bar { --admin-bar-border-radius: calc(var(--admin-bar-height) / 2); }`,
      userEvent: [],
    },
    {
      name: '--admin-bar-color-highlight',
      css: html`admin-bar { --admin-bar-color-highlight: oklch(0.858 0.289 142.119); }`,
      userEvent: ['hover-button'],
    },
    {
      name: '--admin-bar-color-highlight-logout',
      css: html`admin-bar { --admin-bar-color-highlight-logout: rebeccapurple; }`,
      userEvent: ['hover-button'],
    },
  ])('$name', async ({ name, css, userEvent }) => {
    const screen = render(html`
      <admin-bar
        show-environment
        show-greeting
        show-logout
        avatar-alt="avatar"
        avatar-src="${fpoImageSrc}"
        greeting-text="Hi, Author"
        logout-url="#"
      >
        <admin-bar-button>
          Button Label
          <admin-bar-text slot="popover">Popover Content</admin-bar-text>
        </admin-bar-button>
        <admin-bar-checkbox>Checkbox Label</admin-bar-checkbox>
        <admin-bar-text label-content="67">Text Label</admin-bar-text>
      </admin-bar>
      <style>
        ${css}
      </style>
    `)

    if (userEvent.includes('click-popover')) {
      await screen.getByText('Button Label').click()
    }
    if (userEvent.includes('hover-button')) {
      await screen.getByText('Button Label').hover()
    } else if (userEvent.includes('hover-logout')) {
      await screen.getByText('Sign out').hover()
    }

    await expect(screen.baseElement).toMatchScreenshot(`css-variable${name}`)
  })
})
