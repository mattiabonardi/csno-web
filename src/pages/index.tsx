/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "../styles/pages/index.module.css";
import { createRef, useEffect, useState } from "react";
import * as THREE from "three";
import SplineLoader from "@splinetool/loader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Intro } from "../components/intro";
import Link from "next/link";

export default function Home() {
  const model = createRef<HTMLDivElement>();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, 4500);
    }
  }, [visible]);

  useEffect(() => {
    const n = window.innerWidth > 1000 ? 1.8 : 1.5;
    // camera
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -n,
      window.innerWidth / n,
      window.innerHeight / n,
      window.innerHeight / -n,
      -50000,
      50000
    );
    camera.position.set(0, 1, -50);
    camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

    // scene
    const scene = new THREE.Scene();
    //const textureLoader = new THREE.TextureLoader();
    //scene.background = textureLoader.load("textures/background.png");

    // spline scene
    const loader = new SplineLoader();
    if ((window as any).splineScene) {
      // add directly spline model to scene
      scene.add((window as any).splineScene);
    } else {
      // load 3d model
      loader.load("scene.splinecode", (splineScene) => {
        scene.add(splineScene);
        // add splineScene object to window
        (window as any).splineScene = splineScene;
      });
    }

    // renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.setClearColor(0x000000, 0);
    model.current?.appendChild(renderer.domElement);

    // scene settings
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    renderer.setClearAlpha(1);

    // orbit controls
    const controls = new OrbitControls(camera, model.current as HTMLDivElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.125;
    controls.rotateSpeed = 0.4;
    controls.panSpeed = 0.4;
    controls.autoRotate = true;

    window.addEventListener("resize", onWindowResize);
    function onWindowResize() {
      camera.left = window.innerWidth / -2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = window.innerHeight / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      renderer.render(scene, camera);
      controls.update();
    }
  }, []);

  return (
    <main className={styles.main}>
      <Intro active={visible}></Intro>
      <div ref={model} className={styles.background}></div>
      <div className={styles.actions}>
        <Link href="/games/t-rex-game/default">
          <div className={styles.play}>
            <img className={styles.playIcon} src="play_arrow.svg" alt="play" />
          </div>
        </Link>
        <Link href="/about" className={styles.about}>
          ABOUT
        </Link>
      </div>
    </main>
  );
}
