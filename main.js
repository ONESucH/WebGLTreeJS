(() => {
	const width = window.innerWidth;
	const height = window.innerHeight;

	const gui = new dat.GUI();

	const sphere = {
		positionX: 0,
		positionY: 0,
		positionZ: 0,
		rotationX: 0,
		rotationY: 0,
		rotationZ: 0,
	};

	gui.add(sphere, 'positionX').min(-1).max(1).step(0.01);
	gui.add(sphere, 'positionY').min(-1).max(1).step(0.01);
	gui.add(sphere, 'positionZ').min(-5).max(5).step(0.1);

	gui.add(sphere, 'rotationX').min(-0.02).max(0.02).step(0.001);
	gui.add(sphere, 'rotationY').min(-0.02).max(0.02).step(0.001);
	gui.add(sphere, 'rotationZ').min(-0.02).max(0.02).step(0.001);

	const titleText = document.createElement('div');
	titleText.className = 'title';
	titleText.innerText = 'WEBGL + TreeJS';
	document.body.appendChild( titleText );

	const renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000);
	renderer.setSize( width, height );
	document.body.appendChild( renderer.domElement );

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 5000 );

	camera.position.set(150,0, 1000);

	const light = new THREE.AmbientLight( 0xffffff );
	scene.add(light);

	const geometrySphere = new THREE.SphereGeometry( 150, 150, 20, 20 ); // Ширина, высота, количество клеточек на плоскости
	const materialSphere = new THREE.MeshBasicMaterial({
		color: 0x00ff00,
		wireframe: true
	});
	const meshSphere = new THREE.Mesh(geometrySphere, materialSphere);
	meshSphere.position.y = -150;
	scene.add(meshSphere);

	const geometrySphereTX = new THREE.SphereGeometry( 150, 150, 20, 20 );

	let sphereTexture = new THREE.Texture();
	let sphereLoader = new THREE.ImageLoader();

	sphereLoader.load(
			'./images/textures/planet.jpg',
			( image ) => {
				sphereTexture.image = image;
				sphereTexture.needsUpdate = true;
			}
	);

	const materialSphereTX = new THREE.MeshBasicMaterial({ map: sphereTexture, overdraw: true });
	const meshSphereTX = new THREE.Mesh(geometrySphereTX, materialSphereTX);
	meshSphereTX.position.y = 200;
	scene.add(meshSphereTX);

	const geometryCube = new THREE.BoxGeometry(150, 150, 150);

	let cubeTexture = new THREE.Texture();
	let loader = new THREE.ImageLoader();

	loader.load(
			'./images/textures/box.jpg',
			 ( image ) => {
				cubeTexture.image = image;
				cubeTexture.needsUpdate = true;
			}
	);

	const materialCube = new THREE.MeshBasicMaterial({ map: cubeTexture, overdraw: true });
	const meshCube = new THREE.Mesh(geometryCube, materialCube);
	meshCube.position.x = 150 * 2.5;
	meshCube.rotation.y = width / 3;
	scene.add(meshCube);

	function animate() {
		requestAnimationFrame( animate );

		meshCube.rotation.z += 0.01;

		meshSphereTX.rotation.x += 0.001;
		meshSphereTX.rotation.y += 0.001;
		meshSphereTX.rotation.z += 0.001;

		meshSphere.position.x += sphere.positionX;
		meshSphere.position.y += sphere.positionY;
		meshSphere.position.z += sphere.positionZ;
		meshSphere.rotation.x += sphere.rotationX;
		meshSphere.rotation.y += sphere.rotationY;
		meshSphere.rotation.z += sphere.rotationZ;

		renderer.render( scene, camera );
	}

	animate();
})();