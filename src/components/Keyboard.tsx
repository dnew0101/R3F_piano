import { type ThreeElements } from '@react-three/fiber'

type BoxProps = ThreeElements['mesh']

export default function Keyboard(props: BoxProps) {
  return (
    <mesh
      {...props}
      scale={1}>
      <boxGeometry args={[5, 0.4, 1.8]} />
      <meshStandardMaterial color={'black'} />
    </mesh>
  )
}