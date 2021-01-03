import Stats from '/jsm/libs/stats.module'

export function addWindowListener(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, render: () => void) {
    window.addEventListener('resize', function() {
        onWindowResize(camera, renderer, render)
    });
}

export function addStatsPanel(): Stats {
    const stats = Stats()
    document.body.appendChild(stats.domElement)
    return stats
}

function onWindowResize(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, render: () => void) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}