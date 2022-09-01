
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: 10,
    title: 'All-day event',
    start: todayStr,
    allDay: true
  },
  {
    id: 11,
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    allDay: false

  },
  {
    id: 12,
    title: 'Hola',
    start: '2022-08-25T07:00:00',
    allDay: true
  }
]

export function createEventId() {
  return String(eventGuid++)
}
