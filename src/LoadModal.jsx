import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame,extend
 } from '@react-three/fiber';
import { useGLTF, Html, useAnimations } from '@react-three/drei';
import { useProgress } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';
import { useCompoundBody } from '@react-three/cannon';
import * as THREE from 'three'
import Nipple from 'react-nipple';
let apii,actionss
var Joywalk;

export const moveCharacter = (increment, rotation,JoyStrikwalk) => {
  Joywalk=JoyStrikwalk
  console.log("JoyStrikwalk",JoyStrikwalk)
if(Joywalk){
  JoyStrikwalk&&actionss.Walking.play();
  //actionss.Walk.stop()
}
if(Joywalk==false){
  actionss.Walking.stop()
}
  apii.position.subscribe((position) => {
    const newPosition = new THREE.Vector3(
      position[0] + increment.x,
      position[1] + increment.y,
      position[2] + increment.z
    );
    apii.position.set(newPosition.x, newPosition.y, newPosition.z);
    apii.rotation.set(rotation.x, rotation.y, rotation.z);

  });
}; 
const Loading = () => {
  const { progress } = useProgress();
  return <Html><h1>Loading {progress.toFixed(2)} %</h1></Html>;
};

const Character = () => {
  //const { scene, animations } = useGLTF('/SuitMan.glb');
    
  const { scene, animations } = useGLTF('/SM.glb');

  const modelRef = useRef();
  const { actions } = useAnimations(animations, modelRef);
console.log("actions",actions)
  // Physics body setup
  const [ref, api] = useCompoundBody(() => ({
    mass: 10,
   
    shapes: [
      { args: [0.35], position: [0, 0.30, 0], type: 'Sphere' },
      { args: [0.35], position: [0, 0.80, 0], type: 'Sphere' },
      { args: [0.35], position: [0, 1.30, 0], type: 'Sphere' }
    ],
  }));

  apii=api
  actionss=actions

  const movementSpeed = 0.1; // Adjust movement speed as needed

  // Animation and movement logic
  useFrame(() => {
    //actionss.walking.play();
    actionss.idle.play();

  // Always play Idle animation
  });

  const handleKeyDown = (event) => {
    switch (event.key.toLowerCase()) {
      case 'w':
        actions.Walking.play();
       
        moveCharacter(new THREE.Vector3(0, 0, -0.01), { x: 0, y:  Math.PI, z: 0 });
        break;
      case 's':
        actions.Walking.play();
      
        moveCharacter(new THREE.Vector3(0, 0, 0.01), { x: 0, y: Math.PI*2, z: 0 })
        break;
      case 'a':
        actions.Walking.play();
        moveCharacter(new THREE.Vector3(-.01, 0, 0), { x: 0, y: -Math.PI / 2, z: 0 });
        break;
      case 'd':
        actions.Walking.play();
        moveCharacter(new THREE.Vector3(.01, 0, 0), { x: 0, y: Math.PI / 2, z: 0 });
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key.toLowerCase()) {
      case 'w':
        moveCharacter(new THREE.Vector3(0, 0, 0), { x: 0, y: Math.PI, z: 0 });
      case 's':
        moveCharacter(new THREE.Vector3(0, 0, 0), { x: 0,y: Math.PI*2, z: 0 });
      case 'a':
        moveCharacter(new THREE.Vector3(0, 0, 0), { x: 0, y: -Math.PI / 2, z: 0 });
      case 'd':
        actions.Walking.stop();
        moveCharacter(new THREE.Vector3(0, 0, 0), { x: 0, y:  Math.PI, z: 0 }); // Stop Walk animation on key release
        break;
      default:
        break;
    }
  };

useEffect(()=>{
  console.log(" JoyStrikwalk use Effect")
  if(Joywalk){
    actionss.Walking.stop();

  }
  apii.rotation.set(0, Math.PI, 0);
},[Joywalk])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
   
  }, []);

  return (
    <>
      {scene && (
        <primitive
          object={scene}
         
          ref={(node) => {
            ref.current = node; // Assign to physics ref
            modelRef.current = node; // Assign to animation ref
          }}
          
        />

        
      )}


    
    </>
  );
};

const ModelViewer = () => {
  return (
    <>
      <ambientLight intensity={2} />
      <OrbitControls />
      
      <Suspense fallback={<Loading />}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Character />
      </Suspense>

     
     
    </>
  );
};



export default ModelViewer;

