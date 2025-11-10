import { Motif } from 'motif'
import { Timeless } from 'timeless'
import { FALLBACK_SETS, THEMES_DEFAULT, BASE_ALPHA, CATEGORIES, IRREGULAR_VERBS } from './themes/default.mjs'
import { GESTURES, ACTIONS, MOVEMENT_BASE } from './themes/movements.mjs'

const clamp = (x, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, x))
const DEFAULT_THEME_NAME = 'cognitive'
const DEFAULT_STATE = 'emerging'
const MEMETIC_PATTERN_INFLUENCE_PROBABILITY = 0.3
const MEMETIC_SUSCEPTIBILITY_PLASTICITY_WEIGHT = 0.8
const MEMETIC_SUSCEPTIBILITY_NOISE_RANGE = 0.2
const DEFAULT_MEMETIC_INFLUENCE_STRENGTH = 0.5
const MEMETIC_GESTURE_ADOPTION_SCALE = 0.3
const MEMETIC_VERB_ADOPTION_SCALE = 0.4
const MEMETIC_ADOPTION_BIAS_DEFAULT = 0.3
const MEMETIC_ALPHABET_ADOPTION_SCALE = 0.3
const DEFAULT_COHERENCE = 0.5
const DEFAULT_ENERGY_LEVEL = 0.5
const MIN_MOVEMENT_INTENSITY = 0.1
const MAX_MOVEMENT_INTENSITY = 1.0
const LOW_PLASTICITY_THRESHOLD = 0.3
const HIGH_PLASTICITY_THRESHOLD = 0.7
const VERY_HIGH_PLASTICITY_THRESHOLD = 0.8
const MID_PLASTICITY_THRESHOLD = 0.6
const MAX_MOVEMENT_PHRASE_COMPLEXITY = 3
const MOVEMENT_COMPLEXITY_BASE = 1
const TEMPORAL_TEMPO_BASE = 0.5
const TEMPORAL_TEMPO_ENERGY_WEIGHT = 0.5
const TEMPORAL_DURATION_BASE = 2
const TEMPORAL_DURATION_PLASTICITY_MULTIPLIER = 4
const RHYTHM_LOW_PLASTICITY_THRESHOLD = 0.4
const PLASTICITY_GROWTH_BONUS_THRESHOLD = 0.7
const PLASTICITY_GROWTH_BONUS = 0.3
const COHERENCE_TASTE_BONUS_THRESHOLD = 0.8
const COHERENCE_TASTE_BONUS = 0.2
const LAST_UTTERANCE_PREVIEW_WORDS = 4
const PLURAL_PRONOUNS = new Set(['we', 'they', 'you'])
const DEFAULT_OTHER_SPEAKER_NAME = 'someone'
const DEFAULT_ADJECTIVE = 'present'
const DEFAULT_NOUN = 'form'
const DEFAULT_PRONOUN = 'I'
const DEFAULT_VERB = 'sense'
const DEFAULT_ADVERB = 'now'
const DEFAULT_CONJUNCTION = 'and'
const DEFAULT_ARTICLE = 'the'
const DEFAULT_PREPOSITION = 'with'
const DEFAULT_CAP_ADJECTIVE = 'Present'
const DEFAULT_CAP_ARTICLE = 'The'
const DEFAULT_CAP_PREPOSITION = 'With'
const DEFAULT_STANCE_FALLBACK = 'perspective'
const DEFAULT_LAST_UTTERANCE_FALLBACK = 'what was said'
const ALPHABET_SMALL_THRESHOLD = 27
const ALPHABET_MEDIUM_THRESHOLD = 64
const ALPHABET_LARGE_THRESHOLD = 256
const SYMBOL_COUNT_SMALL = 3
const SYMBOL_COUNT_MEDIUM = 4
const SYMBOL_COUNT_LARGE = 8
const SYMBOL_COUNT_EXTRA_LARGE = 16
const HIGH_PLASTICITY_ENCODING_THRESHOLD = 0.8
const MAX_ALPHABET_BEFORE_EXTRA_SYMBOLS = 100
const EXTRA_SYMBOLS_FOR_HIGH_PLASTICITY = '♠♣♥♦♤♧♡♢'
const ENCODING_BASE_SAMPLE_SIZE = 3
const ENCODING_ALPHABET_SAMPLE_SIZE = 8
const MIN_SYMBOL_BASE_FOR_APPEND = 5
const DEFAULT_PLASTICITY_FALLBACK = 0.5
const DEFAULT_QUALITY_FALLBACK = 0.5
const MOVEMENT_HISTORY_LIMIT = 50
const MOVEMENT_HISTORY_WINDOW = 10
const DEFAULT_AUX = 'is'
const DEFAULT_MODAL = 'might'

function _capitalizeWord(w) {
  if (!w || typeof w !== 'string') return w
  return w.charAt(0).toUpperCase() + w.slice(1)
}

function _fixIndefiniteArticles(text) {
  if (!text || typeof text !== 'string') return text
  text = text.replace(/\b([Aa])\s+([aeiouAEIOU])/g, (m, article, next) => {
    const rep = article === 'A' ? 'An' : 'an'
    return `${rep} ${next}`
  })
  text = text.replace(/\b([Aa]n)\s+([^aeiouAEIOU\s])/g, (m, article, next) => {
    const rep = article[0] === 'A' ? 'A' : 'a'
    return `${rep} ${next}`
  })
  return text
}

function _buildPluralNounSet(iL) {
  const nouns = Array.isArray(iL?.nouns) ? iL.nouns : []
  const nounSet = new Set(nouns.filter(w => typeof w === 'string').map(w => w.toLowerCase()))
  const plurals = new Set()
  for (const n of nounSet) {
    if (n.endsWith('s') && !n.endsWith('ss')) {
      const singular = n.slice(0, -1)
      if (nounSet.has(singular)) {
        plurals.add(n)
        continue
      }
    }
    if (n.endsWith('ies')) {
      const singular = n.slice(0, -3) + 'y'
      if (nounSet.has(singular)) {
        plurals.add(n)
      }
    }
  }

  return plurals
}

function _fixAuxAgreement(text, iL) {
  if (!text || typeof text !== 'string') return text
  const pluralNouns = _buildPluralNounSet(iL)
  return text.replace(/\b([A-Za-z]+)\s+(is|Is)\b/g, (m, subj, aux) => {
    const lower = subj.toLowerCase()
    if (PLURAL_PRONOUNS.has(lower) || pluralNouns.has(lower)) {
      const replAux = aux === 'Is' ? 'Are' : 'are'
      return `${subj} ${replAux}`
    }
    return m
  })
}

function _conjugateVerb(base, form = 'bare', opts = {}) {
  if (!base || typeof base !== 'string') return base
  const v = base.toLowerCase()
  const irr = IRREGULAR_VERBS[v]
  const applyCap = (w) => (opts.capitalize ? _capitalizeWord(w) : w)
  if (irr) {
    if (form === 'bare') return applyCap(v)
    if (form === 'past') return applyCap(irr.past)
    if (form === 'part') return applyCap(irr.part || irr.past)
    if (form === 'gerund') return applyCap(irr.gerund)
    if (form === 's3') return applyCap(irr.s3 || v)
  }
  if (form === 'bare') return applyCap(v)
  if (form === 'gerund') {
    if (v.endsWith('e') && !v.endsWith('ee')) return applyCap(v.slice(0, -1) + 'ing')
    if (/[aeiou][bcdfghjklmnpqrstvwxyz]$/.test(v)) return applyCap(v + v.slice(-1) + 'ing')
    return applyCap(v + 'ing')
  }
  if (form === 'past' || form === 'part') {
    if (v.endsWith('e')) return applyCap(v + 'd')
    if (/[bcdfghjklmnpqrstvwxyz]y$/.test(v)) return applyCap(v.slice(0, -1) + 'ied')
    if (/[aeiou][bcdfghjklmnpqrstvwxyz]$/.test(v)) return applyCap(v + v.slice(-1) + 'ed')
    return applyCap(v + 'ed')
  }
  if (form === 's3') {
    if (v.endsWith('y') && /[bcdfghjklmnpqrstvwxyz]y$/.test(v)) return applyCap(v.slice(0, -1) + 'ies')
    if (/(s|x|z|ch|sh)$/.test(v)) return applyCap(v + 'es')
    return applyCap(v + 's')
  }
  return applyCap(v)
}

function _pickVerb(iL, fallbackVerb = DEFAULT_VERB) {
  const pool = Array.isArray(iL.verbs) && iL.verbs.length ? iL.verbs : [fallbackVerb]
  return pool[Math.floor(Math.random() * pool.length)]
}

export class Projections {
  constructor(themeConfig = {}, motifConfig = {}) {
    this.motif = new Motif(motifConfig)
    this.encoder = new Timeless()
    this.theme = this._buildTheme(themeConfig)
    this.currentState = DEFAULT_STATE
    this.movementHistory = []
  }

  _buildTheme(themeConfig = {}) {
    const dT = THEMES_DEFAULT, th = themeConfig.theme || DEFAULT_THEME_NAME
    let bT = dT[th]
    if (!bT) {
      console.warn(`Theme "${th}" not found, using "${DEFAULT_THEME_NAME}" theme`)
      bT = dT[DEFAULT_THEME_NAME]
    }
    return {
      name: th,
      stateLexicons: { ...bT.stateLexicons, ...(themeConfig.stateLexicons || {}) },
      syntaxPatterns: { ...bT.syntaxPatterns, ...(themeConfig.syntaxPatterns || {}) },
      encodingConfig: { ...(themeConfig.encodingConfig || {}) }
    }
  }

  update(input, context, deltaTime = 1.0, ctx = {}) {
    const mR = this.motif.update(input, context, deltaTime)
    const aM = mR.motifs
    this.currentState = this._determineDominantState(aM, mR.StP)
    let eS = this.currentState
    let mI = {}
    if (ctx.memeticInfluence) {
      const result = this._applyMemeticInfluence(ctx.memeticInfluence, mR.StP.plasticity)
      eS = result.expressedState
      mI = result.influenceApplied
    }
    const content = this._generateContent(eS, ctx, mI)
    const movement = this._generateMovementProfile(mR.StP, aM, mI)
    this._configureEncoding(mR.StP, mI)
    let encoded = null
    let decoded = null
    try {
      encoded = this.encoder.encodeString(content)
      decoded = this.encoder.decodeString(encoded)
      this.movementHistory.push({
        timestamp: Date.now(),
        state: this.currentState,
        expressedState: eS,
        movement,
        plasticity: mR.StP.plasticity,
        energy: context.energy || DEFAULT_ENERGY_LEVEL,
        memeticInfluence: mI
      })
    } catch (e) { console.error(e) }
    if (this.movementHistory.length > MOVEMENT_HISTORY_LIMIT) this.movementHistory.shift()
    return {
      content,
      encoded,
      decoded,
      state: this.currentState,
      expressedState: eS,
      movement,
      motifSummary: mR,
      encodingConfig: this.encoder.getState(),
      encodingSignature: this._getEncodingSignature(),
      movementHistory: this.getMovementEvolution(),
      memeticInfluence: mI
    }
  }

  _getEncodingSignature() {
    const st = this.encoder.getState(), base = this._symbolBase || [], alpha = st.alphabet || []
    return {
      base,
      baseSample: base.slice(0, ENCODING_BASE_SAMPLE_SIZE),
      alphabetSample: alpha.slice(0, ENCODING_ALPHABET_SAMPLE_SIZE),
      alphabetSize: alpha.length
    }
  }

  _applyMemeticInfluence(mI, plasticity) {
    if (!mI.shouldAdoptStance) return { expressedState: this.currentState, influenceApplied: { type: 'none', encoding: mI.encoding } }
    const susceptibility = plasticity * MEMETIC_SUSCEPTIBILITY_PLASTICITY_WEIGHT + (Math.random() * MEMETIC_SUSCEPTIBILITY_NOISE_RANGE)
    const influenceStrength = mI.strength || DEFAULT_MEMETIC_INFLUENCE_STRENGTH
    if (susceptibility > influenceStrength) {
      const blendFactor = Math.min(1, susceptibility * influenceStrength)
      const originalState = this.currentState
      const expressedState = Math.random() < blendFactor ? mI.dominantStance : this.currentState
      return {
        expressedState,
        influenceApplied: {
          type: 'stance_adoption',
          originalState,
          adoptedStance: mI.dominantStance,
          blendFactor,
          strength: influenceStrength,
          encoding: mI.encoding
        }
      }
    }
    return {
      expressedState: this.currentState,
      influenceApplied: {
        type: 'resisted',
        strength: influenceStrength,
        encoding: mI.encoding
      }
    }
  }

  _generateMovementProfile(sP, activeMotifs, mI = {}) {
    const stance = this.currentState, plasticity = sP.plasticity, quality = sP.quality
    const coherence = sP.coherence || DEFAULT_COHERENCE
    const energy = sP.framework?.energy || DEFAULT_ENERGY_LEVEL
    const movementBase = MOVEMENT_BASE[stance] || MOVEMENT_BASE.emerging
    let influencedMovement = { ...movementBase }
    if (mI.movementBleed && plasticity > LOW_PLASTICITY_THRESHOLD) {
      influencedMovement = this._blendMovementStyles(influencedMovement, mI.movementBleed, plasticity)
    }
    const modulatedMovement = {
      ...influencedMovement,
      intensity: clamp(influencedMovement.intensity * energy, MIN_MOVEMENT_INTENSITY, MAX_MOVEMENT_INTENSITY),
      fluidity: plasticity,
      precision: quality,
      complexity: sP.framework?.complexity || DEFAULT_COHERENCE,
      primaryGesture: this._selectGesture(stance, plasticity, energy, mI),
      movementPhrase: this._generateMovementPhrase(stance, plasticity, activeMotifs, mI),
      temporalPattern: this._calculateTemporalPattern(plasticity, energy, coherence),
      expressivity: (plasticity + energy) / 2,
      grounding: 1 - plasticity,
      connection: coherence,
      memeticInfluence: mI.movementBleed ? 'applied' : 'none'
    }
    return modulatedMovement
  }

  _blendMovementStyles(baseMovement, influence, plasticity) {
    const blendAmount = plasticity * MEMETIC_ADOPTION_BIAS_DEFAULT
    return {
      quality: Math.random() < blendAmount ? influence.quality : baseMovement.quality,
      amplitude: baseMovement.amplitude * (1 - blendAmount) + (influence.amplitude || baseMovement.amplitude) * blendAmount,
      rhythm: Math.random() < blendAmount ? influence.rhythm : baseMovement.rhythm,
      flow: Math.random() < blendAmount ? influence.flow : baseMovement.flow,
      spatial: Math.random() < blendAmount ? influence.spatial : baseMovement.spatial
    }
  }

  _selectGesture(stance, plasticity, energy, mI = {}) {
    const gestureLibraries = GESTURES
    let gestures = gestureLibraries[stance] || gestureLibraries.emerging
    if (mI.dominantGestures && Math.random() < plasticity * MEMETIC_GESTURE_ADOPTION_SCALE) gestures = [...gestures, ...mI.dominantGestures]
    const eI = Math.floor(energy * (gestures.length - 1))
    const p = plasticity > HIGH_PLASTICITY_THRESHOLD ? 'flexible ' : plasticity < LOW_PLASTICITY_THRESHOLD ? 'static ' : ''
    return p + gestures[eI]
  }

  _generateMovementPhrase(stance, plasticity, activeMotifs, mI = {}) {
    const movementVerbs = ACTIONS
    let verbs = movementVerbs[stance] || movementVerbs.emerging
    if (mI.dominantVerbs && Math.random() < plasticity * MEMETIC_VERB_ADOPTION_SCALE) {
      verbs = [...verbs, ...mI.dominantVerbs]
    }
    const motifCount = activeMotifs?.length || 1, phrase = []
    const complexity = Math.min(MAX_MOVEMENT_PHRASE_COMPLEXITY, Math.floor(motifCount * plasticity) + MOVEMENT_COMPLEXITY_BASE)
    for (let i = 0; i < complexity; i++) {
      const verb = verbs[Math.floor(Math.random() * verbs.length)]
      const modifier = this._getMovementModifier(plasticity, i)
      phrase.push(modifier + verb)
    }
    return phrase.join(' → ')
  }

  _getMovementModifier(plasticity, position) {
    if (plasticity > VERY_HIGH_PLASTICITY_THRESHOLD) return 'deliberately '
    if (plasticity > MID_PLASTICITY_THRESHOLD) return 'smoothly '
    if (plasticity < LOW_PLASTICITY_THRESHOLD) return 'accidentally '
    return position === 0 ? '' : 'then '
  }

  _calculateTemporalPattern(plasticity, energy, coherence) {
    return {
      tempo: TEMPORAL_TEMPO_BASE + (energy * TEMPORAL_TEMPO_ENERGY_WEIGHT),
      rhythm: plasticity > HIGH_PLASTICITY_THRESHOLD ? 'flowing' : plasticity < RHYTHM_LOW_PLASTICITY_THRESHOLD ? 'measured' : 'variable',
      duration: TEMPORAL_DURATION_BASE + (plasticity * TEMPORAL_DURATION_PLASTICITY_MULTIPLIER),
      syncopation: 1 - coherence
    }
  }

  getMovementEvolution() { return this.movementHistory.slice(-MOVEMENT_HISTORY_WINDOW) }

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

  _determineDominantState(aM, sP) {
    if (aM.length === 0) return DEFAULT_STATE
    const stateScores = { rut: 0, taste: 0, growth: 0, emerging: 0 }
    aM.forEach(motif => {
      const weight = motif.quality * motif.stability
      stateScores[motif.type] += weight
    })
    if (sP.plasticity > PLASTICITY_GROWTH_BONUS_THRESHOLD) stateScores.growth += PLASTICITY_GROWTH_BONUS
    if (sP.coherence > COHERENCE_TASTE_BONUS_THRESHOLD) stateScores.taste += COHERENCE_TASTE_BONUS
    return Object.entries(stateScores).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
  }

  _generateContent(state, ctx = {}, mI = {}) {
    const genCfg = ctx.generationConfig || {}
    const baseLexicon = this.theme.stateLexicons[state] || {}
    const lexicon = genCfg.lexicon && typeof genCfg.lexicon === 'object' ? this._mergeLexicon(baseLexicon, genCfg.lexicon) : baseLexicon
    const basePatterns = this.theme.syntaxPatterns[state] || []
    const gcTemplates = Array.isArray(genCfg.templates) ? genCfg.templates : []
    const patterns = this._mergePatterns(basePatterns, gcTemplates)
    let aP = patterns
    if (ctx.lastSpeaker && ctx.lastUtterance) {
      aP = patterns.filter(pattern => !pattern.includes('{otherSpeaker}') || ctx.lastSpeaker)
    } else {
      aP = patterns.filter(pattern => !pattern.includes('{otherSpeaker}') && !pattern.includes('{theirUtterance}'))
    }
    if (aP.length === 0) aP = patterns
    let sP = aP[Math.floor(Math.random() * aP.length)]
    if (mI.dominantPatterns && Math.random() < MEMETIC_PATTERN_INFLUENCE_PROBABILITY) {
      const memePatterns = mI.dominantPatterns.filter(p => aP.some(ap => ap.includes(p)))
      if (memePatterns.length > 0) sP = memePatterns[Math.floor(Math.random() * memePatterns.length)]
    }
    const pattern = sP
    const cA = this.encoder.getState().alphabet.join('')
    const fL = this._filterLexiconToAlphabet(lexicon, cA)
    const iL = this._applyLexicalInfluence(fL, mI)
    let content = pattern

    content = content.replace(/{adjective}/gi, () => {
      const words = iL.adjectives && iL.adjectives.length > 0 ? iL.adjectives : [DEFAULT_ADJECTIVE]
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{noun}/gi, () => {
      const words = iL.nouns && iL.nouns.length > 0 ? iL.nouns : [DEFAULT_NOUN]
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{verb}/gi, () => { return _conjugateVerb(_pickVerb(iL, DEFAULT_VERB), 'bare') })
    content = content.replace(/{verbPast}/gi, () => {
      const base = _pickVerb(iL, DEFAULT_VERB)
      return _conjugateVerb(base, 'past')
    })
    content = content.replace(/{VerbPast}/g, () => {
      const base = _pickVerb(iL, DEFAULT_VERB)
      return _conjugateVerb(base, 'past', { capitalize: true })
    })
    content = content.replace(/{verbGerund}/gi, () => {
      const base = _pickVerb(iL, DEFAULT_VERB)
      return _conjugateVerb(base, 'gerund')
    })
    content = content.replace(/{VerbGerund}/g, () => {
      const base = _pickVerb(iL, DEFAULT_VERB)
      return _conjugateVerb(base, 'gerund', { capitalize: true })
    })
    content = content.replace(/{verb3rd}/gi, () => {
      const base = _pickVerb(iL, DEFAULT_VERB)
      return _conjugateVerb(base, 's3')
    })
    content = content.replace(/{Verb3rd}/g, () => {
      const base = _pickVerb(iL, DEFAULT_VERB)
      return _conjugateVerb(base, 's3', { capitalize: true })
    })
    content = content.replace(/{verbPart}/gi, () => {
      const base = _pickVerb(iL, DEFAULT_VERB)
      return _conjugateVerb(base, 'part')
    })
    content = content.replace(/{VerbPart}/g, () => {
      const base = _pickVerb(iL, DEFAULT_VERB)
      return _conjugateVerb(base, 'part', { capitalize: true })
    })
    content = content.replace(/{toVerb}/gi, () => {
      const base = _pickVerb(iL, DEFAULT_VERB)
      return 'to ' + _conjugateVerb(base, 'bare')
    })
    content = content.replace(/{adverb}/gi, () => {
      const words = iL.adverbs && iL.adverbs.length > 0 ? iL.adverbs : [DEFAULT_ADVERB]
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{conjunction}/gi, () => {
      const words = iL.conjunctions && iL.conjunctions.length > 0 ? iL.conjunctions : [DEFAULT_CONJUNCTION]
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{aux}/gi, () => {
      const words = iL.auxiliaries && iL.auxiliaries.length > 0 ? iL.auxiliaries : [DEFAULT_AUX]
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{modal}/gi, () => {
      const words = iL.modals && iL.modals.length > 0 ? iL.modals : [DEFAULT_MODAL]
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{pronoun}/gi, () => {
      const words = iL.pronouns && iL.pronouns.length > 0 ? iL.pronouns : [DEFAULT_PRONOUN]
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{Pronoun}/gi, () => {
      const words = iL.pronouns && iL.pronouns.length > 0 ? iL.pronouns : [DEFAULT_PRONOUN]
      const word = words[Math.floor(Math.random() * words.length)]
      return _capitalizeWord(word)
    })
    content = content.replace(/{article}/gi, () => {
      const words = iL.articles && iL.articles.length > 0 ? iL.articles : [DEFAULT_ARTICLE]
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{Article}/g, () => {
      const words = iL.articles && iL.articles.length > 0 ? iL.articles : [DEFAULT_CAP_ARTICLE]
      const word = words[Math.floor(Math.random() * words.length)]
      return _capitalizeWord(word)
    })
    content = content.replace(/{preposition}/gi, () => {
      const words = iL.prepositions && iL.prepositions.length > 0 ? iL.prepositions : [DEFAULT_PREPOSITION]
      return words[Math.floor(Math.random() * words.length)]
    })
    content = content.replace(/{Preposition}/g, () => {
      const words = iL.prepositions && iL.prepositions.length > 0 ? iL.prepositions : [DEFAULT_CAP_PREPOSITION]
      const word = words[Math.floor(Math.random() * words.length)]
      return _capitalizeWord(word)
    })
    content = content.replace(/{otherSpeaker}/gi, () => { return ctx.lastSpeaker || DEFAULT_OTHER_SPEAKER_NAME })
    content = content.replace(/{theirUtterance}/gi, () => {
      if (ctx.lastUtterance) {
        const words = ctx.lastUtterance.split(' ')
        return (words.slice(0, LAST_UTTERANCE_PREVIEW_WORDS).join(' ') + (words.length > LAST_UTTERANCE_PREVIEW_WORDS ? '...' : ''))
      }
      return DEFAULT_LAST_UTTERANCE_FALLBACK
    })
    content = content.replace(/{theirStance}/gi, () => { return ctx.lastStance || DEFAULT_STANCE_FALLBACK })
    content = content.replace(/{Adjective}/, () => {
      const words = iL.adjectives && iL.adjectives.length > 0 ? iL.adjectives : [DEFAULT_CAP_ADJECTIVE]
      const word = words[Math.floor(Math.random() * words.length)]
      return _capitalizeWord(word)
    })
    content = _fixIndefiniteArticles(content)
    content = _fixAuxAgreement(content, iL)
    content = this._sanitizeToAlphabet(content, cA)
    if (!content.match(/^{Adjective}/)) content = _capitalizeWord(content)
    return content
  }

  _applyLexicalInfluence(lexicon, mI) {
    if (!mI.dominantWords) return lexicon
    const influenced = { ...lexicon }
    const sourceKeys = new Set([
      ...Object.keys(lexicon || {}),
      ...Object.keys(mI.dominantWords || {}),
      ...CATEGORIES
    ])
    for (const category of sourceKeys) {
      if (!category) continue
      const base = Array.isArray(influenced[category]) ? influenced[category] : (influenced[category] || [])
      const extra = mI.dominantWords[category]
      if (Array.isArray(extra) && extra.length) {
        influenced[category] = [...base, ...extra]
      } else if (!influenced[category]) {
        influenced[category] = base
      }
    }
    return influenced
  }

  _filterLexiconToAlphabet(lexicon, alphabet) {
    const f = {}, a = new Set(alphabet)
    const keys = new Set([...Object.keys(lexicon || {}), ...CATEGORIES])
    for (const category of keys) {
      if (!category) continue
      if (lexicon && Array.isArray(lexicon[category])) {
        f[category] = lexicon[category].filter(word => word.split('').every(char => a.has(char)))
      } else {
        f[category] = []
      }
    }
    return f
  }

  _sanitizeToAlphabet(text, alpha) {
    const a = new Set(alpha)
    return text.split('').filter(char => a.has(char)).join('')
  }

  _configureEncoding(sP, mI = {}) {
    const p = sP.plasticity
    const alphabet = this.theme.encodingConfig?.emerging?.alphabet || BASE_ALPHA.emerging
    let symbols
    if (this._symbolBase && this._symbolBaseState === this.currentState) {
      symbols = this._symbolBase
    } else {
      symbols = this.theme.encodingConfig?.[this.currentState]?.symbols || FALLBACK_SETS[this.currentState]
      this._symbolBaseState = this.currentState
    }
    symbols = this._validateSymbolsForAlphabet(symbols, alphabet)
    this.encoder.setSymbols(symbols)
    this._symbolBase = symbols
    if (p > HIGH_PLASTICITY_ENCODING_THRESHOLD && this.currentState !== 'rut') {
      const st = this.encoder.getState(), cA = st.alphabet.join('')
      if (cA.length < MAX_ALPHABET_BEFORE_EXTRA_SYMBOLS) { this.encoder.setAlphabet(cA + EXTRA_SYMBOLS_FOR_HIGH_PLASTICITY) }
    }
    if (mI && mI.encoding) this._applyEncodingMemetics(sP, mI.encoding)
  }

  _applyEncodingMemetics(StP, eM = {}) {
    if (!eM) return
    const p = StP.plasticity || DEFAULT_PLASTICITY_FALLBACK
    const q = StP.quality || DEFAULT_QUALITY_FALLBACK
    if (p < DEFAULT_PLASTICITY_FALLBACK || q < DEFAULT_QUALITY_FALLBACK) return
    const aB = eM.adoptionBias || MEMETIC_ADOPTION_BIAS_DEFAULT
    const adoptChance = Math.min(1, p * q * aB)
    if (Math.random() > adoptChance) return
    const base = this._symbolBase || []
    const donorBase = (eM.baseSample && eM.baseSample.length) ? eM.baseSample : eM.baseFull
    if (!donorBase || !donorBase.length) return
    const dIdx = Math.floor(Math.random() * donorBase.length)
    const donor = donorBase[dIdx]
    let nb = base.slice()
    if (!nb.length) nb = donorBase.slice(0, ENCODING_BASE_SAMPLE_SIZE)
    else if (nb.length < MIN_SYMBOL_BASE_FOR_APPEND) nb.push(donor)
    else nb[Math.floor(Math.random() * nb.length)] = donor
    this._symbolBase = nb
    this.encoder.setSymbols(nb)
    if (eM.alphabetSample && Math.random() < adoptChance * MEMETIC_ALPHABET_ADOPTION_SCALE) {
      const st = this.encoder.getState()
      const cur = (st.alphabet || []).join('')
      const d = eM.alphabetSample[Math.floor(Math.random() * eM.alphabetSample.length)]
      if (d && !cur.includes(d)) this.encoder.setAlphabet(cur + d)
    }
  }

  _validateSymbolsForAlphabet(symbols, alpha) {
    const a = alpha.length, requiredSymbols = this._calculateMinimumSymbols(a)
    if (symbols.length >= requiredSymbols) return symbols
    console.warn(`Insufficient symbols (${symbols.length}) for alphabet size ${a}. ` + `Required: ${requiredSymbols}. Using fallback.`)
    return this._generateFallbackSymbols(requiredSymbols, this.currentState)
  }

  _calculateMinimumSymbols(a) {
    if (a <= ALPHABET_SMALL_THRESHOLD) return SYMBOL_COUNT_SMALL
    if (a <= ALPHABET_MEDIUM_THRESHOLD) return SYMBOL_COUNT_MEDIUM
    if (a <= ALPHABET_LARGE_THRESHOLD) return SYMBOL_COUNT_LARGE
    return SYMBOL_COUNT_EXTRA_LARGE
  }

  _generateFallbackSymbols(count, state) {
    const bS = FALLBACK_SETS[state] || FALLBACK_SETS.emerging, r = [...bS]
    while (r.length < count) { r.push(r[r.length % bS.length] + '') }
    return r.slice(0, count)
  }

  _mergePatterns(basePatterns, extraPatterns) {
    const base = Array.isArray(basePatterns) ? basePatterns : []
    const extra = Array.isArray(extraPatterns) ? extraPatterns : []
    if (!extra.length) return base
    const seen = new Set()
    const out = []
    for (const p of extra) {
      if (!p || seen.has(p)) continue
      seen.add(p)
      out.push(p)
    }
    for (const p of base) {
      if (!p || seen.has(p)) continue
      seen.add(p)
      out.push(p)
    }
    return out
  }

  _mergeLexicon(baseLex = {}, extraLex = {}) {
    const merged = {}
    const keys = new Set([
      ...Object.keys(baseLex || {}),
      ...Object.keys(extraLex || {})
    ])
    for (const key of keys) {
      const baseArr = Array.isArray(baseLex[key]) ? baseLex[key] : []
      const extraArr = Array.isArray(extraLex[key]) ? extraLex[key] : []
      const seen = new Set()
      merged[key] = [...extraArr, ...baseArr].filter(tok => {
        if (!tok || seen.has(tok)) return false
        seen.add(tok)
        return true
      })
    }
    return merged
  }

  getThemeInfo() {
    if (!this.theme) return { name: 'unknown', availableStates: [], patternCounts: {} }
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