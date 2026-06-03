<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref<HTMLDivElement>()

let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer
let helix: THREE.Group, particles: THREE.Points
let animationId: number

const COLORS = {
  cyan: 0x00ffff,
  purple: 0xbf5fff,
  magenta: 0xff44cc,
  blue: 0x3366ff,
  green: 0x00ff88,
}

function createDNAHelix(): THREE.Group {
  const group = new THREE.Group()
  const radius = 1.6
  const height = 12
  const turns = 3.5
  const pointsPerTurn = 60
  const totalPoints = turns * pointsPerTurn

  // Backbone 1 (cyan)
  const curve1: THREE.Vector3[] = []
  const curve2: THREE.Vector3[] = []
  const rungPositions: [THREE.Vector3, THREE.Vector3][] = []

  for (let i = 0; i <= totalPoints; i++) {
    const t = i / pointsPerTurn
    const angle = t * Math.PI * 2
    const y = (i / totalPoints) * height - height / 2

    const x1 = Math.cos(angle) * radius
    const z1 = Math.sin(angle) * radius
    const x2 = Math.cos(angle + Math.PI) * radius
    const z2 = Math.sin(angle + Math.PI) * radius

    curve1.push(new THREE.Vector3(x1, y, z1))
    curve2.push(new THREE.Vector3(x2, y, z2))

    // Rungs every few points
    if (i % 3 === 0) {
      rungPositions.push([new THREE.Vector3(x1, y, z1), new THREE.Vector3(x2, y, z2)])
    }
  }

  // Draw backbones
  const matCyan = new THREE.MeshStandardMaterial({ color: COLORS.cyan, emissive: COLORS.cyan, emissiveIntensity: 0.8, roughness: 0.2, metalness: 0.3 })
  const matPurple = new THREE.MeshStandardMaterial({ color: COLORS.purple, emissive: COLORS.purple, emissiveIntensity: 0.8, roughness: 0.2, metalness: 0.3 })

  for (const [curve, color] of [[curve1, matCyan], [curve2, matPurple]] as const) {
    const tubeCurve = new THREE.CatmullRomCurve3(curve as THREE.Vector3[])
    const tubeGeo = new THREE.TubeGeometry(tubeCurve, 200, 0.06, 8, false)
    const tube = new THREE.Mesh(tubeGeo, color)
    group.add(tube)
  }

  // Draw rungs
  const rungMat = new THREE.MeshStandardMaterial({ color: COLORS.magenta, emissive: COLORS.magenta, emissiveIntensity: 0.4, roughness: 0.4, transparent: true, opacity: 0.7 })
  for (const [p1, p2] of rungPositions) {
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5)
    const dir = new THREE.Vector3().subVectors(p2, p1)
    const len = dir.length()
    const cyl = new THREE.CylinderGeometry(0.03, 0.03, len, 6)
    const mesh = new THREE.Mesh(cyl, rungMat)
    mesh.position.copy(mid)
    mesh.lookAt(p2)
    mesh.rotateX(Math.PI / 2)
    group.add(mesh)
  }

  // Base pairs as small spheres
  const baseGeo = new THREE.SphereGeometry(0.12, 8, 8)
  for (const [p1, p2] of rungPositions.slice(0, 30)) {
    const mat = Math.random() > 0.5 ? matCyan : matPurple
    const s1 = new THREE.Mesh(baseGeo, mat)
    s1.position.copy(p1)
    group.add(s1)
    const s2 = new THREE.Mesh(baseGeo, mat)
    s2.position.copy(p2)
    group.add(s2)
  }

  return group
}

function createParticles(): THREE.Points {
  const count = 800
  const geo = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  const colorArr = [COLORS.cyan, COLORS.purple, COLORS.magenta, COLORS.green, COLORS.blue]
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    const r = 4 + Math.random() * 10
    positions[i * 3] = Math.cos(theta) * Math.sin(phi) * r
    positions[i * 3 + 1] = Math.cos(phi) * r
    positions[i * 3 + 2] = Math.sin(theta) * Math.sin(phi) * r

    const col = new THREE.Color(colorArr[Math.floor(Math.random() * colorArr.length)])
    colors[i * 3] = col.r
    colors[i * 3 + 1] = col.g
    colors[i * 3 + 2] = col.b
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const mat = new THREE.PointsMaterial({ size: 0.06, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.6 })
  return new THREE.Points(geo, mat)
}

onMounted(() => {
  if (!container.value) return

  // Scene
  scene = new THREE.Scene()

  // Camera
  camera = new THREE.PerspectiveCamera(45, container.value.clientWidth / container.value.clientHeight, 0.1, 50)
  camera.position.set(0, 1, 10)
  camera.lookAt(0, 0, 0)

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  container.value.appendChild(renderer.domElement)

  // Lights
  const ambient = new THREE.AmbientLight(0x1a1a3e, 1.5)
  scene.add(ambient)
  const point1 = new THREE.PointLight(COLORS.cyan, 30, 20)
  point1.position.set(5, 2, 5)
  scene.add(point1)
  const point2 = new THREE.PointLight(COLORS.purple, 30, 20)
  point2.position.set(-5, -2, 5)
  scene.add(point2)
  const point3 = new THREE.PointLight(COLORS.magenta, 20, 15)
  point3.position.set(0, 5, -5)
  scene.add(point3)

  // Fog
  scene.fog = new THREE.FogExp2(0x0a0a1e, 0.008)

  // DNA Helix
  helix = createDNAHelix()
  helix.rotation.x = -0.3
  scene.add(helix)

  // Particles
  particles = createParticles()
  scene.add(particles)

  // Mouse tracking
  let mouseX = 0, mouseY = 0
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  })

  // Animation loop
  function animate() {
    animationId = requestAnimationFrame(animate)

    const t = Date.now() * 0.001

    helix.rotation.y += 0.005
    helix.rotation.y += mouseX * 0.002
    helix.rotation.x += (mouseY * 0.002 - helix.rotation.x) * 0.02

    particles.rotation.y += 0.001
    particles.rotation.x += 0.0003

    // Pulsing lights
    point1.intensity = 25 + Math.sin(t * 2) * 8
    point2.intensity = 25 + Math.cos(t * 2.3) * 8
    point3.intensity = 18 + Math.sin(t * 1.7 + 1) * 6

    renderer.render(scene, camera)
  }
  animate()

  // Resize handler
  window.addEventListener('resize', () => {
    if (!container.value) return
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  })
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer?.dispose()
})
</script>

<template>
  <div ref="container" class="w-full h-full absolute inset-0"></div>
</template>
