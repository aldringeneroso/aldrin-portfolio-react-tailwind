import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Chrome torus-knot study adapted from Three.js's documented geometry/material examples.
export default function Sculpture() {
  const host = useRef(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const element = host.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      setAvailable(false);
      return;
    }

    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
    camera.position.set(0, 0, 5.3);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04).texture;
    scene.environment = environment;
    room.dispose();
    pmrem.dispose();

    const geometry = new THREE.TorusKnotGeometry(0.86, 0.26, 160, 24);
    const material = new THREE.MeshStandardMaterial({
      color: 0xb7b8bc,
      metalness: 1,
      roughness: 0.17,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const group = new THREE.Group();
    group.add(mesh);
    group.rotation.set(0.35, 0.4, -0.15);
    scene.add(group);

    let frame = 0;
    let visible = true;
    let destroyed = false;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: 0, y: 0 };
    let scrollAnimation;

    function draw(time = 0) {
      if (destroyed) return;
      if (!reduce.matches) {
        mesh.rotation.y = time * 0.00018;
        mesh.position.y = Math.sin(time * 0.0007) * 0.065;
        group.position.x = THREE.MathUtils.lerp(
          group.position.x,
          pointer.x,
          0.035,
        );
        group.position.y = THREE.MathUtils.lerp(
          group.position.y,
          pointer.y,
          0.035,
        );
      }
      renderer.render(scene, camera);
      if (visible && !document.hidden && !reduce.matches)
        frame = requestAnimationFrame(draw);
    }

    function resume() {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden) draw(performance.now());
    }

    function configureMotion() {
      scrollAnimation?.scrollTrigger?.kill();
      scrollAnimation?.kill();
      if (!reduce.matches) {
        scrollAnimation = gsap.to(group.rotation, {
          y: 2.4,
          x: 0.9,
          ease: 'none',
          scrollTrigger: {
            trigger: element.closest('.hero'),
            start: 'top top',
            end: 'bottom top',
            scrub: 0.9,
          },
        });
      }
      resume();
    }

    const resize = new ResizeObserver(() => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      resume();
    });
    resize.observe(element);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    intersection.observe(element);
    const follow = (event) => {
      const box = element.getBoundingClientRect();
      pointer.x = ((event.clientX - box.left) / box.width - 0.5) * 0.25;
      pointer.y = -((event.clientY - box.top) / box.height - 0.5) * 0.25;
    };
    element.addEventListener('pointermove', follow);
    document.addEventListener('visibilitychange', resume);
    reduce.addEventListener('change', configureMotion);
    configureMotion();

    return () => {
      destroyed = true;
      cancelAnimationFrame(frame);
      scrollAnimation?.scrollTrigger?.kill();
      scrollAnimation?.kill();
      resize.disconnect();
      intersection.disconnect();
      element.removeEventListener('pointermove', follow);
      document.removeEventListener('visibilitychange', resume);
      reduce.removeEventListener('change', configureMotion);
      geometry.dispose();
      material.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={host}
      className={`sculpture ${available ? '' : 'sculpture-fallback'}`}
      aria-hidden="true"
    />
  );
}
