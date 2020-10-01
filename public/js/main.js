let scene, camera, renderer, stars, starGeo;

function init() {
  //initial configuration
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 1;
  camera.position.x = Math.PI / 2;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement).setAttribute('id', 'landing3d');

  //resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
  //stars
  starGeo = new THREE.Geometry();
  for (let i = 0; i < 9000; i++) {
    star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.02;
    starGeo.vertices.push(star);
  }
  let sprite = new THREE.TextureLoader().load("w.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite,
  });
  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
  //star animation

  animate();
}
function animate() {
  starGeo.vertices.forEach((p) => {
    p.velocity += p.acceleration;
    p.x -= p.velocity;
    if (p.x < -200) {
      p.x = 200;
      p.velocity = 0;
    }
  });
  starGeo.verticesNeedUpdate = true;
  stars.rotation.y += 0.002;
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
init();
