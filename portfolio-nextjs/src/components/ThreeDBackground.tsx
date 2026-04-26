'use client'

import { useRef, useMemo, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, ContactShadows } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

/** Morphing Glass Blob (B) — white/black mix depending on theme */
function GlassBlob() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()

  // Slow rotation + subtle breathing scale
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.15
      meshRef.current.rotation.y = t * 0.15
      const s = 1.3 + Math.sin(t * 0.8) * 0.05
      meshRef.current.scale.set(s, s, s)
    }
  })

  const materialProps = useMemo(() => {
    const isDark = theme === 'dark'
    return {
      background: new THREE.Color(isDark ? '#0b0b0b' : '#f6f7fb'),
      color: new THREE.Color(isDark ? '#ffffff' : '#000000'),
      thickness: isDark ? 0.6 : 0.4,
      roughness: isDark ? 0.15 : 0.2,
      transmission: 1,
      ior: 1.2,
      chromaticAberration: 0.02,
      anisotropy: 0.02,
      distortion: 0.1,
      distortionScale: 0.2,
      temporalDistortion: 0.1,
      attenuationColor: new THREE.Color(isDark ? '#ffffff' : '#000000'),
      attenuationDistance: isDark ? 2 : 1.5,
      opacity: isDark ? 0.85 : 0.75
    }
  }, [theme])

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        {/* High-detail geometry for smooth transmission look */}
        <icosahedronGeometry args={[1.2, 2]} />
        <MeshTransmissionMaterial
          background={materialProps.background}
          color={materialProps.color}
          thickness={materialProps.thickness}
          roughness={materialProps.roughness}
          transmission={materialProps.transmission}
          ior={materialProps.ior}
          chromaticAberration={materialProps.chromaticAberration}
          anisotropy={materialProps.anisotropy}
          distortion={materialProps.distortion}
          distortionScale={materialProps.distortionScale}
          temporalDistortion={materialProps.temporalDistortion}
          attenuationColor={materialProps.attenuationColor}
          attenuationDistance={materialProps.attenuationDistance}
          transparent
          opacity={materialProps.opacity}
        />
      </mesh>
    </Float>
  )
}


/** Orbit Rings (C) — thin elegant rings with subtle glow, theme-aware (white/black) */
function OrbitRings() {
  const groupRef = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime()
      groupRef.current.rotation.y = t * 0.1
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.05
    }
  })
  const isDark = theme === 'dark'
  const color = new THREE.Color(isDark ? '#ffffff' : '#000000')
  const emissive = new THREE.Color(isDark ? '#ffffff' : '#000000')

  return (
    <group ref={groupRef}>
      {[1.2, 1.8, 2.4].map((r, i) => (
        <mesh
          key={i}
          rotation={[
            i % 2 === 0 ? Math.PI / 2 : 0,
            0,
            i % 2 === 1 ? Math.PI / 6 : 0
          ]}
        >
          <torusGeometry args={[r, 0.015 * (i + 1), 64, 256]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.06 + i * 0.02}
            roughness={0.85}
            metalness={0.15}
            transparent
            opacity={0.22 - i * 0.04}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Halo Particles — lightweight points cloud forming a subtle halo */
function HaloParticles() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const color = new THREE.Color(isDark ? '#ffffff' : '#000000')
  const pointsRef = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const count = 200
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2.8 + (Math.random() * 0.6 - 0.3)
      const y = (Math.random() - 0.5) * 0.2
      positions[i * 3 + 0] = Math.cos(angle) * radius
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color={color} size={0.015} sizeAttenuation transparent opacity={0.35} />
    </points>
  )
}

/** Stacked primitives (Sphere, Cone, Cube) on the right side with premium metallic/clearcoat look */
function StackedPrimitives() {
  const groupRef = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Subtle idle movement to keep it alive without distraction
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime()
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.03
    }
  })

  const baseColor = useMemo(
    () => new THREE.Color(isDark ? '#0f0f10' : '#f3f4f6'),
    [isDark]
  )
  const metal = 0.75
  const rough = isDark ? 0.35 : 0.25

  return (
    <group ref={groupRef} position={[1.8, -0.2, 0]} dispose={null}>
      {/* Sphere (top) */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial
          color={baseColor}
          metalness={metal}
          roughness={rough}
          clearcoat={0.6}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Cone (middle) */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.45, 0.9, 64]} />
        <meshStandardMaterial
          color={baseColor}
          metalness={metal}
          roughness={rough + 0.1}
        />
      </mesh>

      {/* Cube (bottom, slightly rotated) */}
      <mesh position={[0, -0.65, 0]} castShadow receiveShadow rotation={[0.25, 0.6, 0.1]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color={baseColor}
          metalness={metal}
          roughness={rough + 0.05}
        />
      </mesh>
    </group>
  )
}

function ParallaxRig({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree()
  useFrame(() => {
    const { x, y } = mouseRef.current
    camera.position.x += (x * 0.6 - camera.position.x) * 0.05
    camera.position.y += (y * 0.4 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  return null
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
    </div>
  )
}

// Main 3D Background Component
export default function ThreeDBackground() {
  const { theme } = useTheme()
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [canRender, setCanRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setCanRender(!!gl)
    } catch {
      setCanRender(false)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '100px' }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -((e.clientY / window.innerHeight) * 2 - 1)
      mouseRef.current = { x, y }
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      {canRender && isVisible ? (
        <Suspense fallback={<LoadingFallback />}>
          <Canvas shadows
            dpr={[1, 1]}
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ 
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance'
            }}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            {/* Lighting */}
            <ambientLight intensity={theme === 'dark' ? 0.35 : 0.4} />
            <directionalLight
              position={[5, 8, 6]}
              intensity={0.9}
              castShadow
              shadow-mapSize-width={512}
              shadow-mapSize-height={512}
            />
            {/* Subtle colored rim lights for premium highlights */}
            <spotLight
              position={[-6, 2, 2]}
              intensity={0.45}
              angle={0.6}
              penumbra={1}
              color={theme === 'dark' ? '#b388ff' : '#6b7280'}
              castShadow
            />
            <spotLight
              position={[4, 2, -4]}
              intensity={0.35}
              angle={0.7}
              penumbra={1}
              color={theme === 'dark' ? '#8be9fd' : '#9ca3af'}
              castShadow
            />

            {/* Camera parallax */}
            <ParallaxRig mouseRef={mouseRef} />

            {/* 3D Objects — stacked primitives on the right */}
            <StackedPrimitives />

            {/* Soft contact shadows with no visible ground */}
            <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2} far={4} />

            {/* Environment/HDR and OrbitControls removed for performance */}
          </Canvas>
        </Suspense>
      ) : null}
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/20 dark:to-black/20 pointer-events-none" />
    </div>
  )
}
