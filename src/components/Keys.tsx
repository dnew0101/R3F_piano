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
      <boxGeometry args={[0.25, 0.25, 1.65]} />
      <meshStandardMaterial color={'cornsilk'} />
    </mesh>
  )
}