import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const handleResize = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
};

const handleArrowKeys = (object3D: THREE.Object3D) => {
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") {
      object3D.position.y += 0.1;
    }
    if (e.key === "ArrowDown") {
      object3D.position.y -= 0.1;
    }
    if (e.key === "ArrowLeft") {
      object3D.position.x -= 0.1;
    }
    if (e.key === "ArrowRight") {
      object3D.position.x += 0.1;
    }
    const vec1 = new THREE.Vector3();
    const vec2 = new THREE.Vector3();
    console.log(object3D.getWorldPosition(vec1));
    console.log(object3D.getWorldDirection(vec2));
  });
};

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({
        color: "#FBA150",
      });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      handleArrowKeys(cube);

      // Render the scene and camera
      cube.rotateX(0.5);
      const renderScene = () => {
        cube.rotateY(0.01);
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
      };

      window.addEventListener("resize", () => handleResize(camera, renderer));

      // Call the renderScene function to start the animation loop
      renderScene();
      console.log(cube.getWorldPosition);
    }
  }, []);
  return <div ref={containerRef} />;
};
export default ThreeScene;
