import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lake (water plane)
const lakeGeometry = new THREE.PlaneGeometry(100, 100);
const lakeMaterial = new THREE.MeshPhongMaterial({ color: 0x1e90ff, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
const lake = new THREE.Mesh(lakeGeometry, lakeMaterial);
lake.rotation.x = -Math.PI / 2;
lake.position.y = -1;
scene.add(lake);

// Fountain Base
const baseGeometry = new THREE.CylinderGeometry(3, 3, 0.5, 32);
const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });
const base = new THREE.Mesh(baseGeometry, baseMaterial);
scene.add(base);

// Water Jets
const jets = [];
const jetMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.8 });
for (let i = 0; i < 5; i++) {
    const jetGeometry = new THREE.CylinderGeometry(0.2, 0.2, 5, 16);
    const jet = new THREE.Mesh(jetGeometry, jetMaterial);
    jet.position.set(Math.cos(i * (Math.PI / 2.5)) * 1.5, 2.5, Math.sin(i * (Math.PI / 2.5)) * 1.5);
    scene.add(jet);
    jets.push(jet);
}

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const spotlight = new THREE.SpotLight(0xffffff, 1, 50, Math.PI / 4, 0.5, 2);
spotlight.position.set(0, 10, 10);
scene.add(spotlight);

// Camera Position
camera.position.set(0, 5, 20);
camera.lookAt(0, 2, 0);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    jets.forEach((jet, index) => {
        jet.scale.y = 1 + 0.3 * Math.sin(Date.now() * 0.005 + index);
    });
    renderer.render(scene, camera);
}

animate();
