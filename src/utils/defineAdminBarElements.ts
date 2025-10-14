import { AdminBar } from '@/components/AdminBar'
import { AdminBarButton } from '@/components/AdminBarButton'
import { AdminBarCheckbox } from '@/components/AdminBarCheckbox'
import { AdminBarText } from '@/components/AdminBarText'

type AdminBarElement = 'button' | 'checkbox' | 'text'

/**
 * Defines the `<admin-bar>` custom element, then defines the custom elements specified in the list.
 * @param list A list of Admin Bar’s custom elements.
 */
export function defineAdminBarElements(list: AdminBarElement[]) {
  /**
   * Define all supporting elements specified in the list.
   */
  list.forEach((element) => {
    const elementName = `admin-bar-${element}`
    if (!customElements.get(elementName)) {
      switch (element) {
        case 'button':
          customElements.define(elementName, AdminBarButton)
          break
        case 'checkbox':
          customElements.define(elementName, AdminBarCheckbox)
          break
        case 'text':
          customElements.define(elementName, AdminBarText)
          break
      }
    }
  })

  /**
   * Define the main `<admin-bar>` element.
   */
  if (!customElements.get('admin-bar')) {
    customElements.define('admin-bar', AdminBar)
  }
}
