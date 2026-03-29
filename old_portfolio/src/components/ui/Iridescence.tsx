"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color } from "three";

// Shader code for liquid effect
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Create a liquid-like distortion
  float noise = sin(uv.x * 10.0 + uTime) * cos(uv.y * 10.0 + uTime) * 0.1;
  uv += noise;
  
  // Iridescence effect
  vec3 color = uColor;
  color.r += sin(uv.x * 20.0 + uTime * 2.0) * 0.1;
  color.g += cos(uv.y * 20.0 + uTime * 2.0) * 0.1;
  
  gl_FragColor = vec4(color, 0.15); // Low opacity for background
}
`;

function LiquidPlane() {
    const mesh = useRef<any>(null);
    const { viewport } = useThree();

    const uniforms = useRef({
        uTime: { value: 0 },
        uColor: { value: new Color("#ef4444") }, // Red base
    });

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms.current}
                transparent
            />
        </mesh>
    );
}

export default function Iridescence() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <LiquidPlane />
            </Canvas>
        </div>
    );
}
