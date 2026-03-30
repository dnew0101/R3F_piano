import { useState } from 'react'
import { type ThreeElements } from '@react-three/fiber'

type BlackKeyProps = ThreeElements['mesh'] & {
  isActive?: boolean
  onPress?: () => void
  onRelease?: () => void
}

export default function BlackKey({ isActive = false, onPress, onRelease, ...props }: BlackKeyProps) {
  const [hovered, setHover] = useState(false)
  const color = isActive ? '#b7791f' : hovered ? '#1f2937' : 'black'

  return (
    <mesh
      {...props}
      scale={1}
      onPointerDown={(event) => {
        event.stopPropagation()
        onPress?.()
      }}
      onPointerUp={(event) => {
        event.stopPropagation()
        onRelease?.()
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => {
        setHover(false)
        onRelease?.()
      }}>
      <boxGeometry args={[0.15, 0.3, 1.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}