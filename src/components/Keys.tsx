import { useState } from 'react'
import { type ThreeElements } from '@react-three/fiber'

type KeyProps = ThreeElements['mesh'] & {
  isActive?: boolean
  onPress?: () => void
  onRelease?: () => void
}

export default function Key({ isActive = false, onPress, onRelease, ...props }: KeyProps) {
  const [hovered, setHover] = useState(false)
  const color = isActive ? '#f4d35e' : hovered ? '#fff6d6' : 'cornsilk'

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
      <boxGeometry args={[0.25, 0.25, 1.65]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}