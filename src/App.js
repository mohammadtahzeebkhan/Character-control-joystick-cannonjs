// src/App.js
import React from 'react';
import ModelViewer from './LoadModal';
import { Canvas } from '@react-three/fiber';
import Main from './Hall';
import Nipple from 'react-nipple';
import { moveCharacter } from './LoadModal';
import * as THREE from 'three'
function App() {

  const JoyStrikStart=(data)=>{
    console.log("data",data)
    
let JoyStrikwalk=true
if(data&&data.direction&&data.direction.angle=="up"){
    moveCharacter(new THREE.Vector3(0, 0, -0.01), { x: 0, y: Math.PI, z: 0 },JoyStrikwalk=JoyStrikwalk);
}

if(data.direction&&data.direction.angle=="right"){
  moveCharacter(new THREE.Vector3(0.01, 0, 0), { x: 0, y: Math.PI/2, z: 0 },JoyStrikwalk=JoyStrikwalk);
}

if(data.direction&&data.direction.angle=="left"){
  moveCharacter(new THREE.Vector3(-0.01, 0, 0), { x: 0, y: -Math.PI/2, z: 0 },JoyStrikwalk=JoyStrikwalk);
}
if(data.direction&&data.direction.angle=="down"){
  moveCharacter(new THREE.Vector3(0, 0, 0.01), { x: 0, y: -Math.PI*2, z: 0 },JoyStrikwalk=JoyStrikwalk);
}

  }

  const JoyStrikEnd=(d)=>{
    console.log("d",d)
    const event = new KeyboardEvent('keydown', { key: "w" });
    window.dispatchEvent(event);
    let JoyStrikwalk=false
    moveCharacter(new THREE.Vector3(0, 0, 0), { x: 0, y: 0, z: 0 },JoyStrikwalk=JoyStrikwalk);
  }
  return (
    <div style={{ height: '100vh' }}>
      <Main />
      <Nipple
        options={{ mode: 'static', position: { bottom: '50px', left: '50px' } }}
        style={{
            width: 100,
            height: 100,
            position: 'absolute',
            bottom: '50px',
            left: '50px',
        }}
        onMove={(evt, data) => {
            if (data && data) {
              JoyStrikStart(data);
            }
        }}
        onEnd={(e,d) => JoyStrikEnd(d)}
        />
    </div>
  );
}

export default App;
