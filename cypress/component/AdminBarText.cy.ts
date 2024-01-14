import { html } from 'lit'
import '../../src/components/AdminBarText.ts'

describe('Admin Bar Text Content', () => {
  it('text content is set correctly from attribute', () => {
    cy.mount(html`<admin-bar-text text-content="Hello"></admin-bar-text>`)

    cy.get('admin-bar-text').shadow().find('.admin-bar-text').contains('Hello')
  })
  it('text content is set correctly from slot', () => {
    cy.mount(html`<admin-bar-text>Hello</admin-bar-text>`)

    cy.get('admin-bar-text').contains('Hello')
  })
})

describe('Admin Bar Chip Content', () => {
  it('chip content is set correctly from attribute', () => {
    cy.mount(html`<admin-bar-text chip-content="Hello"></admin-bar-text>`)

    cy.get('admin-bar-text').shadow().find('.chip').contains('Hello')
  })
  it('chip content is set after text content', () => {
    cy.mount(html`<admin-bar-text chip-content="Hello" text-content="World"></admin-bar-text>`)

    cy.get('admin-bar-text').shadow().find('.chip + *').should('not.exist')
  })
  it('chip content is set after text content', () => {
    cy.mount(html`<admin-bar-text chip-content="Hello" chip-position="before" text-content="World"></admin-bar-text>`)

    cy.get('admin-bar-text').shadow().find('.chip + *').should('exist')
  })
})
