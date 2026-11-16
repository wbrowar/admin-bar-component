/**
 * Makes an element draggable by a handle child element.
 * @see https://www.redblobgames.com/making-of/draggable/examples.html#div-handle
 */

export interface DraggableState {
  eventToCoordinates: Function
  dragging: { dx: number; dy: number } | null
  _pos: { x: number; y: number }
  pos: { x: number; y: number }
}

export function makeDraggable(state: DraggableState, el: HTMLElement) {
  function start(event: PointerEvent) {
    if (event.button !== 0) return // left button only
    let { x, y } = state.eventToCoordinates(event)
    state.dragging = { dx: state.pos.x - x, dy: state.pos.y - y }
    el.classList.add('dragging')
    el.setPointerCapture(event.pointerId)
    el.style.userSelect = 'none' // if there's text
    el.style.webkitUserSelect = 'none' // safari
  }

  function end() {
    state.dragging = null
    el.classList.remove('dragging')
    el.style.userSelect = '' // if there's text
    el.style.webkitUserSelect = '' // safari
  }

  function move(event: PointerEvent) {
    if (!state.dragging) return
    let { x, y } = state.eventToCoordinates(event)
    state.pos = { x: x + state.dragging.dx, y: y + state.dragging.dy }
  }

  el.addEventListener('pointerdown', start)
  el.addEventListener('pointerup', end)
  el.addEventListener('pointercancel', end)
  el.addEventListener('pointermove', move)
  el.addEventListener('touchstart', (e) => e.preventDefault())
  el.addEventListener('dragstart', (e) => e.preventDefault())
}
