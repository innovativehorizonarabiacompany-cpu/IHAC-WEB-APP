'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MODELS = [
  {
    name: 'Electric Control Box',
    path: '/blender-models/Electric_Box.glb',
    meta: 'The command center for automated industrial processes.',
  },
  {
    name: 'Control Cabinet',
    path: '/blender-models/Control_Cabinet.glb',
    meta: 'Engineered and manufactured from high-quality components for reliable operation.',
  },
];

const FALLBACK_COLOR = 0xc88a1a;
const SWAP_MS = 190;

export default function ITHRION3DShowcase() {
  const containerRef = useRef(null);
  const apiRef = useRef(null);
  const timersRef = useRef([]);
  const [status, setStatus] = useState('idle');
  const [active, setActive] = useState(0);
  const [error, setError] = useState(null);
  const [switching, setSwitching] = useState(false);

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
          const api = startViewer(
            container,
            (s) => {
              if (!disposed) {
                setStatus(s);
                if (s === 'ready') setError(null);
              }
            },
            (msg) => {
              if (!disposed) setError(msg);
            }
          );
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
      timersRef.current.forEach(clearTimeout);
      if (cleanup) cleanup();
    };
  }, []);

  const select = (i) => {
    if (switching || !apiRef.current || i === active) return;
    setSwitching(true);
    timersRef.current.push(setTimeout(() => apiRef.current.goTo(i), SWAP_MS));
    timersRef.current.push(setTimeout(() => {
      setActive(i);
      setSwitching(false);
    }, SWAP_MS * 2));
  };

  return (
    <div className="ith3d">
      <div className="ith3d-select" role="tablist" aria-label="Choose 3D model">
        {MODELS.map((m, i) => (
          <button
            key={m.path}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={'ith3d-select-btn' + (i === active ? ' active' : '')}
            onClick={() => select(i)}
          >
            <span className="ith3d-select-num">0{i + 1}</span>
            <span className="ith3d-select-name">{m.name}</span>
          </button>
        ))}
      </div>

      <div className={'ith3d-stage' + (switching ? ' switching' : '')} ref={containerRef}>
        <div className="ith3d-swap" aria-hidden="true" />
        {status !== 'ready' && (
          <div className="ith3d-overlay">
            {status === 'loading' && <span className="ith3d-spinner" aria-hidden="true" />}
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

      <div className="ith3d-meta">
        <span className="ith3d-meta-name">{MODELS[active] ? MODELS[active].name : ''}</span>
        <span className="ith3d-meta-line">{MODELS[active] ? MODELS[active].meta : ''}</span>
      </div>
      <p className="ith3d-hint">Drag to rotate &middot; auto-orbit on</p>
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
  canvas.className = 'ith3d-canvas';
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
    entry.object.scale.setScalar(0.96);
    entry.object.traverse((c) => {
      if (c.isMesh) {
        c.material.transparent = true;
        c.material.opacity = 0.35;
      }
    });
    currentObject = entry.object;
    currentIndex = index;
    scene.add(currentObject);
    fit(currentObject);
  }

  function loop() {
    if (!running || !mounted || !visible) return;
    if (currentObject) {
      const s = currentObject.scale.x;
      if (s < 0.999) currentObject.scale.setScalar(Math.min(1, s + (1 - s) * 0.07));
      currentObject.traverse((c) => {
        if (c.isMesh && c.material.opacity < 0.999) {
          c.material.opacity = Math.min(1, c.material.opacity + 0.07);
        }
      });
    }
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
        console.warn('ITHRION3DShowcase: GLB load failed —', model.path, err?.message || String(err));
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
