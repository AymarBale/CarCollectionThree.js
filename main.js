let scene, camera, renderer, hlight, directionalLight, light, light2, light3, light4, car, controls;
let index = 5;
let collection = ['./3dFiles/car1/car1.gltf', './3dFiles/car2/scene.gltf',
    './3dFiles/car3/scene.gltf', './3dFiles/car4/scene.gltf', './3dFiles/car5/scene.gltf',
    './3dFiles/car6/scene.gltf']
let path = collection[index];

window.addEventListener('DOMContentLoaded', (event) => {
    // Now the changeCarL and changeCarR functions should be available
    document.getElementById('leftBut').addEventListener('click', changeCarL);
    document.getElementById('rightBut').addEventListener('click', changeCarR);
    document.getElementById('playSound').addEventListener('click', toggleMusicPlayback)


});
function toggleMusicPlayback() {
    var audio = document.getElementById("menuSound");
    audio.volume = 0.1
    // Check if audio is paused or playing
    if (audio.paused) {
        // If paused, play the audio
        audio.play(); // You can change the color or add an icon to indicate playback
    } else {
        // If playing, pause the audio
        audio.pause(); // You can reset the color or icon
    }
}
function init() {
    /*let menuSound = document.getElementById("menuSound");
    menuSound.play();
    menuSound.volume = 0.1;*/
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

    loadModel(path);
}


function loadModel(modelPath) {
    // Remove the existing car from the scene if it exists
    console.log(index)
    if (car) {
        scene.remove(scene.children[2])
    }

    let loader = new THREE.GLTFLoader();
    loader.load(modelPath, function (gltf) {
        car = gltf.scene.children[0];
        let s = 100
        switch (index) {
            case 0:
                car.rotation.y += 10.9;
                car.position.y -= 100;
                s = 80.5
                break;
            case 1:
                car.position.y -= 100;
                s = 450;
                break
            case 2:
                car.position.y -= 100;
                s = 200;
                break;
            case 3:
                car.position.y += 10;
                car.position.x += 100
                car.rotation.z += 14.25
                s = 300;
                break;
            case 4:
                car.position.x += 1000;
                car.position.y -= 180;
                s = 50
                break;
            case 5:
                car.position.x += 100;
                car.position.z -= 1300;
                car.position.y -= 180;
                car.rotation.z -= 74
                s = 50;
                break;

            default:

        }


        car.scale.set(s, s, s);

        scene.add(gltf.scene);
        animate();
    });
}
function changeCarL() {
    if (index == 0) {

    } else if (index > 0) {
        index--;
        path = collection[index]
        loadModel(path);
    }

}

function changeCarR() {
    if (index <= 4) {
        index++;
        path = collection[index]
        loadModel(path);
    }
}
function render() {
    renderer.render(scene, camera);
}
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


init();