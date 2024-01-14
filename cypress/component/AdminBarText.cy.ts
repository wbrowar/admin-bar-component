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

describe('Admin Bar Badge Content', () => {
  it('label content is set correctly from attribute', () => {
    cy.mount(html`<admin-bar-text label-content="Hello"></admin-bar-text>`)

    cy.get('admin-bar-text').shadow().find('.label').contains('Hello')
  })
  it('label content is set after text content', () => {
    cy.mount(html`<admin-bar-text label-content="Hello" text-content="World"></admin-bar-text>`)

    cy.get('admin-bar-text').shadow().find('.label + *').should('not.exist')
  })
  it('label content is set after text content', () => {
    cy.mount(html`<admin-bar-text label-content="Hello" label-position="before" text-content="World"></admin-bar-text>`)

    cy.get('admin-bar-text').shadow().find('.label + *').should('exist')
  })
})
