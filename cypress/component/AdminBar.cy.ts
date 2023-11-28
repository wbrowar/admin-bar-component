import { html } from 'lit'
import '../../src/components/AdminBar.ts'

describe('Admin Bar Greeting', () => {
  it('greeting is shown', () => {
    cy.mount(html`<admin-bar show-greeting></admin-bar>`)

    cy.get('admin-bar').shadow().find('.admin-bar.admin-bar--greeting').should('exist', 'greeting class was not added')
  })
  it('greeting is not shown when `show-greeting` is not added', () => {
    cy.mount(html`<admin-bar></admin-bar>`)

    cy.get('admin-bar').shadow().find('.admin-bar.admin-bar--greeting').should('not.exist', 'greeting class was added')
  })
  it('avatar is shown when `avatar-src` is added', () => {
    cy.mount(html`<admin-bar show-greeting avatar-src="#"></admin-bar>`)

    cy.get('admin-bar').shadow().find('.admin-bar .greeting img').should('exist', 'avatar was not rendered')
  })
  it('avatar alt text is set when `avatar-alt` is added', () => {
    cy.mount(html`<admin-bar show-greeting avatar-alt="my-alt" avatar-src="#"></admin-bar>`)

    cy.get('admin-bar')
      .shadow()
      .find('.admin-bar .greeting img[alt="my-alt"]')
      .should('exist', 'avatar was not rendered')
  })
  it('greeting text changes when `greeting-text` is added', () => {
    cy.mount(html`<admin-bar show-greeting greeting-text="Custom Greeting"></admin-bar>`)

    cy.get('admin-bar').shadow().find('.admin-bar .greeting').contains('Custom Greeting')
  })
  it.skip('greeting slot is shown', () => {
    cy.mount(html`<admin-bar show-greeting></admin-bar>`)

    cy.get('admin-bar').invoke('html', '<span slot="greeting">Hi, Sam</span>')

    cy.get('admin-bar [slot="greeting"]').trigger('slotchange')
    cy.get('admin-bar [slot="greeting"]').contains('Hi, Sam')
  })
})

describe('Admin Bar Environment Warning', () => {
  it('environment is shown', () => {
    cy.mount(html`<admin-bar show-environment></admin-bar>`)

    cy.get('admin-bar')
      .shadow()
      .find('.admin-bar.admin-bar--environment')
      .should('exist', 'environment class was not added')
  })
  it('environment is not shown when `show-environment` is not added', () => {
    cy.mount(html`<admin-bar></admin-bar>`)

    cy.get('admin-bar')
      .shadow()
      .find('.admin-bar.admin-bar--environment')
      .should('not.exist', 'environment class was added')
  })
})

describe('Admin Bar Logout', () => {
  it('logout is shown', () => {
    cy.mount(html`<admin-bar show-logout></admin-bar>`)

    cy.get('admin-bar').shadow().find('.admin-bar.admin-bar--logout').should('exist', 'logout class was not added')
  })
  it('logout is not shown when `show-logout` is not added', () => {
    cy.mount(html`<admin-bar></admin-bar>`)

    cy.get('admin-bar').shadow().find('.admin-bar.admin-bar--logout').should('not.exist', 'logout class was added')
  })
})
