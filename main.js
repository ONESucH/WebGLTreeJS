(() => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	let loadWorld = false;

	const gui = new dat.GUI();

	const planeta = {
		positionX: 0,
		positionY: 0,
		positionZ: 0,
		rotationX: 0.001,
		rotationY: 0,
		rotationZ: 0.001,
	};

	const cameraAnimation = {
		rotationX: 0.001,
		rotationY: 0,
		rotationZ: 0.001,
	};

	gui.add(planeta, 'positionX').min(-0.01).max(0.01).step(0.001);
	gui.add(planeta, 'positionY').min(-0.01).max(0.01).step(0.001);
	gui.add(planeta, 'positionZ').min(-0.01).max(0.01).step(0.001);

	gui.add(planeta, 'rotationX').min(-0.01).max(0.01).step(0.001);
	gui.add(planeta, 'rotationY').min(-0.01).max(0.01).step(0.001);
	gui.add(planeta, 'rotationZ').min(-0.01).max(0.01).step(0.001);

	const renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(0x000000);
	renderer.setSize( width, height );
	document.body.before( renderer.domElement);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 5000 );

	camera.position.set(0,0, 1000);

	const light = new THREE.AmbientLight( 0xffffff );

	scene.add(light);

	const geometryPlanet = new THREE.SphereGeometry( 150, 150, 20, 20 );
	const planetTexture = new THREE.TextureLoader().load('./images/textures/planet.jpg');

	const materialPlanet = new THREE.MeshBasicMaterial({ map: planetTexture, overdraw: true });
	const meshPlanet = new THREE.Mesh(geometryPlanet, materialPlanet);
	scene.add(meshPlanet);

	let starGeometry = new THREE.BoxGeometry();
	const starTexture = new THREE.TextureLoader().load('./images/textures/star.png');
	const startMaterial = new THREE.PointsMaterial({
		color: 0xaaaaaa,
		size: 0.7,
		map: starTexture
	});
	const starsPoints = new THREE.Points(starGeometry, startMaterial);
	scene.add(starsPoints);

	setTimeout(() => {
		loadWorld = true;
	}, 10000);

	if (loadWorld) {
		camera.position.set(
				cameraAnimation.rotationX,
				cameraAnimation.rotationY,
				cameraAnimation.rotationZ
		);
	}

	function animate() {
		starGeometry.velocity += 1000;
		starGeometry.acceleration += 2000;
		starGeometry.verticesNeedUpdate = true;
		starsPoints.rotation.y += 0.1;
		starsPoints.rotation.z += 0.1;
		requestAnimationFrame( animate );

		meshPlanet.rotation.x += planeta.positionX;
		meshPlanet.rotation.y += planeta.positionY;
		meshPlanet.rotation.z += planeta.positionZ;

		meshPlanet.rotation.x += planeta.rotationX;
		meshPlanet.rotation.y += planeta.rotationY;
		meshPlanet.rotation.z += planeta.rotationZ;

		if (!loadWorld) {
			loadWorld = false;
			camera.position.set(
					cameraAnimation.rotationX += 0.1,
					cameraAnimation.rotationY += 0.1,
					cameraAnimation.rotationZ += 1
			);
		}

		renderer.render( scene, camera );
	}

	animate();
})();