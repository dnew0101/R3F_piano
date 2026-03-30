import { Canvas } from '@react-three/fiber'
import Keyboard from './components/Keyboard'
import { OrbitControls } from '@react-three/drei'
import Key from './components/Keys'
import BlackKey from './components/BlackKey'

function App() {
  return (
    <>
      <Canvas style={{
        position: 'fixed',
        zIndex: -5
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
        <Keyboard position={[0, -2, -0.1]} />

        <Key position={[-2.1, -1.75, 0.5]} />       {/** C */}
        <BlackKey position={[-1.95, -1.7, 0.4]} />  {/** C# */}
        <Key position={[-1.8, -1.75, 0.5]} />       {/** D */}
        <BlackKey position={[-1.65, -1.7, 0.4]} />  {/** D# */}
        <Key position={[-1.5, -1.75, 0.5]} />       {/** E */}
        <Key position={[-1.2, -1.75, 0.5]} />       {/** F */}
        <BlackKey position={[-1.05, -1.7, 0.4]} />  {/** F# */}
        <Key position={[-0.9, -1.75, 0.5]} />       {/** G */}
        <BlackKey position={[-0.75, -1.7, 0.4]} />  {/** G# */}
        <Key position={[-0.6, -1.75, 0.5]} />       {/** A */}
        <BlackKey position={[-0.45, -1.7, 0.4]} />  {/** A# */}
        <Key position={[-0.3, -1.75, 0.5]} />       {/** B */}
        <Key position={[0, -1.75, 0.5]} />          {/** Mid C */}

        <Key position={[0.3, -1.75, 0.5]} />        {/** C */}
        <BlackKey position={[0.15, -1.7, 0.4]} />   {/** C# */}
        <Key position={[0.6, -1.75, 0.5]} />        {/** D */}
        <BlackKey position={[0.45, -1.7, 0.4]} />   {/** D# */}
        <Key position={[0.9, -1.75, 0.5]} />        {/** E */}
        <Key position={[1.2, -1.75, 0.5]} />        {/** F */}
        <BlackKey position={[1.05, -1.7, 0.4]} />   {/** F# */}
        <Key position={[1.5, -1.75, 0.5]} />        {/** G */}
        <BlackKey position={[1.35, -1.7, 0.4]} />   {/** G# */}
        <Key position={[1.8, -1.75, 0.5]} />        {/** A */}
        <BlackKey position={[1.65, -1.7, 0.4]} />   {/** A# */}
        <Key position={[2.1, -1.75, 0.5]} />        {/** B */}
      </Canvas>
    </>
  )
}

export default App