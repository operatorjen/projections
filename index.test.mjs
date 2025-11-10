import { Projections } from './index.mjs'

const themes = ['cognitive', 'philosophical', 'aesthetic', 'technical']

const testScenarios = [
  { complexity: 0.3, novelty: 0.1, content: 'simple repetitive input' },
  { complexity: 0.8, novelty: 0.2, content: 'complex but familiar pattern' },
  { complexity: 0.6, novelty: 0.7, content: 'moderately complex novel input' },
  { complexity: 0.9, novelty: 0.9, content: 'highly complex novel synthesis' }
]

const memeticInfluenceCases = {
  strongInfluence: {
    memeticInfluence: {
      shouldAdoptStance: true,
      dominantStance: 'growth',
      strength: 0.8,
      movementBleed: {
        quality: 'expansive',
        amplitude: 0.9,
        rhythm: 'flowing',
        flow: 'continuous',
        spatial: 'extended'
      },
      dominantGestures: ['expanding presence', 'rising motion', 'unfolding arms'],
      dominantVerbs: ['growing', 'expanding', 'rising'],
      dominantPatterns: ['As my {noun} expands', 'Through {adjective} growth'],
      dominantWords: {
        adjectives: ['expansive', 'growing', 'maturing'],
        nouns: ['capacity', 'potential', 'horizon']
      }
    }
  },
  weakInfluence: {
    memeticInfluence: {
      shouldAdoptStance: false,
      strength: 0.3,
      movementBleed: {
        quality: 'exploratory',
        amplitude: 0.6
      }
    }
  },
  mixedInfluence: {
    memeticInfluence: {
      shouldAdoptStance: true,
      dominantStance: 'taste',
      strength: 0.6,
      movementBleed: {
        quality: 'refined',
        rhythm: 'precise'
      },
      dominantGestures: ['subtle adjustment', 'balanced positioning'],
      dominantWords: {
        adjectives: ['refined', 'balanced'],
        verbs: ['harmonize', 'integrate']
      }
    }
  }
}

const customEncodingConfigs = {
  insufficient: {
    encodingConfig: {
      taste: {
        symbols: ['💎'],
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\''
      }
    }
  },
  customSymbolsComprehensive: {
    encodingConfig: {
      rut: {
        symbols: ['⬛', '⬜', '🔲', '🔳'],
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .,!?'
      },
      taste: {
        symbols: ['🎵', '🎨', '📚', '🎭', '🔍'],
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .,!?\''
      },
      growth: {
        symbols: ['🚀', '🌟', '💡', '🔬', '📈', '💫'],
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789\''
      },
      emerging: {
        symbols: ['.', '-', '+', '=', '*'],
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\' .'
      }
    }
  },
  robustExpansion: {
    encodingConfig: {
      rut: {
        symbols: ['·', '•', '◦', '○', '■', '□', '▪', '▫'],
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .,!?'
      },
      taste: {
        symbols: ['💎', '🌊', '🎭', '🔮', '⚖️', '🎯', '🧠', '🌟'],
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .,!?\'-'
      },
      growth: {
        symbols: ['🌈', '🔍', '💡', '🎯', '🌟', '✨', '🔥', '⚡'],
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789.,!?\'-'
      },
      emerging: {
        symbols: ['.', '-', '+', '=', '*', '|', ':', ';'],
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\' .'
      }
    }
  }
}

function validateContentAgainstAlphabet(content, alphabet) {
  const alphabetSet = new Set(alphabet)
  const invalidChars = []
  const valid = content.split('').every(char => {
    if (alphabetSet.has(char)) {
      return true
    } else {
      invalidChars.push(char)
      return false
    }
  })
  return {
    valid,
    invalidChars: [...new Set(invalidChars)],
    validChars: content.split('').filter(char => alphabetSet.has(char)).join('')
  }
}

function analyzeEncodingState(encoderState) {
  const alphabet = encoderState.alphabet.join('')
  const symbols = encoderState.base.join(', ')
  const digits = encoderState.digits
  const alphabetSize = alphabet.length
  const minRequiredSymbols = calculateMinimumSymbols(alphabetSize)
  const hasSufficientSymbols = encoderState.base.length >= minRequiredSymbols
  return {
    alphabet,
    symbols,
    digits,
    alphabetSize,
    minRequiredSymbols,
    hasSufficientSymbols,
    symbolCount: encoderState.base.length
  }
}

function calculateMinimumSymbols(alphabetSize) {
  if (alphabetSize <= 16) return 2
  if (alphabetSize <= 64) return 4
  if (alphabetSize <= 256) return 8
  return 16
}

function displayMovementAnalysis(movement) {
  return `${movement.quality.toUpperCase()} | ${movement.primaryGesture} | ${movement.movementPhrase} | Intensity: ${movement.intensity.toFixed(2)}`
}

async function projectionsTest() {
  console.log('STANDARD THEMES TEST')
  console.log('='.repeat(50))
  for (const theme of themes) {
    console.log(`\nTESTING ${theme.toUpperCase()} THEME`)
    console.log('-'.repeat(40))
    const testRunner = new Projections({ theme: theme })
    const themeInfo = testRunner.getThemeInfo()
    console.log(`Theme: ${themeInfo.name}`)
    console.log(`Available states: ${themeInfo.availableStates.join(', ')}`)
    for (let i = 0; i < 2; i++) {
      const scenario = testScenarios[Math.floor(Math.random() * testScenarios.length)]
      const context = {
        framework: {
          complexity: 0.5 + Math.random() * 0.3,
          coherence: 0.4 + Math.random() * 0.4,
          adaptability: 0.3 + Math.random() * 0.5
        }
      }
      const conversationContext = {
        lastSpeaker: 'TestAgent',
        lastUtterance: 'Previous test utterance',
        lastStance: 'emerging'
      }
      try {
        const result = testRunner.update(scenario, context, 1.0, conversationContext)
        const encodingState = analyzeEncodingState(testRunner.encoder.getState())
        const validation = validateContentAgainstAlphabet(result.content, encodingState.alphabet)
        console.log(`\nCycle ${i + 1}`)
        console.log(`Internal State: ${result.state.toUpperCase()}`)
        if (result.expressedState && result.expressedState !== result.state) {
          console.log(`Expressed State: ${result.expressedState.toUpperCase()} 🔄`)
        }
        console.log(`Input: ${scenario.content}`)
        console.log(`Output: "${result.content}"`)
        console.log(displayMovementAnalysis(result.movement))
        console.log(`Alphabet: ${encodingState.alphabetSize} chars (${encodingState.alphabet.substring(0, 50)}${encodingState.alphabetSize > 50 ? '...' : ''})`)
        if (!validation.valid) {
          console.log(`Invalid characters: ${validation.invalidChars.map(c => `'${c}'`).join(', ')}`)
          console.log(`Valid portion: "${validation.validChars}"`)
        }
        console.log(`Encoded: ${result.encoded}`)
        try {
          const decoded = testRunner.encoder.decodeString(result.encoded)
          console.log(`Decoded: "${decoded}"`)
          console.log(`Round-trip match: ${result.content === decoded ? '✅' : '❌'}`)
        } catch (e) { console.log(`Decode error: ${e.message}`) }
      } catch (error) { console.log(`Error: ${error.message}`) }
    }
    const finalState = testRunner.getState()
    console.log(`\nFinal state: ${finalState.currentState}`)
    console.log(`Active motifs: ${finalState.motifSummary.totalMotifs}`)
    const movementEvolution = testRunner.getMovementEvolution()
    if (movementEvolution.length > 0) {
      console.log(`Movement evolution: ${movementEvolution.length} records tracked`)
    }
  }
}

async function testMemeticInfluence() {
  console.log('\n\nMEMETIC INFLUENCE TESTS')
  console.log('='.repeat(50))
  const testRunner = new Projections({ theme: 'cognitive' })
  for (const [influenceName, influenceCase] of Object.entries(memeticInfluenceCases)) {
    console.log(`\nTESTING ${influenceName.toUpperCase()} INFLUENCE`)
    console.log('-'.repeat(40))
    const scenario = testScenarios[Math.floor(Math.random() * testScenarios.length)]
    const context = {
      framework: {
        complexity: 0.7,
        coherence: 0.6,
        adaptability: 0.5
      },
      plasticity: influenceCase.memeticInfluence.strength + 0.1
    }
    const conversationContext = {
      lastSpeaker: 'OtherAgent',
      lastUtterance: 'We should consider this approach',
      lastStance: influenceCase.memeticInfluence.dominantStance || 'emerging',
      ...influenceCase
    }
    try {
      const result = testRunner.update(scenario, context, 1.0, conversationContext)
      console.log(`Input: ${scenario.content}`)
      console.log(`Internal State: ${result.state.toUpperCase()}`)
      console.log(`Expressed State: ${result.expressedState.toUpperCase()}`)
      console.log(`Output: "${result.content}"`)
      console.log(displayMovementAnalysis(result.movement))
      const influence = result.memeticInfluence
      console.log(`\nMemetic Analysis:`)
      console.log(`  Type: ${influence.type}`)
      if (influence.type === 'stance_adoption') {
        console.log(`  Change: ${influence.originalState} → ${influence.adoptedStance}`)
        console.log(`  Blend Factor: ${influence.blendFactor.toFixed(2)}`)
        console.log(`  Strength: ${influence.strength.toFixed(2)}`)
      } else if (influence.type === 'resisted') {
        console.log(`  Resistance: Agent resisted influence (plasticity: ${context.plasticity.toFixed(2)})`)
      }
      if (result.movement.memeticInfluence === 'applied') {
        console.log(`  Movement: Memetic influence applied`)
      }
      const stateAlignment = result.state === result.expressedState ? 'aligned' : 'influenced'
      console.log(`  State Alignment: ${stateAlignment}`)

    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }
}

async function testAlphabetEdgeCases() {
  console.log('\n\nALPHABET EDGE CASE TESTS')
  console.log('='.repeat(50))
  const testRunner = new Projections({ theme: 'cognitive' })
  const scenario = testScenarios[0]
  const context = {
    framework: { complexity: 0.7, coherence: 0.6, adaptability: 0.5 },
    plasticity: 0.8
  }
  try {
    const result = testRunner.update(scenario, context)
    const encodingState = analyzeEncodingState(testRunner.encoder.getState())
    const validation = validateContentAgainstAlphabet(result.content, encodingState.alphabet)
    console.log(`State: ${result.state}`)
    console.log(`Alphabet: "${encodingState.alphabet}"`)
    console.log(`Symbols: ${encodingState.symbolCount}, Required: ${encodingState.minRequiredSymbols}`)
    console.log(`Generated: "${result.content}"`)
    console.log(displayMovementAnalysis(result.movement))
    console.log(`Content valid: ${validation.valid ? '✅' : '❌'}`)
    if (!validation.valid) {
      console.log(`This is EXPECTED - lexicon was filtered to empty, using fallback words`)
      console.log(`Invalid chars: ${validation.invalidChars.map(c => `'${c}'`).join(', ')}`)
    }
    const hasFallbackWords = result.content.includes('present') || result.content.includes('form') ||
      result.content.includes('is') || result.content.includes('now')
    console.log(`Fallback words used: ${hasFallbackWords ? '✅' : '❌'}`)
  } catch (error) {
    console.log(`Error (expected for edge case): ${error.message}`)
  }
}

async function testAlphabetExpansion() {
  console.log('\n\nTESTING ALPHABET EXPANSION WITH PLASTICITY')
  console.log('='.repeat(50))
  const themeConfig = {
    theme: 'technical',
    encodingConfig: customEncodingConfigs.robustExpansion.encodingConfig
  }
  const testRunner = new Projections()
  testRunner.setTheme(themeConfig)
  const initialEncoding = analyzeEncodingState(testRunner.encoder.getState())
  let expansionDetected = false
  for (let i = 0; i < 3; i++) {
    const scenario = testScenarios[2]
    const context = {
      framework: {
        complexity: 0.9,
        coherence: 0.8,
        adaptability: 0.9
      },
      plasticity: 0.95
    }
    try {
      const result = testRunner.update(scenario, context)
      const encodingState = analyzeEncodingState(testRunner.encoder.getState())
      const validation = validateContentAgainstAlphabet(result.content, encodingState.alphabet)
      console.log(`\nCycle ${i + 1} [Plasticity: ${context.plasticity}, State: ${result.state}]`)
      console.log(`Alphabet: ${encodingState.alphabetSize} chars`)
      console.log(`Symbols: ${encodingState.symbolCount}, Required: ${encodingState.minRequiredSymbols}`)
      console.log(`Sufficient symbols: ${encodingState.hasSufficientSymbols ? '✅' : '❌'}`)
      console.log(`Contains expansion chars: ${encodingState.alphabet.includes('♠') ? '✅' : '❌'}`)
      console.log(`Generated: "${result.content}"`)
      console.log(displayMovementAnalysis(result.movement))
      console.log(`Content valid: ${validation.valid ? '✅' : '❌'}`)
      if (encodingState.alphabetSize > initialEncoding.alphabetSize) {
        expansionDetected = true
        console.log(`📈 Alphabet expanded from ${initialEncoding.alphabetSize} to ${encodingState.alphabetSize} chars`)
      }
      if (!encodingState.hasSufficientSymbols) console.log(`⚠️  Warning: Insufficient symbols for current alphabet`)
      try {
        const decoded = testRunner.encoder.decodeString(result.encoded)
        console.log(`Round-trip encoding: ${result.content === decoded ? '✅' : '❌'}`)
      } catch (e) {
        console.log(`❌ Encoding error: ${e.message}`)
      }
    } catch (error) {
      console.log(`❌ Update error: ${error.message}`)
    }
  }
}

async function testMovementEvolution() {
  console.log('\n\nMOVEMENT EVOLUTION TRACKING')
  console.log('='.repeat(50))
  const testRunner = new Projections({ theme: 'cognitive' })

  console.log('Tracking movement evolution over 5 cycles...\n')
  for (let i = 0; i < 5; i++) {
    const scenario = testScenarios[Math.floor(Math.random() * testScenarios.length)]
    const context = {
      framework: {
        complexity: 0.5 + Math.random() * 0.3,
        coherence: 0.4 + Math.random() * 0.4,
        adaptability: 0.3 + Math.random() * 0.5
      },
      plasticity: 0.6 + Math.random() * 0.3
    }
    const result = testRunner.update(scenario, context)
    console.log(`Cycle ${i + 1}: ${result.state} → ${displayMovementAnalysis(result.movement)}`)
  }

  const evolution = testRunner.getMovementEvolution()
  console.log(`\nMovement Evolution Summary (last ${evolution.length} records):`)
  evolution.forEach((record, index) => {
    console.log(`  ${index + 1}. ${record.state} | ${record.movement.quality} | ${record.movement.primaryGesture}`)
  })

  const signature = testRunner.getMovementSignature()
  if (signature) {
    console.log(`\nCurrent Movement Signature:`)
    console.log(`  State: ${signature.state}`)
    console.log(`  Expressed: ${signature.expressedState}`)
    console.log(`  Gesture: ${signature.primaryGesture}`)
    console.log(`  Quality: ${signature.movementQuality}`)
    console.log(`  Intensity: ${signature.intensity.toFixed(2)}`)
  }
}

async function runAllTests() {
  await projectionsTest()
  await testMemeticInfluence()
  await testMovementEvolution()
  await testAlphabetEdgeCases()
  await testAlphabetExpansion()
}

runAllTests().catch(console.error)