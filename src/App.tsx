import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Keyboard from './components/Keyboard'
import { OrbitControls } from '@react-three/drei'
import * as Tone from 'tone'
import Key from './components/Keys'
import BlackKey from './components/BlackKey'
import { createPianoKeys } from './music/piano'

const START_MIDI = 60
const END_MIDI = 84

function App() {
  const synthRef = useRef<Tone.PolySynth | null>(null)
  const audioStartedRef = useRef(false)
  const [activeMidiNotes, setActiveMidiNotes] = useState<Set<number>>(new Set())

  const pianoKeys = useMemo(() => createPianoKeys(START_MIDI, END_MIDI), [])

  useEffect(() => {
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sawtooth4' },
      envelope: { attack: 0.01, decay: 0.2, sustain: 1, release: 5 }
    }).toDestination()

    synthRef.current = synth

    return () => {
      synth.dispose()
      synthRef.current = null
    }
  }, [])

  const ensureAudioStarted = useCallback(async () => {
    if (audioStartedRef.current) return
    await Tone.start()
    audioStartedRef.current = true
  }, [])

  const pressNote = useCallback(async (midi: number, note: string) => {
    await ensureAudioStarted()

    synthRef.current?.triggerAttack(note)

    setActiveMidiNotes((prev) => {
      if (prev.has(midi)) return prev
      const next = new Set(prev)
      next.add(midi)
      return next
    })
  }, [ensureAudioStarted])

  const releaseNote = useCallback((midi: number, note: string) => {
    synthRef.current?.triggerRelease(note)

    setActiveMidiNotes((prev) => {
      if (!prev.has(midi)) return prev
      const next = new Set(prev)
      next.delete(midi)
      return next
    })
  }, [])

  const whiteKeys = pianoKeys.filter((key) => !key.isBlack)
  const blackKeys = pianoKeys.filter((key) => key.isBlack)

  return (
    <>
      <Canvas style={{
        position: 'fixed',
        zIndex: 0
      }} camera={{ position: [0, 2, 8], fov: 50 }}>
        <OrbitControls
          makeDefault
          target={[0, -1.75, 0]}
          enableZoom
          enableRotate
          enablePan
          minDistance={2}
          maxDistance={20}
        />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Keyboard position={[0, -2, 0.3]} />

        {whiteKeys.map((key) => (
          <Key
            key={key.midi}
            position={key.position}
            isActive={activeMidiNotes.has(key.midi)}
            onPress={() => {
              void pressNote(key.midi, key.note)
            }}
            onRelease={() => releaseNote(key.midi, key.note)}
          />
        ))}

        {blackKeys.map((key) => (
          <BlackKey
            key={key.midi}
            position={key.position}
            isActive={activeMidiNotes.has(key.midi)}
            onPress={() => {
              void pressNote(key.midi, key.note)
            }}
            onRelease={() => releaseNote(key.midi, key.note)}
          />
        ))}
      </Canvas>
    </>
  )
}

export default App