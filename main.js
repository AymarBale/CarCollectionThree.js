let scene, camera, renderer, hlight, directionalLight, light, light2, light3, light4, car, controls;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.x = 800;
    camera.position.y = 100;
    camera.position.z = 1000;
    renderer = new THREE.WebGL1Renderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    hlight = new THREE.AmbientLight(0x404040, 10);

    scene.add(hlight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    let collection = ['./3dFiles/car1/car1.gltf', './3dFiles/car2/scene.gltf',
        './3dFiles/car3/scene.gltf', './3dFiles/car4/scene.gltf', './3dFiles/car5/scene.gltf',
        './3dFiles/car6/scene.gltf']
    let path = './3dFiles/car1/car1.gltf';

    /*light = new THREE.PointLight(0xc4c4c4, 10);
    light.position.set(0, 300, 500);
    scene.add(light);

    light2 = new THREE.PointLight(0xc4c4c4, 10);
    light2.position.set(500, 100, -500);
    scene.add(light2);

    light3 = new THREE.PointLight(0xc4c4c4, 10);
    light3.position.set(0, 300, -500);
    scene.add(light3);

    light4 = new THREE.PointLight(0xc4c4c4, 10);
    light4.position.set(-500, 300, 0);
    scene.add(light4);*/

    let loader = new THREE.GLTFLoader();
    loader.load(path, function (gltf) {
        car = gltf.scene.children[0];
        car.scale.set(39.5, 39.5, 39.5);
        scene.add(gltf.scene);
        animate();
    })
}
function render() {
    renderer.render(scene, camera);
}
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


init();