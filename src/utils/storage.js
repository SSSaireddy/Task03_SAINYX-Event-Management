const STORAGE_KEY = 'sainyx_registrations_v1'

export function getRegistrations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveRegistration(registration) {
  const current = getRegistrations()
  const next = [registration, ...current]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function removeRegistration(registrationId) {
  const next = getRegistrations().filter(item => item.registrationId !== registrationId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}
