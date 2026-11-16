import { BuilderAdminBar } from '../types'
import { fpoImageSrc, iconSvgPencil } from './helpers'

export const builderData: BuilderAdminBar = {
  buttons: [
    {
      buttonAriaLabel: 'Links to dashboard page',
      buttonHref: 'https://wbrowar.com/web-components/admin-bar-component',
      labelText: 'Dashboard',
      icon: iconSvgPencil,
      type: 'button',
    },
    {
      labelText: 'Popover Children',
      badgeContent: '25',
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
      labelText: 'Checkbox',
      inputSwitch: true,
      type: 'checkbox',
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
      badgeContent: '67',
      badgePosition: 'before',
      textContent: 'This is a message!',
      type: 'text',
    },
  ],
  environment: {
    badge: 'DEV',
    description: 'This website is in Dev Mode.',
    enable: true,
  },
  greeting: {
    avatarAlt: 'randomly generated image',
    avatarSrc: fpoImageSrc,
    buttonAriaLabel: 'Popover Menu',
    enable: true,
    text: 'Hello, Author',
  },
  logout: {
    enable: true,
    href: '/logout',
    label: 'Logout',
  },
}
