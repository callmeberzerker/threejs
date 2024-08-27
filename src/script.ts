import gsap from 'gsap'
import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const gui = new GUI({
    width: 300,
    title: 'My GUI',
    closeFolders: true,
})

// gui.close()
gui.hide()

const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log('loading started')
}
loadingManager.onLoad = () => {
    console.log('loading finished')
}

loadingManager.onProgress = () => {
    console.log('lm progressing')
}

loadingManager.onError = () => {
    console.log('lm error')
}
const textureLoader = new THREE.TextureLoader(loadingManager)

// const colorTexture = textureLoader.load('/textures/door/color.jpg')
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
const colorTexture = textureLoader.load('/textures/minecraft.png')
// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/textures/door/height.jpg')
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load(
//     '/textures/door/ambientOcclusion.jpg'
// )
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// colorTexture.rotation = Math.PI * 0.25
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter
// colorTexture.ma

window.addEventListener('keydown', (event) => {
    if (event.key === 'h') {
        gui.show(gui._hidden)
    }
})

const cubeFolder = gui.addFolder('Awesome cube')

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

const count = 66
const positionsArray = new Float32Array(count * 3 * 3)

for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

const debugObject = {} as {
    color: string
    spin: () => void
    subdivision: number
}

debugObject.color = '#3e7058'
colorTexture.colorSpace = THREE.SRGBColorSpace

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
console.log(geometry.attributes.uv)

const mesh = new THREE.Mesh(geometry, material)

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

cubeFolder.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')
cubeFolder.add(mesh, 'visible')
cubeFolder.add(mesh.material, 'wireframe')
cubeFolder.addColor(debugObject, 'color').onChange((e: any) => {
    mesh.material.color.set(debugObject.color)
})

// cubeFolder.add(geometry, 'widthSegments')

const myObject = {
    myVariable: 1337,
}

cubeFolder.add(myObject, 'myVariable').min(-3).max(3).step(0.01).name('fff')

debugObject.spin = () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}

debugObject.subdivision = 2
cubeFolder.add(debugObject, 'spin')
cubeFolder
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .name('subdivision')
    .onFinishChange(() => {
        const currentSubdivision = debugObject.subdivision
        const newGeometry = new THREE.BoxGeometry(
            1,
            1,
            1,
            currentSubdivision,
            currentSubdivision,
            currentSubdivision
        )
        mesh.geometry.dispose()
        mesh.geometry = newGeometry
    })

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
