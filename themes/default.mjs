export const THEMES_DEFAULT = {
  cognitive: {
    stateLexicons: {
      rut: {
        adjectives: ['stuck', 'rigid', 'predictable', 'monotonous', 'frustrating', 'limiting', 'dull', 'unchanging'],
        nouns: ['routine', 'pattern', 'cycle', 'habit', 'loop', 'groove', 'stagnation', 'trap'],
        verbs: ['feel', 'notice', 'experience', 'find', 'recognize', 'sense', 'realize', 'confront'],
        adverbs: ['constantly', 'repeatedly', 'predictably', 'monotonously', 'frustratingly', 'inevitably'],
        conjunctions: []
      },
      taste: {
        adjectives: ['refined', 'discerning', 'subtle', 'perceptive', 'precise', 'intuitive', 'astute', 'balanced'],
        nouns: ['clarity', 'insight', 'perspective', 'judgment', 'discernment', 'awareness', 'understanding', 'comprehension'],
        verbs: ['appreciate', 'grasp', 'discern', 'comprehend', 'perceive', 'understand', 'recognize', 'distinguish'],
        adverbs: ['clearly', 'deeply', 'intuitively', 'exactly', 'sharply', 'subtly'],
        conjunctions: ['while', 'although', 'whereas', 'nevertheless', 'consequently', 'furthermore']
      },
      growth: {
        adjectives: ['expansive', 'adaptive', 'progressive', 'transformative', 'maturing', 'fluid', 'generative', 'broadening'],
        nouns: ['insight', 'capacity', 'awareness', 'skill', 'understanding', 'perspective', 'clarity', 'imagination'],
        verbs: ['uncover', 'expand', 'refine', 'cultivate', 'strengthen', 'elevate', 'integrate'],
        adverbs: ['steadily', 'quietly', 'distinctly', 'gradually', 'notably', 'remarkably'],
        conjunctions: ['as', 'while', 'although', 'despite', 'consequently', 'moreover']
      },
      emerging: {
        adjectives: ['new', 'nascent', 'subtle', 'incipient', 'awakening', 'formative', 'fresh', 'growing'],
        nouns: ['feeling', 'intuition', 'realization', 'impression', 'notion', 'idea', 'awareness', 'hint'],
        verbs: ['notice', 'sense', 'perceive', 'detect', 'glimpse', 'grasp', 'catch', 'discover'],
        adverbs: ['faintly', 'subtly', 'gradually', 'slowly', 'gently', 'increasingly']
      }
    },
    syntaxPatterns: {
      rut: [
        "I feel {adjective}.",
        "This {noun} feels {adjective}.",
        "Everything seems {adjective}.",
        "I keep falling into the same {noun}."
      ],
      taste: [
        "My {adjective} {noun} helps me {adverb} {verb} patterns beneath the surface.",
        "Through {adjective} discernment, I can {verb} what others overlook, {conjunction} this opens new {noun}.",
        "I {adverb} {verb} the {adjective} nuances, {conjunction} this {noun} deepens my perception.",
        "The {adjective} {noun} lets me {verb} the structure with balance and clarity."
      ],
      growth: [
        "As my {noun} expands, I {adverb} {verb} new {adjective} directions.",
        "I notice {adjective} changes in my {noun}, {conjunction} this reveals fresh {noun}.",
        "My {adjective} {noun} is {adverb} taking form beyond what I had imagined.",
        "Through {adjective} reflection, I begin to {verb} in broader ways."
      ],
      emerging: [
        "Something {adjective} is taking shape.",
        "I sense a {adjective} {noun} forming.",
        "New {noun} appears at the edges of awareness.",
        "I\'m starting to {verb} differently."
      ]
    }
  },
  philosophical: {
    stateLexicons: {
      rut: {
        adjectives: ['determined', 'fated', 'inevitable', 'fixed', 'bound', 'static', 'confined', 'unchangeable'],
        nouns: ['path', 'destiny', 'fate', 'pattern', 'cycle', 'reality', 'order', 'law'],
        verbs: ['accept', 'recognize', 'acknowledge', 'perceive', 'understand', 'realize', 'contemplate', 'grasp'],
        adverbs: ['inevitably', 'necessarily', 'unavoidably', 'inescapably', 'fatedly', 'naturally'],
        pronouns: ['I'],
        conjunctions: []
      },
      taste: {
        adjectives: ['harmonious', 'balanced', 'coherent', 'unified', 'resolved', 'integrative', 'consistent', 'whole'],
        nouns: ['understanding', 'awareness', 'realization', 'insight', 'clarity', 'truth', 'perspective', 'concept'],
        verbs: ['comprehend', 'grasp', 'see', 'perceive', 'apprehend', 'discern', 'reflect', 'recognize'],
        adverbs: ['clearly', 'deeply', 'completely', 'thoroughly', 'profoundly', 'thoughtfully'],
        pronouns: ['I', 'You'],
        conjunctions: ['whereas', 'nevertheless', 'conversely', 'accordingly', 'thus', 'furthermore']
      },
      growth: {
        adjectives: ['transformative', 'evolving', 'transcendent', 'progressive', 'reflective', 'expansive', 'enlightened', 'maturing'],
        nouns: ['consciousness', 'awareness', 'understanding', 'wisdom', 'truth', 'mind', 'insight', 'clarity'],
        verbs: ['observe', 'experience', 'discover', 'recognize', 'realize', 'contemplate', 'expand', 'transcend'],
        adverbs: ['profoundly', 'deeply', 'steadily', 'notably', 'gently', 'significantly'],
        pronouns: ['I', 'You'],
        conjunctions: ['while', 'although', 'despite', 'therefore', 'moreover', 'consequently']
      },
      emerging: {
        adjectives: ['nascent', 'developed', 'incipient', 'awakening', 'formative', 'embryonic', 'initialized', 'potential'],
        nouns: ['idea', 'concept', 'awareness', 'realization', 'insight', 'sense', 'understanding', 'truth'],
        verbs: ['notice', 'sense', 'perceive', 'detect', 'intuit', 'recognize', 'glimpse', 'grasp'],
        adverbs: ['gently', 'subtly', 'gradually', 'slowly', 'quietly', 'increasingly'],
        pronouns: ['I', 'You'],
        conjunctions: []
      }
    },
    syntaxPatterns: {
      rut: [
        "This feels {adjective}.",
        "My {noun} appears {adjective}.",
        "{Pronoun} see my {noun} as {adjective}.",
        "Reality seems caught in {noun}."
      ],
      taste: [
        "My {adjective} {noun} lets me {verb} deeper structures, {conjunction} it brings new {noun}.",
        "Through {adjective} thought, {pronoun} {verb} how {noun} unfolds, {conjunction} each layer reveals meaning.",
        "{pronoun} {adverb} {verb} the {adjective} order of things, {conjunction} it reshapes my {noun}.",
        "The {adjective} {noun} I\'ve cultivated helps me {verb} the essence of being."
      ],
      growth: [
        "As my {noun} expands, I {adverb} {verb} {adjective} truths.",
        "I\'m finding that {adjective} clarity comes through {noun}.",
        "My growing {noun} shows that {adjective} understanding follows reflection.",
        "Through {adjective} inquiry, I discover deeper {noun}."
      ],
      emerging: [
        "A new {adjective} idea is forming.",
        "{Pronoun} perceive a new {noun} awakening.",
        "My perception is shifting quietly.",
        "Something {adjective} stirs within awareness."
      ]
    }
  },
  aesthetic: {
    stateLexicons: {
      rut: {
        adjectives: ['formulaic', 'derivative', 'uninspired', 'stale', 'rigid', 'ordinary', 'predictable', 'flat'],
        nouns: ['approach', 'style', 'technique', 'pattern', 'formula', 'habit', 'process', 'expression'],
        verbs: ['repeat', 'imitate', 'follow', 'replicate', 'notice', 'maintain', 'apply', 'return'],
        adverbs: ['routinely', 'habitually', 'predictably', 'mechanically', 'consistently', 'steadily'],
        conjunctions: []
      },
      taste: {
        adjectives: ['refined', 'elegant', 'balanced', 'harmonious', 'subtle', 'sensitive', 'discerning', 'poised'],
        nouns: ['taste', 'appreciation', 'judgment', 'vision', 'style', 'composition', 'form', 'harmony'],
        verbs: ['appreciate', 'recognize', 'discern', 'balance', 'refine', 'compose', 'envision', 'perceive'],
        adverbs: ['gracefully', 'naturally', 'intuitively', 'gently', 'smoothly', 'fluidly'],
        pronouns: ['I', 'You'],
        conjunctions: ['while', 'although', 'whereas', 'nevertheless', 'consequently', 'furthermore']
      },
      growth: {
        adjectives: ['expanding', 'maturing', 'evolving', 'refined', 'cohesive', 'adaptive', 'transformative', 'expressive'],
        nouns: ['perception', 'awareness', 'vision', 'sense', 'expression', 'taste', 'creativity', 'imagination'],
        verbs: ['observe', 'develop', 'refine', 'expand', 'discover', 'experiment', 'cultivate', 'shape'],
        adverbs: ['notably', 'gradually', 'strikingly', 'remarkably', 'naturally', 'gently'],
        pronouns: ['I', 'You'],
        conjunctions: ['as', 'while', 'although', 'despite', 'therefore', 'moreover']
      },
      emerging: {
        adjectives: ['new', 'nascent', 'fresh', 'incipient', 'rising', 'delicate', 'promising', 'tentative'],
        nouns: ['vision', 'sense', 'style', 'idea', 'concept', 'awareness', 'pattern', 'expression'],
        verbs: ['notice', 'feel', 'perceive', 'detect', 'catch', 'discover', 'recognize', 'glimpse'],
        adverbs: ['faintly', 'subtly', 'slowly', 'gently', 'gradually', 'increasingly'],
        pronouns: ['I', 'You'],
        conjunctions: []
      }
    },
    syntaxPatterns: {
      rut: [
        "My {noun} feels {adjective}.",
        "Everything looks {adjective}.",
        "I see the same {noun} repeated.",
        "My {noun} has grown {adjective}."
      ],
      taste: [
        "My {adjective} {noun} allows me to {adverb} {verb} hidden structures, {conjunction} this reveals deeper {noun}.",
        "Through {adjective} balance, I {verb} subtle harmonies, {conjunction} my sense of {noun} expands.",
        "{Pronoun} {adverb} {verb} how {adjective} details form {adjective} unity, {conjunction} it refines my {noun}.",
        "A {adjective} {noun} gives perception a {adjective} depth of beauty."
      ],
      growth: [
        "As my {noun} matures, I {adverb} {verb} {adjective} expressions of form.",
        "I\'m finding that {adjective} artistry unfolds through {noun}.",
        "My evolving {noun} reveals new ways to {verb} what I create.",
        "Through {adjective} awareness, I see my {noun} {adverb} expanding."
      ],
      emerging: [
        "A {adjective} sense is awakening.",
        "{Pronoun} notice new {noun} formations.",
        "My perception shifts in a gradual, {adjective} way.",
        "Something {adjective} begins to appear."
      ]
    }
  },
  technical: {
    stateLexicons: {
      rut: {
        adjectives: ['repetitive', 'routine', 'mechanical', 'predictable', 'rigid', 'standardized', 'formulaic', 'unvaried'],
        nouns: ['processes', 'workflows', 'patterns', 'routines', 'protocols', 'systems', 'loops', 'methods'],
        verbs: ['repeat', 'execute', 'follow', 'apply', 'observe', 'detect', 'maintain', 'operate'],
        adverbs: ['systematically', 'mechanically', 'regularly', 'consistently', 'predictably', 'steadily'],
        conjunctions: []
      },
      taste: {
        adjectives: ['efficient', 'precise', 'elegant', 'streamlined', 'optimized', 'accurate', 'refined', 'robust'],
        nouns: ['mastery', 'skill', 'competence', 'understanding', 'architecture', 'design', 'framework', 'system'],
        verbs: ['analyze', 'refine', 'optimize', 'construct', 'grasp', 'implement', 'develop', 'understand'],
        adverbs: ['precisely', 'effectively', 'methodically', 'expertly', 'clearly', 'coherently'],
        conjunctions: ['while', 'although', 'whereas', 'nevertheless', 'consequently', 'furthermore']
      },
      growth: {
        adjectives: ['adaptive', 'innovative', 'progressive', 'refined', 'iterative', 'expanding', 'advancing', 'creative'],
        nouns: ['proficiency', 'capability', 'insight', 'system', 'skill', 'process', 'design', 'understanding'],
        verbs: ['improve', 'evolve', 'refine', 'develop', 'strengthen', 'extend', 'explore', 'advance'],
        adverbs: ['steadily', 'clearly', 'significantly', 'deliberately', 'notably', 'effectively'],
        conjunctions: ['as', 'while', 'although', 'despite', 'therefore', 'moreover']
      },
      emerging: {
        adjectives: ['new', 'nascent', 'formative', 'promising', 'fresh', 'incipient', 'developing', 'potential'],
        nouns: ['methods', 'solutions', 'designs', 'patterns', 'ideas', 'approaches', 'insights', 'structures'],
        verbs: ['detect', 'recognize', 'discover', 'prototype', 'build', 'refine', 'test', 'grasp'],
        adverbs: ['gradually', 'methodically', 'subtly', 'quietly', 'slowly', 'increasingly'],
        conjunctions: []
      }
    },
    syntaxPatterns: {
      rut: [
        "This {noun} feels {adjective}.",
        "I use the same {noun} repeatedly.",
        "My {noun} has become {adjective}.",
        "The {noun} runs {adverb}."
      ],
      taste: [
        "My {adjective} {noun} lets me {adverb} {verb} complex problems, {conjunction} it produces elegant {noun}.",
        "Through {adjective} design, I {verb} structural clarity, {conjunction} this refines {noun}.",
        "I {adverb} {verb} how {adjective} systems yield {adjective} results, {conjunction} it enhances {noun}.",
        "A {adjective} {noun} allows for cleaner {noun} and deeper understanding."
      ],
      growth: [
        "As my {noun} improves, I {adverb} {verb} {adjective} methods.",
        "I discover that {adjective} practice shapes {noun}.",
        "My refined {noun} reveals efficient ways to {verb}.",
        "Through {adjective} experimentation, my {noun} {adverb} advances."
      ],
      emerging: [
        "A {adjective} approach is taking shape.",
        "I sense clearer {noun} ahead.",
        "My technique becomes more {adjective} with use.",
        "Something {adjective} is becoming clear in the design."
      ]
    }
  }
}

export const FALLBACK_SETS = {
  rut: ['·', '•', '◦', '○', '■', '□', '▪', '▫', '●', '○', '◆', '◇'],
  taste: ['💎', '🌊', '🎭', '🔮', '⚖️', '🎯', '🧠', '🌟', '✨', '🎨', '🔷', '🔶'],
  growth: ['🌱', '🚀', '🌈', '🔍', '💡', '🎯', '🌟', '✨', '🔥', '💧', '🌍', '⚡'],
  emerging: ['.', '-', '+', '=', '*', '/', '\\', '|', ':', ';', '<', '>']
}

export const BASE_ALPHA = {
  rut: ' \'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?',
  taste: ' !",#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
  growth: ' !",#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
  emerging: ' \'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,!?'
}

export const CATEGORIES = ['adjectives', 'nouns', 'verbs', 'adverbs', 'conjunctions']

export const IRREGULAR_VERBS = {
  be: { past: 'was',   pastPl: 'were', gerund: 'being', part: 'been', s3: 'is' },
  have: { past: 'had', gerund: 'having', part: 'had', s3: 'has' },
  do: { past: 'did', gerund: 'doing',  part: 'done', s3: 'does' },
  go: { past: 'went', gerund: 'going',  part: 'gone', s3: 'goes' },
  see: { past: 'saw', gerund: 'seeing', part: 'seen', s3: 'sees' },
  come: { past: 'came', gerund: 'coming', part: 'come', s3: 'comes' },
  feel: { past: 'felt', gerund: 'feeling',part: 'felt', s3: 'feels' },
  say: { past: 'said', gerund: 'saying', part: 'said', s3: 'says' },
  think: { past: 'thought', gerund: 'thinking', part: 'thought', s3: 'thinks' }
}