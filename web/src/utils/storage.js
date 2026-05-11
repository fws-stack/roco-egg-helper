const HISTORY_KEY = 'roke_query_history'
const MAX_HISTORY = 10

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
  } catch (e) {
    return []
  }
}

function addHistory(entry) {
  let list = getHistory()
  list = list.filter(item => {
    if (entry.type === 'forward' && item.type === 'forward') {
      const same = (item.parentA === entry.parentA && item.parentB === entry.parentB) ||
                   (item.parentA === entry.parentB && item.parentB === entry.parentA)
      return !same
    }
    if (entry.type === 'reverse' && item.type === 'reverse') {
      return item.childId !== entry.childId
    }
    if (entry.type === 'egg' && item.type === 'egg') {
      return !(item.size === entry.size && item.weight === entry.weight)
    }
    return true
  })

  list.unshift(entry)
  if (list.length > MAX_HISTORY) list.pop()
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list))
  return list
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY)
}

export { getHistory, addHistory, clearHistory }
