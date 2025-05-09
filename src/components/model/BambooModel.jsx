// Model "Bamboo" by 1-3D.com (https://sketchfab.com/1-3D.com)
// Licensed under CC-BY-SA-4.0 (http://creativecommons.org/licenses/by-sa/4.0/)

"use client"
import { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import {useFrame, useLoader} from '@react-three/fiber';
import * as THREE from 'three';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export function BambooModel({ config = {} }) {
    const ref = useRef();
    const lightRef = useRef();
    const moonRef = useRef();
    const texture = useLoader(THREE.TextureLoader, '/moon.webp');


    const { nodes, materials } = useGLTF("/models/bamboo-transformed.glb", loader => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("/draco/"); // Указываем путь к декодеру
        loader.setDRACOLoader(dracoLoader);
    });

    const {
        floatAmplitude = 0.01,
        floatSpeed = 1,
        swayAmplitude = 0.01,
        swaySpeed = 0.5,
        rotateY = .02,
        lightIntensity = 1,
        flickerSpeed = 2,
        light = 0
    } = config;

    const randomPhaseShift = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (ref.current) {
            ref.current.position.y = -4.2 + Math.sin(time * floatSpeed + randomPhaseShift) * floatAmplitude;
            ref.current.rotation.z = Math.sin(time * swaySpeed + randomPhaseShift) * swayAmplitude;
        }

        if (lightRef.current) {
            lightRef.current.intensity = 5 + lightIntensity + Math.sin(time * flickerSpeed) * 0.9;
        }

        if (moonRef.current) {
            const t = (Math.sin(time * 0.5) + 1) / 2;
            const color1 = new THREE.Color(0x9ecfff);
            const color2 = new THREE.Color(0xb3a6ff);
            const blendedColor = color1.clone().lerp(color2, t);
            moonRef.current.material.color.set(blendedColor);
        }
    });

    return (
        <>
            <pointLight
                ref={lightRef}
                position={[0, 1, 0]}
                intensity={lightIntensity}
                color={new THREE.Color(0x9ecfff)}
                distance={10}
                decay={2}
                castShadow
            />

            { light && <mesh
                ref={moonRef}
                position={[0, 1.2, 0]}
            >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshPhysicalMaterial
                    map={texture}
                    roughness={0.8}
                    metalness={0.1}
                    emissive={0xaaaaaa}
                    emissiveIntensity={0.2}
                />
            </mesh>}

            <group
                scale={[0.01, 0.01, 0.01]}
                position={[0, -4.2, 0]}
                dispose={null}
                ref={ref}
            >
                <mesh
                    name="Object_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_2.geometry}
                    material={materials.Leaves}
                    rotation={[-Math.PI / 2, 0, rotateY]}
                />
                <mesh
                    name="Object_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_4.geometry}
                    material={materials.Trunk}
                    rotation={[-Math.PI / 2, 0, 0]}
                />
            </group>
        </>
    );
}

useGLTF.preload('/models/bamboo-transformed.glb');
