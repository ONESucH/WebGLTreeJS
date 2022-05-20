(() => {
	const width = window.innerWidth;
	const height = window.innerHeight;

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

		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.02;
		mesh.rotation.z += 0.01;

		renderer.render( scene, camera );
	}

	animate();
})();