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

	camera.position.set(0,0, 1000);

	const light = new THREE.AmbientLight( 0xffffff );
	scene.add(light);

	const geometryLight = new THREE.SphereGeometry( 150, 150, 20, 20 ); // Ширина, высота, количество клеточек на плоскости
	const material = new THREE.MeshBasicMaterial({
		color: 0x00ff00,
		wireframe: true
	});
	const mesh = new THREE.Mesh(geometryLight, material);
	scene.add(mesh);

	function animate() {
		requestAnimationFrame( animate );

		mesh.position.x += sphere.positionX;
		mesh.position.y += sphere.positionY;
		mesh.position.z += sphere.positionZ;
		mesh.rotation.x += sphere.rotationX;
		mesh.rotation.y += sphere.rotationY;
		mesh.rotation.z += sphere.rotationZ;

		renderer.render( scene, camera );
	}

	animate();
})();