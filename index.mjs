import { Motif } from 'motif'
import { Timeless } from 'timeless'
import { FALLBACK_SETS, THEMES_DEFAULT, BASE_ALPHA, CATEGORIES } from './themes/default.mjs'
import { GESTURES, ACTIONS, MOVEMENT_BASE } from './themes/movements.mjs'

const clamp = (x, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, x))

export class Projections {
  constructor(themeConfig = {}, motifConfig = {}) {
    this.motif = new Motif(motifConfig)
    this.encoder = new Timeless()
    this.theme = this._buildTheme(themeConfig)
    this.currentState = 'emerging'
    this.movementHistory = []
  }
  _buildTheme(themeConfig = {}) {
    const dT = THEMES_DEFAULT, th = themeConfig.theme || 'cognitive'
    let bT = dT[th]
    if (!bT) {
      console.warn(`Theme "${th}" not found, using "cognitive" theme`)
      bT = dT.cognitive
    }
    return {
      name: th,
      stateLexicons: { ...bT.stateLexicons, ...(themeConfig.stateLexicons || {}) },
      syntaxPatterns: { ...bT.syntaxPatterns, ...(themeConfig.syntaxPatterns || {}) },
      encodingConfig: { ...(themeConfig.encodingConfig || {}) }
    }
  }

  update(input, context, deltaTime = 1.0, conversationContext = {}) {
    const mR = this.motif.update(input, context, deltaTime)
    const aM = mR.motifs
    this.currentState = this._determineDominantState(aM, mR.StP)
    let eS = this.currentState
    let memeticInfluence = {}
    if (conversationContext.memeticInfluence) {
      const result = this._applyMemeticInfluence(conversationContext.memeticInfluence, mR.StP.plasticity)
      eS = result.expressedState
      memeticInfluence = result.influenceApplied
    }
    const content = this._generateContent(eS, conversationContext, memeticInfluence)
    const movement = this._generateMovementProfile(mR.StP, aM, memeticInfluence)
    this._configureEncoding(mR.StP, aM)
    const encoded = this.encoder.encodeString(content)
    this.movementHistory.push({
      timestamp: Date.now(),
      state: this.currentState,
      expressedState: eS,
      movement,
      plasticity: mR.StP.plasticity,
      energy: context.energy || 0.5,
      memeticInfluence
    })
    if (this.movementHistory.length > 50) this.movementHistory.shift()
    return {
      content,
      encoded,
      state: this.currentState,
      expressedState: eS,
      movement,
      motifSummary: mR,
      encodingConfig: this.encoder.getState(),
      movementHistory: this.getMovementEvolution(),
      memeticInfluence
    }
  }

  _applyMemeticInfluence(memeticInfluence, plasticity) {
    if (!memeticInfluence.shouldAdoptStance) { return { expressedState: this.currentState, influenceApplied: { type: 'none' } } }
    const susceptibility = plasticity * 0.8 + (Math.random() * 0.2)
    const influenceStrength = memeticInfluence.strength || 0.5
    if (susceptibility > influenceStrength) {
      const blendFactor = Math.min(1, susceptibility * influenceStrength)
      const originalState = this.currentState
      const expressedState = Math.random() < blendFactor ? memeticInfluence.dominantStance : this.currentState
      return {
        expressedState,
        influenceApplied: {
          type: 'stance_adoption',
          originalState,
          adoptedStance: memeticInfluence.dominantStance,
          blendFactor,
          strength: influenceStrength
        }
      }
    }
    return { expressedState: this.currentState, influenceApplied: { type: 'resisted' } }
  }

  _generateMovementProfile(stateProperties, activeMotifs, memeticInfluence = {}) {
    const stance = this.currentState
    const plasticity = stateProperties.plasticity
    const quality = stateProperties.quality
    const coherence = stateProperties.coherence || 0.5
    const energy = stateProperties.framework?.energy || 0.5
    const movementBase = MOVEMENT_BASE[stance] || movementBase.emerging
    let influencedMovement = { ...movementBase }
    if (memeticInfluence.movementBleed && plasticity > 0.4) {
      influencedMovement = this._blendMovementStyles(influencedMovement, memeticInfluence.movementBleed, plasticity)
    }

    const modulatedMovement = {
      ...influencedMovement,
      intensity: clamp(influencedMovement.intensity * energy, 0.1, 1.0),
      fluidity: plasticity,
      precision: quality,
      complexity: stateProperties.framework?.complexity || 0.5,
      primaryGesture: this._selectGesture(stance, plasticity, energy, memeticInfluence),
      movementPhrase: this._generateMovementPhrase(stance, plasticity, activeMotifs, memeticInfluence),
      temporalPattern: this._calculateTemporalPattern(plasticity, energy, coherence),
      expressivity: (plasticity + energy) / 2,
      grounding: 1 - plasticity,
      connection: coherence,
      memeticInfluence: memeticInfluence.movementBleed ? 'applied' : 'none'
    }
    return modulatedMovement
  }

  _blendMovementStyles(baseMovement, influence, plasticity) {
    const blendAmount = plasticity * 0.5
    return {
      quality: Math.random() < blendAmount ? influence.quality : baseMovement.quality,
      amplitude: baseMovement.amplitude * (1 - blendAmount) + (influence.amplitude || baseMovement.amplitude) * blendAmount,
      rhythm: Math.random() < blendAmount ? influence.rhythm : baseMovement.rhythm,
      flow: Math.random() < blendAmount ? influence.flow : baseMovement.flow,
      spatial: Math.random() < blendAmount ? influence.spatial : baseMovement.spatial
    }
  }

  _selectGesture(stance, plasticity, energy, memeticInfluence = {}) {
    const gestureLibraries = GESTURES
    let gestures = gestureLibraries[stance] || gestureLibraries.emerging
    if (memeticInfluence.dominantGestures && Math.random() < plasticity * 0.3) {
      gestures = [...gestures, ...memeticInfluence.dominantGestures]
    }
    const energyIndex = Math.floor(energy * (gestures.length - 1))
    const plasticityMod = plasticity > 0.7 ? 'flexible ' : plasticity < 0.3 ? 'static ' : ''
    return plasticityMod + gestures[energyIndex]
  }

  _generateMovementPhrase(stance, plasticity, activeMotifs, memeticInfluence = {}) {
    const movementVerbs = ACTIONS
    let verbs = movementVerbs[stance] || movementVerbs.emerging
    if (memeticInfluence.dominantVerbs && Math.random() < plasticity * 0.4) { verbs = [...verbs, ...memeticInfluence.dominantVerbs] }
    const motifCount = activeMotifs?.length || 1
    const complexity = Math.min(3, Math.floor(motifCount * plasticity) + 1)
    let phrase = []
    for (let i = 0; i < complexity; i++) {
      const verb = verbs[Math.floor(Math.random() * verbs.length)]
      const modifier = this._getMovementModifier(plasticity, i)
      phrase.push(modifier + verb)
    }
    return phrase.join(' → ')
  }

  _getMovementModifier(plasticity, position) {
    if (plasticity > 0.8) return 'deliberately '
    if (plasticity > 0.6) return 'smoothly '
    if (plasticity < 0.3) return 'accidentally '
    return position === 0 ? '' : 'then '
  }

  _calculateTemporalPattern(plasticity, energy, coherence) {
    return {
      tempo: 0.5 + (energy * 0.5),
      rhythm: plasticity > 0.7 ? 'flowing' : plasticity < 0.4 ? 'measured' : 'variable',
      duration: 2 + (plasticity * 4),
      syncopation: 1 - coherence
    }
  }

  getMovementEvolution() { return this.movementHistory.slice(-10) }

  getMovementSignature() {
    const current = this.movementHistory[this.movementHistory.length - 1]
    if (!current) return null
    return {
      state: current.state,
      expressedState: current.expressedState,
      intensity: current.movement.intensity,
      fluidity: current.movement.fluidity,
      primaryGesture: current.movement.primaryGesture,
      movementQuality: current.movement.quality,
      memeticInfluence: current.memeticInfluence
    }
  }

  _determineDominantState(aM, stateProperties) {
    if (aM.length === 0) return 'emerging'
    const stateScores = { rut: 0, taste: 0, growth: 0, emerging: 0 }
    aM.forEach(motif => {
      const weight = motif.quality * motif.stability
      stateScores[motif.type] += weight
    })
    if (stateProperties.plasticity > 0.7) stateScores.growth += 0.3
    if (stateProperties.coherence > 0.8) stateScores.taste += 0.2
    return Object.entries(stateScores).reduce((a, b) => a[1] > b[1] ? a : b)[0]
  }

  _generateContent(state, conversationContext = {}, memeticInfluence = {}) {
    const lexicon = this.theme.stateLexicons[state], patterns = this.theme.syntaxPatterns[state]
    let availablePatterns = patterns
    if (conversationContext.lastSpeaker && conversationContext.lastUtterance) {
      availablePatterns = patterns.filter(pattern => !pattern.includes('{otherSpeaker}') || conversationContext.lastSpeaker)
    } else {
      availablePatterns = patterns.filter(pattern => !pattern.includes('{otherSpeaker}') && !pattern.includes('{theirUtterance}'))
    }
    if (availablePatterns.length === 0) availablePatterns = patterns
    let selectedPattern = availablePatterns[Math.floor(Math.random() * availablePatterns.length)]
    if (memeticInfluence.dominantPatterns && Math.random() < 0.3) {
      const memePatterns = memeticInfluence.dominantPatterns.filter(p =>
        availablePatterns.some(ap => ap.includes(p))
      )
      if (memePatterns.length > 0) {
        selectedPattern = memePatterns[Math.floor(Math.random() * memePatterns.length)]
      }
    }
    const pattern = selectedPattern
    const currentAlphabet = this.encoder.getState().alphabet.join('')
    const filteredLexicon = this._filterLexiconToAlphabet(lexicon, currentAlphabet)
    const influencedLexicon = this._applyLexicalInfluence(filteredLexicon, memeticInfluence)
    let content = pattern
    content = content.replace(/{adjective}/gi, () => {
      const words = influencedLexicon.adjectives && influencedLexicon.adjectives.length > 0 ? influencedLexicon.adjectives : ['present']
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{noun}/gi, () => {
      const words = influencedLexicon.nouns && influencedLexicon.nouns.length > 0 ? influencedLexicon.nouns : ['form']
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{verb}/gi, () => {
      const words = influencedLexicon.verbs && influencedLexicon.verbs.length > 0 ? influencedLexicon.verbs : ['is']
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{adverb}/gi, () => {
      const words = influencedLexicon.adverbs && influencedLexicon.adverbs.length > 0 ? influencedLexicon.adverbs : ['now']
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{conjunction}/gi, () => {
      const words = influencedLexicon.conjunctions && influencedLexicon.conjunctions.length > 0 ? influencedLexicon.conjunctions : ['and']
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{otherSpeaker}/gi, () => { return conversationContext.lastSpeaker || 'someone' })
    content = content.replace(/{theirUtterance}/gi, () => {
      if (conversationContext.lastUtterance) {
        const words = conversationContext.lastUtterance.split(' ')
        return words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '')
      }
      return 'what was said'
    })
    content = content.replace(/{theirStance}/gi, () => { return conversationContext.lastStance || 'perspective' })
    content = content.replace(/{Adjective}/, () => {
      const words = influencedLexicon.adjectives && influencedLexicon.adjectives.length > 0 ? influencedLexicon.adjectives : ['Present']
      const word = words[Math.floor(Math.random() * words.length)]
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    content = this._sanitizeToAlphabet(content, currentAlphabet)
    if (!content.match(/^{Adjective}/)) content = content.charAt(0).toUpperCase() + content.slice(1)
    return content
  }

  _applyLexicalInfluence(lexicon, memeticInfluence) {
    if (!memeticInfluence.dominantWords) return lexicon
    const influenced = { ...lexicon }
    CATEGORIES.forEach(category => {
      if (memeticInfluence.dominantWords[category] && influenced[category]) {
        influenced[category] = [
          ...influenced[category],
          ...memeticInfluence.dominantWords[category]
        ]
      }
    })
    return influenced
  }

  _filterLexiconToAlphabet(lexicon, alphabet) {
    const f = {}, a = new Set(alphabet)
    CATEGORIES.forEach(category => {
      if (lexicon[category] && Array.isArray(lexicon[category])) {
        f[category] = lexicon[category].filter(word => word.split('').every(char => a.has(char)))
      } else { f[category] = [] }
    })
    return f
  }

  _sanitizeToAlphabet(text, alphabet) {
    const a = new Set(alphabet)
    return text.split('').filter(char => a.has(char)).join('')
  }

  _configureEncoding(stateProperties) {
    const p = stateProperties.plasticity
    let symbols, alphabet
    if (this.currentState === 'rut') {
      symbols = this.theme.encodingConfig?.rut?.symbols || FALLBACK_SETS[this.currentState]
      alphabet = this.theme.encodingConfig?.rut?.alphabet || BASE_ALPHA.rut
    }
    else if (this.currentState === 'taste') {
      symbols = this.theme.encodingConfig?.taste?.symbols || FALLBACK_SETS[this.currentState]
      alphabet = this.theme.encodingConfig?.taste?.alphabet || BASE_ALPHA.taste
    }
    else if (this.currentState === 'growth') {
      symbols = this.theme.encodingConfig?.growth?.symbols || FALLBACK_SETS[this.currentState]
      alphabet = this.theme.encodingConfig?.growth?.alphabet || BASE_ALPHA.growth
    }
    else {
      symbols = this.theme.encodingConfig?.emerging?.symbols || FALLBACK_SETS[this.currentState]
      alphabet = this.theme.encodingConfig?.emerging?.alphabet || BASE_ALPHA.emerging
    }
    symbols = this._validateSymbolsForAlphabet(symbols, alphabet)
    this.encoder.setSymbols(symbols)
    this.encoder.setAlphabet(alphabet)
    if (p > 0.8 && this.currentState !== 'rut') {
      const currentAlpha = this.encoder.getState().alphabet.join('')
      if (currentAlpha.length < 100) this.encoder.setAlphabet(currentAlpha + '♠♣♥♦♤♧♡♢')
    }
  }

  _validateSymbolsForAlphabet(symbols, alphabet) {
    const a = alphabet.length, requiredSymbols = this._calculateMinimumSymbols(a)
    if (symbols.length >= requiredSymbols) return symbols
    console.warn(`Insufficient symbols (${symbols.length}) for alphabet size ${a}. Required: ${requiredSymbols}. Using fallback.`)
    return this._generateFallbackSymbols(requiredSymbols, this.currentState)
  }

  _calculateMinimumSymbols(a) {
    if (a <= 27) return 3
    if (a <= 64) return 4
    if (a <= 256) return 8
    return 16
  }

  _generateFallbackSymbols(count, state) {
    const bS= FALLBACK_SETS[state] || FALLBACK_SETS.emerging
    const r = [...bS]
    while (r.length < count) { r.push(r[r.length % bS.length] + '') }
    return r.slice(0, count)
  }

  getThemeInfo() {
    if (!this.theme) return { name: 'unknown', availableStates: [], patternCounts: {}}
    const sL = this.theme.stateLexicons || {}, syntaxPatterns = this.theme.syntaxPatterns || {}
    return {
      name: this.theme.name || 'unknown',
      availableStates: Object.keys(sL),
      patternCounts: Object.entries(syntaxPatterns).reduce((acc, [state, patterns]) => {
        acc[state] = Array.isArray(patterns) ? patterns.length : 0
        return acc
      }, {})
    }
  }

  setTheme(newThemeConfig) { this.theme = this._buildTheme(newThemeConfig) }

  getState() {
    return {
      currentState: this.currentState,
      motifSummary: this.motif.getSystemSummary(),
      encodingConfig: this.encoder.getState()
    }
  }
}