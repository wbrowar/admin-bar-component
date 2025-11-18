import 'vitest-browser-lit'
import { defineAdminBarElements } from '../lib/main'
import { beforeAll, beforeEach } from 'vitest'
import '../public/admin-bar.css'

beforeAll(() => {
  // Defines all Admin Bar custom elements once before all tests run.
  defineAdminBarElements(['button', 'checkbox', 'text'])
})

beforeEach(async () => {
  // Set browser to light mode so all screenshots are consistent.
  document.body.style.colorScheme = 'light'
})
