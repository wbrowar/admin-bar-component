import 'vitest-browser-lit'
import { defineAdminBarElements } from '../lib/main'
import { beforeAll } from 'vitest'
import '../public/admin-bar.css'

beforeAll(() => {
  defineAdminBarElements(['button', 'checkbox', 'text'])
})
