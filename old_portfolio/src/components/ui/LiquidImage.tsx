"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, extend, ReactThreeFiber, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Define the shader material
const LiquidMaterial = shaderMaterial(
    {
        uTime: 0,
        uTexture: new THREE.Texture(),
        uHover: 0,
        uResolution: new THREE.Vector2(1, 1),
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Liquid distortion effect
      float noise = sin(uv.y * 10.0 + uTime) * 0.02 * uHover;
      uv.x += noise;
      uv.y += noise;

      vec4 color = texture2D(uTexture, uv);
      gl_FragColor = color;
    }
  `
);

extend({ LiquidMaterial });

// Add type definition for the custom material
declare global {
    namespace JSX {
        interface IntrinsicElements {
            liquidMaterial: any;
        }
    }
}

interface LiquidImageProps {
    src: string;
    className?: string;
    isActive?: boolean;
}

function Scene({ src, isActive }: { src: string; isActive: boolean }) {
    const materialRef = useRef<any>(null);
    const texture = useTexture(src);
    const { viewport } = useThree();

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uTime += delta;
            // Animate uHover based on isActive prop
            const targetHover = isActive ? 1 : 0;
            materialRef.current.uHover = THREE.MathUtils.lerp(materialRef.current.uHover, targetHover, 0.1);
        }
    });

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            {/* @ts-ignore */}
            <liquidMaterial ref={materialRef} uTexture={texture} transparent />
        </mesh>
    );
}

export default function LiquidImage({ src, className, isActive = false }: LiquidImageProps) {
    return (
        <div className={`relative w-full h-full ${className}`}>
            <Canvas camera={{ position: [0, 0, 1] }} resize={{ scroll: false }}>
                <Scene src={src} isActive={isActive} />
            </Canvas>
        </div>
    );
}
