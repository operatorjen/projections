export const GESTURES = {
  rut: ['pacing', 'shrugging', 'stretching slightly', 'sighing'],
  emerging: ['stretching further', 'reaching', 'stepping towards', 'leaning towards'],
  growth: ['increasing presence', 'standing', 'turning', 'reaching upward'],
  taste: ['targeted strategy', 'balanced positioning', 'subtle adjustment', 'intentional pause']
}

export const ACTIONS = {
  rut: ['holding', 'pausing', 'settling', 'waiting', 'observing'],
  emerging: ['reaching', 'exploring', 'testing', 'sensing', 'instigating'],
  growth: ['expanding', 'rising', 'extending', 'unfolding', 'receiving', 'observing'],
  taste: ['refining', 'balancing', 'harmonizing', 'integrating', 'observing']
}

export const MOVEMENT_BASE = {
  rut: {
    quality: 'constrained', amplitude: 0.2, rhythm: 'staccato',
    flow: 'interrupted', spatial: 'contracted', intensity: 0.3
  },
  emerging: {
    quality: 'exploratory', amplitude: 0.5, rhythm: 'rubato',
    flow: 'hesitant', spatial: 'expanding', intensity: 0.6
  },
  growth: {
    quality: 'expansive', amplitude: 0.8, rhythm: 'flowing',
    flow: 'continuous', spatial: 'extended', intensity: 0.9
  },
  taste: {
    quality: 'refined', amplitude: 0.6, rhythm: 'precise',
    flow: 'elegant', spatial: 'balanced', intensity: 0.7
  }
}