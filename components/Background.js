import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ParticleBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let animationFrameId;

    const initScene = async () => {
      const THREE = await import('three');

      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      rendererRef.current = renderer;

      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      // Background color (transparent)
      scene.background = new THREE.Color(0x000000);
      scene.background.alpha = 0;

      // Particles
      const particles = new THREE.BufferGeometry();
      const particleCount = 3000;

      const posArray = new Float32Array(particleCount * 3);
      const scaleArray = new Float32Array(particleCount);

      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 5;     // x
        posArray[i + 1] = (Math.random() - 0.5) * 5; // y
        posArray[i + 2] = (Math.random() - 0.5) * 5; // z
        scaleArray[i / 3] = Math.random();           // Individual scale for each particle
      }

      particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particles.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          attribute float scale;
          uniform float time;
          varying float vScale;
          void main() {
            vScale = scale;
            float size = scale * (0.02 + 0.02 * sin(time * 1.3 + scale * 10.0));
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying float vScale;
          void main() {
            float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
            if (distanceFromCenter > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, distanceFromCenter);
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
      });

      const particlesMesh = new THREE.Points(particles, material);
      scene.add(particlesMesh);

      camera.position.z = 1;

      // Animation
      const clock = new THREE.Clock();
      const animate = () => {
        if (!sceneRef.current) return;

        const elapsedTime = clock.getElapsedTime();
        material.uniforms.time.value = elapsedTime;

        particlesMesh.rotation.x += 0.00012;
        particlesMesh.rotation.y += 0.00012;
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        if (!rendererRef.current) return;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        if (mountRef.current && rendererRef.current.domElement) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
        sceneRef.current = null;
        rendererRef.current = null;
      };
    };

    initScene();
  }, [isMounted]);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default dynamic(() => Promise.resolve(ParticleBackground), { ssr: false });