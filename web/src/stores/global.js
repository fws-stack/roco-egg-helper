import { defineStore } from 'pinia'
import spritesData from '../data/sprites.js'
import breedingData from '../data/breeding.js'
import eggModule from '../data/egg-data.js'
import pokedexModule from '../data/pokedex.js'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    spritesMap: {},
    forwardIndex: {},
    reverseIndex: {},
    eggData: [],
    pokedexData: null,
    chainBySprite: {},
    shinies: {},
    spriteRegion: {},
    pendingForwardId: null,
    pendingReverseId: null
  }),

  actions: {
    init() {
      this.spritesMap = spritesData

      const forwardIndex = {}
      const reverseIndex = {}
      ;(breedingData.recipes || []).forEach(entry => {
        const [a, b] = entry.p
        const key = a <= b ? `${a}_${b}` : `${b}_${a}`
        if (!forwardIndex[key]) forwardIndex[key] = []
        forwardIndex[key].push({ c: entry.c, prob: entry.prob })
        if (!reverseIndex[entry.c]) reverseIndex[entry.c] = []
        reverseIndex[entry.c].push({ p: [a, b], prob: entry.prob })
      })
      this.forwardIndex = forwardIndex
      this.reverseIndex = reverseIndex

      this.eggData = eggModule.eggs || []

      this.pokedexData = pokedexModule

      const chainBySprite = {}
      ;(this.pokedexData.chains || []).forEach(chain => {
        chain.members.forEach(id => {
          chainBySprite[id] = chain
        })
      })
      this.chainBySprite = chainBySprite
      this.shinies = this.pokedexData.shinies || {}

      const spriteRegion = {}
      ;(this.pokedexData.regions.windmorn || []).forEach(id => {
        spriteRegion[id] = 'windmorn'
      })
      ;(this.pokedexData.regions.rockorian || []).forEach(id => {
        spriteRegion[id] = 'rockorian'
      })
      this.spriteRegion = spriteRegion
    }
  }
})
