(() => {
	const container = document.createElement('div');
	const btn = document.createElement('button');
	let timer = 0;
	
	container.className = 'container';
	btn.className = 'message';
	btn.innerText = 'Готовы ?';
	container.append(btn);
	document.body.prepend(container);

	btn.onclick = () => {
		let interval = setInterval(() => {
			++timer;

			if (timer === 1) {
				container.style.opacity = '0';
				container.style.zIndex = '-1';
				audio.volume = 0.4;
			}

			if (timer === 2) {
				audio.volume = 0.7;
			}

			if (timer === 5) {
				audio.volume = 0.5;
			}

			if (timer === 7) {
				audio.volume = 0.4;
			}

			if (timer === 10) {
				clearInterval(interval);
				btn.remove();
				timer = 0;
				audio.volume = 0.2;
				container.style.opacity = '1';
				container.style.zIndex = '1';

				const backMessage = document.createElement('a');

				backMessage.className = 'message';
				backMessage.innerText = 'Привет !';

				let messages = setInterval(() => {
					++timer;
					if (timer === 3) {
						backMessage.innerText = 'Перед вами технология Web GL + Tree JS';
					}
					if (timer === 6) {
						backMessage.innerText = 'Я Frontend разработчик (Middle)';
					}
					if (timer === 9) {
						backMessage.innerText = 'Я Frontend разработчик (Middle)';
					}
					if (timer === 12) {
						backMessage.innerText = 'Хотите пообщаться со мной ?';
					}
					if (timer === 15) {
						backMessage.innerText = 'Нажмите чтобы увидеть Мой Telegram \n Мой номер телефона +7 929 885 18 02';
						backMessage.href = 'https://t.me/Onesuch';
						backMessage.classList.add('anim');
					}
					if (timer === 18) {
						clearInterval(messages);
						timer = 0;
					}

				}, 1000);
				container.style.opacity = '0.7';
				container.append(backMessage);
			}
		}, 1000);

		let audio = new Audio('./assets/mp3/Medianoche.mp3');
		let source = document.createElement('source');

		audio.controls = true;
		audio.className = 'audio';
		audio.onended = () => {
			audio.remove();
		};
		audio.volume = 0.2;
		audio.play();

		document.body.prepend(audio);
		audio.prepend(source);

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
		document.body.prepend(renderer.domElement);

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 5000 );

		camera.position.set(0,0, 1000);

		const light = new THREE.AmbientLight( 0xffffff );

		scene.add(light);

		const geometryPlanet = new THREE.SphereGeometry( 150, 150, 20, 20 );
		const planetTexture = new THREE.TextureLoader().load('./assets/images/textures/planet.jpg');

		const materialPlanet = new THREE.MeshBasicMaterial({ map: planetTexture, overdraw: true });
		const meshPlanet = new THREE.Mesh(geometryPlanet, materialPlanet);
		scene.add(meshPlanet);

		let starGeometry = new THREE.BoxGeometry();
		const starTexture = new THREE.TextureLoader().load('./assets/images/textures/star.png');
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
			audio.play();
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
	};
})();