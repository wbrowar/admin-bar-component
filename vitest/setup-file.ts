import 'vitest-browser-lit'
import { defineAdminBarElements } from '../lib/main'
import { beforeAll, beforeEach } from 'vitest'
import '../public/admin-bar.css'
// import { page } from 'vitest/browser'

beforeAll(() => {
  defineAdminBarElements(['button', 'checkbox', 'text'])
})

beforeEach(async () => {
  document.body.style.colorScheme = 'light'
  // await page.viewport(500, 100)
})
