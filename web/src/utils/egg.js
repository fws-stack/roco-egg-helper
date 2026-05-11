import { useGlobalStore } from '../stores/global'

function matchEgg(size, weight) {
  const store = useGlobalStore()
  const eggs = store.eggData || []
  const results = []

  eggs.forEach(egg => {
    const sizeInRange = size >= egg.size.min && size <= egg.size.max
    const weightInRange = weight >= egg.weight.min && weight <= egg.weight.max

    if (sizeInRange && weightInRange) {
      const sizeCenter = (egg.size.min + egg.size.max) / 2
      const weightCenter = (egg.weight.min + egg.weight.max) / 2
      const sizeRange = egg.size.max - egg.size.min || 1
      const weightRange = egg.weight.max - egg.weight.min || 1
      const sizeScore = Math.abs(size - sizeCenter) / sizeRange
      const weightScore = Math.abs(weight - weightCenter) / weightRange
      const score = sizeScore + weightScore

      results.push({
        spriteId: egg.spriteId,
        name: egg.name,
        sizeMin: egg.size.min,
        sizeMax: egg.size.max,
        weightMin: egg.weight.min,
        weightMax: egg.weight.max,
        score: score
      })
    }
  })

  results.sort((a, b) => a.score - b.score)
  return results
}

export { matchEgg }
