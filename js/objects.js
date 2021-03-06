/*
 * exports all objects in an array, containing:
 * 	lights
 * 	sea
 *  sky
 *  airplane
 */

let sea, cloud, sky, airplane

// sea
sea = (function() {
	let sea
	let geometry = new THREE.SphereGeometry(2000, 30, 30)
	geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2))
	let material = new THREE.MeshPhongMaterial({
		color: 0x00aaff,
		flatShading: true
	})
	sea = new THREE.Mesh(geometry, material)
	sea.receiveShadow = true
	sea.update = function() {
		this.rotation.z += 0.005
	}
	sea.name = 'sea'
	return sea
})()

// cloud function (for populating the sky)
function Cloud() {
	let cloud = new THREE.Object3D()
	let geometry = new THREE.BoxGeometry(20, 20, 20)
	let material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		transparent: true,
		opacity: 0.8,
		flatShading: true
	})
	let numBlocks = Math.floor(Math.random() * 3) + 3
	for (let i = 0; i < numBlocks; ++i) {
		let block = new THREE.Mesh(geometry, material)
		block.position.x = i * 15
		block.position.y = 5 + Math.random() * 5
		block.position.z = 5 + Math.random() * 5
		block.rotation.z = Math.random() * Math.PI * 2
		block.rotation.y = Math.random() * Math.PI * 2
		let s = Math.random() * 0.7 + 0.3
		block.scale.set(s, s, s)
		block.castShadow = true
		block.receiveShadow = true
		cloud.add(block)
	}

	return cloud
}

// sky
sky = (function() {
	let sky = new THREE.Object3D()
	let numClouds = 20
	let stepAngle = (Math.PI * 2) / numClouds
	for (let i = 0; i < numClouds; ++i) {
		let c = new Cloud()
		let angle = stepAngle * i
		let height = 2050 + Math.random() * 200
		c.position.x = Math.cos(angle) * height
		c.position.y = Math.sin(angle) * height
		c.position.z = -400 + Math.random() * 800
		c.rotation.z = angle + Math.PI / 2
		let s = 1 + Math.random() * 2
		c.scale.set(s, s, s)
		sky.add(c)
	}
	sky.update = function() {
		this.rotation.z += 0.005
	}
	sky.name = 'sky'

	return sky
})()

// airplane
airplane = (function() {
	let airplane = new THREE.Object3D()

  // cockpit
  let gCockpit = new THREE.BoxGeometry(60, 50, 50)
  let mCockpit = new THREE.MeshPhongMaterial({
  	color: 0xff4c4c,
  	flatShading: true
  })
  let cockpit = new THREE.Mesh(gCockpit, mCockpit)
  cockpit.castShadow = true
  cockpit.receiveShadow = true
  airplane.add(cockpit)

  // engine
  let gEngine = new THREE.BoxGeometry(20, 50, 50)
  let mEngine = new THREE.MeshPhongMaterial({
  	color: 0xffffff,
  	flatShading: true
  })
  let engine = new THREE.Mesh(gEngine, mEngine)
  engine.position.x = 40
  engine.castShadow = true
  engine.receiveShadow = true
  airplane.add(engine)

  // tail
  let gTail = new THREE.BoxGeometry(20, 20, 10)
  let mTail = new THREE.MeshPhongMaterial({
  	color: 0xffffff,
  	flatShading: true
  })
  let tail = new THREE.Mesh(gTail, mTail)
  tail.position.set(-35, 25, 0)
  tail.castShadow = true
  tail.receiveShadow = true
  airplane.add(tail)

  // top and bottom wings
  let gWing = new THREE.BoxGeometry(40, 10, 120)
  let mWing = new THREE.MeshPhongMaterial({
  	color: 0xff4c4c,
  	flatShading: true
  })
  let topWing = new THREE.Mesh(gWing, mWing)
  let botWing = new THREE.Mesh(gWing, mWing)
  topWing.castShadow = true
  topWing.receiveShadow = true
  topWing.position.set(10, 20, 0)
  botWing.castShadow = true
  botWing.receiveShadow = true
  botWing.position.set(10, -20, 0)
  airplane.add(topWing)
  airplane.add(botWing)

  // propeller
	let gPropeller = new THREE.BoxGeometry(20, 10, 10)
	let mPropeller = new THREE.MeshPhongMaterial({
		color: 0xff5555, 
		flatShading: true
	})
	let propeller = new THREE.Mesh(gPropeller, mPropeller)
	propeller.castShadow = true
	propeller.receiveShadow = true

	// blades
	let gBlade = new THREE.BoxGeometry(1, 100, 20)
	let mBlade = new THREE.MeshPhongMaterial({
		color: 0xff4c4c,
		flatShading: true
	})
	let blade = new THREE.Mesh(gBlade, mBlade)
	blade.position.set(8, 0, 0)
	blade.castShadow = true
	blade.receiveShadow = true

	propeller.add(blade)
	propeller.position.set(50, 0, 0)

	airplane.propeller = propeller
	airplane.add(airplane.propeller)

	airplane.scale.set(0.25, 0.25, 0.25)
	airplane.position.set(0, 2050, 0)

	airplane.update = function() {
		this.propeller.rotation.x += 0.3
	}
	airplane.name = 'airplane'

	return airplane
})()

const objectArray = [sea, sky, airplane]