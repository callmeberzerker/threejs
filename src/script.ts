import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Canvas
const canvas = document.querySelector('canvas.webgl')! as HTMLElement

// Scene
const scene = new THREE.Scene()

const cursor = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

/**
 * Object
 */

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
    100,
    sizes.width / sizes.height,
    0.1,
    100
)

const controls = new OrbitControls(camera, canvas)
// controls.target.y = 2
controls.enableDamping = true
controls.update()

const aspectRatio = sizes.width / sizes.height

camera.position.set(0, 0, 3)
camera.lookAt(mesh.position)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas!,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const clock = new THREE.Clock()

const tick = () => {
    // Call tick again on the next frame

    const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)

    // mesh.rotation.y = elapsedTime
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)

    // Update controls
    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
