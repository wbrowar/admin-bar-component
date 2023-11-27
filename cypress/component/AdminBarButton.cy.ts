import { html } from 'lit'
import '../../src/components/AdminBarButton.ts'

describe('Admin Bar Button Element Type', () => {
  it('button renders as an `button` element', () => {
    cy.mount(html`<admin-bar-button></admin-bar-button>`)

    cy.get('admin-bar-button')
      .shadow()
      .find('button.admin-bar-button')
      .should('exist', 'admin-bar-button was not rendered as an `<button>` element')
  })
  it('button renders as an `<a>` element', () => {
    cy.mount(html`<admin-bar-button button-href="#"></admin-bar-button>`)

    cy.get('admin-bar-button')
      .shadow()
      .find('a.admin-bar-button')
      .should('exist', 'admin-bar-button was not rendered as an `<a>` element')
  })
})

describe('Admin Bar Button Label', () => {
  it('button label is set correctly', () => {
    cy.mount(html`<admin-bar-button label-text="My Button"></admin-bar-button>`)

    cy.get('admin-bar-button').shadow().find('.admin-bar-button').contains('My Button')
  })
})

describe('Admin Bar Button Logout', () => {
  it('logout class is added to button', () => {
    cy.mount(html`<admin-bar-button logout-button></admin-bar-button>`)

    cy.get('admin-bar-button')
      .shadow()
      .find('.admin-bar-button--logout')
      .should('exist', 'logout class was not added to the button')
  })
})
