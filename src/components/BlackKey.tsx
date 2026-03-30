import { useState } from 'react'
import { type ThreeElements } from '@react-three/fiber'

type BoxProps = ThreeElements['mesh']

export default function Key(props: BoxProps) {
  const [hovered, setHover] = useState(false)

  return (
    <mesh
      {...props}
      scale={1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxGeometry args={[0.15, 0.3, 1.1]} />
      <meshStandardMaterial color={'black'} />
    </mesh>
  )
}