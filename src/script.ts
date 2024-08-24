import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.set(0, 0, 3)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas!,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

let time = Date.now()

const tick = () => {
    // Call tick again on the next frame
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    console.log(deltaTime)
    time = currentTime

    mesh.rotation.y += 0.01
    // mesh.position.x -= 0.01;

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
