var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.z = 30;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var light = new THREE.AmbientLight(0xFFFFFF);
scene.add(light);

var imagePrefix = '/img/';
var urls = ['space.jpg', 'space.jpg', 'space.jpg','space.jpg','space.jpg','space.jpg'];
var skyBox = new THREE.CubeTextureLoader().setPath(imagePrefix).load(urls);
scene.background = skyBox;

function createSphere(radius, filePath, xPosition, yPosition, zPosition){
    geometry = new THREE.SphereGeometry(radius, 32, 32);
    material = new THREE.MeshPhongMaterial();
    material.map = new THREE.TextureLoader().load(filePath);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = xPosition || 0;
    mesh.position.y = yPosition || 0;
    mesh.position.z = zPosition || 0;
    var pivot= new THREE.Object3D();
    pivot.add(mesh);
    scene.add(pivot);
    return pivot;
}

var earth = createSphere(5, '/img/earthmap4k.jpg');
var moon = createSphere(1, '/img/moonmap4k.jpg', 0, 0, 10);
var mars = createSphere(1, '/img/marsmap1k.jpg', -20, 0, 0 );

var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;

var loader = new THREE.FontLoader();
loader.load('fonts/gentilis_bold.typeface.json', function(font){
    var geometry = new THREE.TextGeometry('Hello Saffron', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThicknes: 10,
        bevelSize: 8,
        bevelSegments: 5
    });
});

var render = function(){
    requestAnimationFrame(render);
    earth.rotation.x += 0.005;
    earth.rotation.y += 0.005;
    moon.rotation.y += 0.02;
    mars.rotation.y += 0.005;
    mars.rotation.x += 0.005;
    renderer.render(scene, camera);
}

render();
