import gsap from 'gsap'
import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const gui = new GUI()

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

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
    const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        // leave fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (canvas.webkitExitFullscreen) {
            canvas.webkitExitFullscreen()
        }
    }
})

const geometry = new THREE.BufferGeometry()
// const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0])
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

const count = 66
const positionsArray = new Float32Array(count * 3 * 3)

for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

geometry.setAttribute('position', positionsAttribute)

const debugObject = {} as { color: string; spin: () => void }

debugObject.color = '#3e7058'

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
    // geometry,
    new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
)

scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

const clock = new THREE.Clock()

gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')
gui.add(mesh, 'visible')
gui.add(mesh.material, 'wireframe')
gui.addColor(debugObject, 'color').onChange((e: any) => {
    mesh.material.color.set(debugObject.color)
})

const myObject = {
    myVariable: 1337,
}

gui.add(myObject, 'myVariable').min(-3).max(3).step(0.01).name('fff')

debugObject.spin = () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}

gui.add(debugObject, 'spin')

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
