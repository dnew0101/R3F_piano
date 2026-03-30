import { useState } from 'react'
import { type ThreeElements } from '@react-three/fiber'

type BoxProps = ThreeElements['mesh']

export default function Keyboard(props: BoxProps) {
  const [hovered, setHover] = useState(false)

  return (
    <mesh
      {...props}
      scale={1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxGeometry args={[5.5, 0.4, 2.5]} />
      <meshStandardMaterial color={'dimgray'} />
    </mesh>
  )
}