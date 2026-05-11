import { useGlobalStore } from '../stores/global'

function queryForward(parentA, parentB) {
  const store = useGlobalStore()
  const key = normalizeKey(parentA, parentB)
  const results = store.forwardIndex[key] || []
  return results
    .map(r => ({ childId: r.c, probability: r.prob != null ? r.prob : null }))
    .sort((a, b) => (b.probability ?? 0) - (a.probability ?? 0))
}

function queryReverse(childId) {
  const store = useGlobalStore()
  const results = store.reverseIndex[childId] || []
  return results
    .map(r => ({ parentIds: r.p, probability: r.prob != null ? r.prob : null }))
    .sort((a, b) => (b.probability ?? 0) - (a.probability ?? 0))
}

function normalizeKey(a, b) {
  return a <= b ? `${a}_${b}` : `${b}_${a}`
}

export { queryForward, queryReverse }
