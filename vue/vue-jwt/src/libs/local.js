export const setLocal = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

export const getLocal = key => {
  return localStorage.getItem(key)
}