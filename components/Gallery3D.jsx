'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MODELS = [
  { name: 'Electric Control Box', path: '/blender-models/Electric_Box.glb' },
  { name: 'Control Cabinet', path: '/blender-models/Control_Cabinet.glb' },
  { name: 'Processing Tank', path: '/blender-models/Processing_Tank.glb' },
  { name: 'Tanker Truck', path: '/blender-models/Tanker_Truck.glb' },
  { name: 'Industrial Staircase', path: '/blender-models/Industrial_Staircase.glb' },
];

const FALLBACK_COLOR = 0xffd84b;

export default function Gallery3D() {
  const containerRef = useRef(null);
  const apiRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [active, setActive] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    let cleanup = null;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !apiRef.current && !container.querySelector('canvas')) {
          obs.disconnect();
          setStatus('loading');
          setError(null);
          const api = startViewer(container, (s) => {
            if (!disposed) {
              setStatus(s);
              if (s === 'ready') setError(null);
            }
          }, (msg) => {
            if (!disposed) setError(msg);
          });
          apiRef.current = api;
          cleanup = () => api.dispose();
        }
      },
      { rootMargin: '600px' }
    );
    obs.observe(container);

    return () => {
      disposed = true;
      obs.disconnect();
      if (cleanup) cleanup();
    };
  }, []);

  const go = (i) => {
    if (!apiRef.current) return;
    apiRef.current.goTo(i);
    setActive(apiRef.current.currentIndex());
  };

  return (
    <div className="gallery3d">
      <div className="gallery3d-stage" ref={containerRef}>
        {status !== 'ready' && (
          <div className="gallery3d-overlay">
            {status === 'loading' && <span className="gallery3d-spinner" aria-hidden="true" />}
            <p>
              {status === 'idle'
                ? '3D preview loads on scroll.'
                : status === 'loading'
                ? 'Loading 3D model...'
                : '3D model failed to load.'}
            </p>
            {error && <small>{error}</small>}
          </div>
        )}
      </div>
      <div className="gallery3d-bar">
        <span className="gallery3d-name">{MODELS[active] ? MODELS[active].name : ''}</span>
        {MODELS.length > 1 && (
          <div className="gallery3d-controls">
            <button type="button" className="gallery3d-btn" onClick={() => go(active - 1)} aria-label="Previous model">
              <i className="fas fa-chevron-left" />
            </button>
            <div className="gallery3d-dots">
              {MODELS.map((m, i) => (
                <button
                  key={m.path}
                  type="button"
                  className={'gallery3d-dot' + (i === active ? ' active' : '')}
                  onClick={() => go(i)}
                  aria-label={`Show ${m.name}`}
                />
              ))}
            </div>
            <button type="button" className="gallery3d-btn" onClick={() => go(active + 1)} aria-label="Next model">
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function startViewer(container, onStatus, onError) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  const canvas = renderer.domElement;
  canvas.className = 'gallery3d-canvas';
  container.appendChild(canvas);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.2;
  controls.target.set(0, 0, 0);
  controls.update();

  const ambient = new THREE.AmbientLight(0x404060, 0.7);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffd84b, 1.7);
  key.position.set(4, 4, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x8a9bff, 0.7);
  fill.position.set(-3, -1, 3);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 0.55);
  rim.position.set(0, -4, -5);
  scene.add(rim);

  const entries = [];
  let currentObject = null;
  let currentIndex = 0;
  let rafId = 0;
  let running = true;
  let visible = !document.hidden;
  let mounted = true;

  function resize() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  resize();

  const ro = new ResizeObserver(() => {
    if (mounted) resize();
  });
  ro.observe(container);

  const onVisibility = () => {
    visible = !document.hidden;
    if (visible) renderer.setAnimationLoop(loop);
    else renderer.setAnimationLoop(null);
  };
  document.addEventListener('visibilitychange', onVisibility);

  function fit(object) {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    if (box.isEmpty()) {
      camera.position.set(0, 0, 5);
    } else {
      const size = box.getSize(new THREE.Vector3());
      const center = new THREE.Vector3();
      box.getCenter(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const dist = maxDim > 0.01 ? (maxDim / 2) / Math.tan((camera.fov * Math.PI) / 360) * 1.5 : 5;
      camera.position.set(0, 0, Math.max(dist, 1.5));
      controls.target.copy(center);
    }
    controls.update();
  }

  function show(index) {
    if (currentObject) scene.remove(currentObject);
    const entry = entries[index];
    if (!entry) return;
    currentObject = entry.object;
    currentIndex = index;
    scene.add(currentObject);
    fit(currentObject);
  }

  function loop() {
    if (!running || !mounted || !visible) return;
    controls.update();
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(loop);

  const loader = new GLTFLoader();
  let remaining = MODELS.length;
  let shown = false;
  const maybeShow = (index) => {
    if (shown || !entries[index]) return;
    shown = true;
    show(index);
  };
  const finish = () => {
    if (!mounted) return;
    maybeShow(0);
    onStatus('ready');
  };
  MODELS.forEach((model, mi) => {
    loader.load(
      model.path,
      (gltf) => {
        if (!mounted) return;
        const obj = gltf.scene;
        obj.traverse((c) => {
          if (c.isMesh) {
            c.material = c.material.clone();
            c.material.envMapIntensity = 0.55;
            c.material.metalness = 0.6;
            c.material.roughness = 0.4;
          }
        });
        entries[mi] = { name: model.name, object: obj };
        maybeShow(0);
        if (--remaining === 0) finish();
      },
      undefined,
      (err) => {
        if (!mounted) return;
        const color = new THREE.Color(FALLBACK_COLOR);
        const geo = new THREE.TorusKnotGeometry(0.8, 0.3, 64, 16);
        const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.6, roughness: 0.3 });
        const fallback = new THREE.Mesh(geo, mat);
        entries[mi] = { name: model.name, object: fallback };
        maybeShow(0);
        if (--remaining === 0) finish();
        onError(`Model "${model.name}" unavailable — showing placeholder.`);
        console.warn('Gallery3D: GLB load failed —', model.path, err?.message || String(err));
      }
    );
  });

  function goTo(index) {
    if (!entries.length) return;
    const i = ((index % entries.length) + entries.length) % entries.length;
    if (i === currentIndex) return;
    show(i);
  }

  function dispose() {
    mounted = false;
    running = false;
    renderer.setAnimationLoop(null);
    document.removeEventListener('visibilitychange', onVisibility);
    ro.disconnect();
    controls.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  }

  return {
    goTo,
    currentIndex: () => currentIndex,
    dispose,
  };
}
