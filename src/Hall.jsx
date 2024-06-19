import {
    MeshNormalMaterial,
    IcosahedronGeometry,
    TorusKnotGeometry,
    AmbientLight
  } from 'three'
  import Nipple from 'react-nipple';
  import { Canvas } from '@react-three/fiber'
  import { Stats, OrbitControls, useGLTF } from '@react-three/drei'
  import {
    Debug,
    Physics,
    useBox,
    usePlane,
    useSphere,
    useTrimesh,
    useCylinder,
    useConvexPolyhedron,
  } from '@react-three/cannon'
  import { useCompoundBody } from '@react-three/cannon';
  
  import { Suspense, useMemo,useRef ,useState} from 'react'
  import { startTransition,useEffect } from 'react';
  import ModelViewer from './LoadModal';
  import {  Html, useAnimations } from '@react-three/drei';
import { useProgress } from '@react-three/drei';

  function Plane(props) {
    const [ref] = usePlane(() => ({ args: [1, 1, 1], mass: 0, ...props }), useRef())
  
  }
  
 
  
  
  
  
  function StandBoardBox(props) {
    const [ref, api] = useBox(
      () => ({ args: [2.5, 5, .2], mass: 1,type:"Static", ...props }),
      useRef()
    )
  
    return (
      <mesh  ref={ref}  castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
       {/*  <boxGeometry args={[1, 1, 1]} />
        <meshNormalMaterial /> */}
      </mesh>
    )
  }
  
  function FrontFloorBox(props) {
    const [ref, api] = useBox(
      () => ({name:"FrontFloorBox", args: [12.8, 1, 4.8], type:"Static",mass: 1, ...props }),
      useRef()
    )
  
    return (
      <mesh  ref={ref}  castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
        {/* <boxGeometry args={[12.8, 1, 4.8]} /> */}
       {/*  <meshNormalMaterial /> */}
      </mesh>
    )
  }
  
  
  
  function StairsBox(props){
  const shapes = [
    { type: 'Box', position:[-3.8, .3, -5], args: [0.5, .43, 7.7] }, 
    { type: 'Box', position:[-4.3, .65, -5], args: [0.5, .43, 7.7] },
    { type: 'Box', position:[-4.8, 1, -5], args: [0.5, .43, 7.7] },
    { type: 'Box', position:[-5.3, 1.34, -5], args: [0.5, .43, 7.7] },
    { type: 'Box', position:[-5.8, 1.7, -5], args: [0.5, .43, 7.7] },
    { type: 'Box', position:[-6.3, 2, -5], args: [0.5, .43, 7.7] },// First box
    
    { type: 'Box', position:[-6.8, 2.35, -5], args: [0.5, .43, 7.7] },// First box
    
    { type: 'Box', position:[-7.3, 2.67, -5], args: [0.5, .43, 7.7] },// First box
   
  ];
  
  const [ref2] = useCompoundBody(() => ({
    shapes,
    mass: 0.1,
    type:"Static",
    ...props
  }), useRef(null));
  }
  
  
  
  function FloorBox(props) {
    const [ref, api] = useBox(
      () => ({ args: [5, 1, 25], type:"Static",mass: 1, ...props }),
      useRef()
    )
  
    return (
      <mesh  ref={ref}  castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
       {/*  <boxGeometry args={[1, 1, 1]} />
        <meshNormalMaterial /> */}
      </mesh>
    )
  }
    
  function ChairBox(props) {
    const [ref, api] = useBox(
      () => ({ args: [.7, .5, .75], mass: 1,type:"Static", ...props, }),
      useRef()
    )
  
    return (
      <mesh  ref={ref}  castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
       {/*  <boxGeometry args={[.75, .75, .75]} /> */}
       
      </mesh>
    )
  }
  
  function Bon(props) {
    const [ref, api] = useBox(
      () => ({ args: [1, 10, 23], mass: 10,type:"Static", ...props }),
      useRef()
    )
  
    return (
      <mesh /*  ref={ref}  */ castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
       {/*  <boxGeometry args={[1, 10, 25]} /> */}
       {/*  <meshNormalMaterial /> */}
      </mesh>
    )
  }
  

  
  function Cylinder(props) {
    const [ref, api] = useCylinder(
      () => ({ args: [.5, .5, 1, 8], type:"Static",mass: 10, ...props }),
      useRef()
    )
  
    return (
      <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
       {/*  <cylinderGeometry args={[.5, .5, 1, 8]} /> */}
        {/* <meshNormalMaterial /> */}
      </mesh>
    )
  }
  

  
  
    function Hall(props) {
      const { scene } = useGLTF('./hall.glb', true);  // Use true to automatically resolve the scene
    
      return (
        <>
          {scene && (
            <primitive object={scene} 
          />
          )}
        </>
      );
    }
    
  
  function Main() {
  
    return (
      <div>
      <Canvas shadows camera={{ position: [0, 2, 4] }} style={{height:"100vh"}}>
   <ambientLight intensity={0.5} />
  
        <Physics >
   <Debug color="red">  
     
            <Plane rotation={[-Math.PI / 2, 0, 0]} />
         
           <Bon position={[-8, 3, 1]} />
           <Bon position={[15.2, 3, 1]} />
           <Bon position={[3, 3, 13.2]}  rotation={ [ 0, Math.PI / 2,0]}/>
           <Bon position={[3, 3, -11.3]}  rotation={ [ 0, Math.PI / 2,0]}/>
  
           
           <ChairBox position={[2.05, .4, 1]} rotation={[0, 3, 0]}/>
           <ChairBox position={[8, .4, -2]} rotation={[0, 0, 0]}/>
           <ChairBox position={[7.4, .4, 1.9]} rotation={[0, 2, 0]}/>
           <ChairBox position={[2.05, .4, 1]} rotation={[0, 3, 0]}/>
           <ChairBox position={[2.05, .4, 1]} rotation={[0, 3, 0]}/>
  

           <Cylinder position={[11.3, .7, 1.4]} />
           <Cylinder position={[-4.2, .7, 1.3]} />
           <Cylinder position={[8.3, .7, -9.1]} />
           <FloorBox position={[-5.4, -.3, 1]} />
           <FloorBox position={[12.1, -.3, 1]} />
           <FrontFloorBox position={[3.4, -.1, -9]} />
           <StairsBox position={[-.1, 0, 0]}/>
           <StairsBox position={[6.8, 0, -10]} rotation={[0,Math.PI,0]}/>
            <StandBoardBox position={[-1.4, 1, -9.2]} rotation={[0,Math.PI/7,0]} /> 
  
  
           
            <Suspense fallback={<Loading/>}>
        
            <ModelViewer/> 
            <Hall/>
            </Suspense>
         </Debug>  
        </Physics>
     
        <OrbitControls target-y={0.12} />
        <Stats />
 
      </Canvas>
 
      </div>
    )
  }
  const Loading = () => {
    const { progress } = useProgress();
    return <Html><h1>Loading {progress.toFixed(2)} %</h1></Html>;
  };
  export default Main;