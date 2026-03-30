import * as Tone from 'tone'

const BLACK_PITCH_CLASSES = new Set([1, 3, 6, 8, 10])
const WHITE_KEY_SPACING = 0.3
const WHITE_KEY_Y = -1.75
const WHITE_KEY_Z = 0.5
const BLACK_KEY_Y = -1.7
const BLACK_KEY_Z = 0.4

export type PianoKeyData = {
  midi: number
  note: string
  isBlack: boolean
  position: [number, number, number]
}

function isBlackPitchClass(midi: number): boolean {
  return BLACK_PITCH_CLASSES.has(midi % 12)
}

export function createPianoKeys(startMidi: number, endMidi: number): PianoKeyData[] {
  const whiteKeyCount = Array.from({ length: endMidi - startMidi + 1 }, (_, i) => startMidi + i)
    .filter((midi) => !isBlackPitchClass(midi)).length

  const centerOffset = (whiteKeyCount - 1) / 2
  let whiteKeysSeen = 0

  return Array.from({ length: endMidi - startMidi + 1 }, (_, i) => startMidi + i).map((midi) => {
    const isBlack = isBlackPitchClass(midi)

    if (!isBlack) {
      const x = (whiteKeysSeen - centerOffset) * WHITE_KEY_SPACING
      whiteKeysSeen += 1

      return {
        midi,
        note: Tone.Frequency(midi, 'midi').toNote(),
        isBlack,
        position: [x, WHITE_KEY_Y, WHITE_KEY_Z]
      }
    }

    const x = (whiteKeysSeen - 0.5 - centerOffset) * WHITE_KEY_SPACING

    return {
      midi,
      note: Tone.Frequency(midi, 'midi').toNote(),
      isBlack,
      position: [x, BLACK_KEY_Y, BLACK_KEY_Z]
    }
  })
}