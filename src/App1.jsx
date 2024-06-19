// Scene.js
import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useAnimations } from '@react-three/drei';

const Scene = () => {
    const group = useRef();
    const modelRef=useRef()
    const { nodes, materials, animations } = useLoader(GLTFLoader, '/SM.glb');

    const mixer = useRef();

    const { actions } = useAnimations(animations, modelRef);
    console.log("actions animation",actions)

    

    // Function to play animation by name
    const playAnimationByName = (animationName) => {
        if (mixer.current && animations) {
            const clip = animations.find((clip) => clip.name === animationName);
            if (clip) {
                mixer.current.stopAllAction();
                mixer.current.clipAction(clip).play();
            }
        }
    };

    // Create a mixer to manage animations
    useFrame((state, delta) => {
        if (mixer.current) mixer.current.update(delta);
        actions.Running.play()
    });

    // Play all animations on component mount
    React.useEffect(() => {
        if (animations && animations.length) {
            mixer.current = new THREE.AnimationMixer(group.current);
            animations.forEach((clip) => {
                mixer.current.clipAction(clip);
            });
        }
        return () => {
            mixer.current && mixer.current.stopAllAction();
        };
    }, [animations]);

    // Example of playing an animation by name (you can trigger this based on your app logic)
    React.useEffect(() => {
        //playAnimationByName('Jumping'); // Replace with actual animation name
    }, []);

    return (
        <group ref={group}>
            <primitive object={nodes.Scene} ref={modelRef}/>
            {/* Add more primitives or adjust scene as needed */}
        </group>
    );
};




const App1 = () => {
    return (
        <Canvas style={{height:"100vh"}}>
            <ambientLight intensity={3}/>
            <OrbitControls/>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Scene />
        </Canvas>
    );
};

export default App1;