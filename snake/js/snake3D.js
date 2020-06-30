// import {OrbitControls} from './OrbitControls'
const init3DGame = () => {
  const scene = new THREE.Scene();
  const ambientLight = new THREE.AmbientLight();
  //scene.add(ambientLight);
  const pointLight = new THREE.PointLight();
  //const helvetica_font = new THREE.FontLoader().load('fonts/helvetiker_regular.typeface.json');
  pointLight.position.set(window.innerWidth/2,window.innerHeight/2,500);
  scene.add(pointLight);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  //const controls = new THREE.OrbitControls( camera, renderer.domElement );
  const controls = { update:()=>{} };
  controls.center = THREE.Vector3(window.innerWidth/2, window.innerHeight/2, 475);
  // camera.position.set(window.innerWidth/2, window.innerHeight/2, 50)

  const game = new SnakeGame();
  window.game=game;
  game.setConfig('width', window.innerWidth);
  game.setConfig('height', window.innerHeight);
  game.setConfig('yDownwards', false)

  window.onkeydown = (e) => game.keyHandler(e);
  game.setHandler('gameLoop', (g) => console.log('loop to', g.state.snakePos[0]));
  game.setHandler('gameOver', () => console.log('over'))
  game.setHandler('keyDown', (_, e) => {
    console.log('key', e.key);
    switch (e.key) {
      case '0':
        state.cameraPos = [window.innerWidth / 2, window.innerHeight / 2, 475];
        break;
      case '1':
        state.cameraPos[0] -= 5;
        break;
      case '3':
        state.cameraPos[0] += 5;
        break;
      case '4':
        state.cameraPos[1] -= 5;
        break;
      case '6':
        state.cameraPos[1] += 5;
        break;
      case '7':
        state.cameraPos[2] -= 5;
        break;
      case '9':
        state.cameraPos[2] += 5;
        break;
      case '8':
        camera.far += 2;
        break;
      case '2':
        camera.far -= 2;
        break;
    }
    camera.position.set(...state.cameraPos)
    // console.log(camera.position)
    controls.update();
    renderer.render(scene, camera)
  })

  const state = {
    appleS: null,
    snakeS: [],
    cameraPos: [window.innerWidth / 2, window.innerHeight / 2, 475],
    geometries:{sphere:{},plane:{}},
    materials:{}
  }
  const getMaterial=(...props)=>{
    const param=JSON.stringify(props);
    if(!state.materials[param])state.materials[param]=new THREE.MeshStandardMaterial(...JSON.parse(param));
    return state.materials[param];
  }
  const addSphere = (x, y, d, c) => {
    if(!state.geometries.sphere[d]) state.geometries.sphere[d]=new THREE.SphereGeometry(d / 2,50,50);
    const _g = state.geometries.sphere[d];
    //const _g = new THREE.BoxGeometry(d,d,d);
    //const _g = new THREE.ConeGeometry(d/2,d);
    //const _g = new THREE.CubeGeometry(d,d,d);
    //const _g = new THREE.TextGeometry('.');
    //const _g = new THREE.CylinderGeometry(d/2,d/2,d);
    const _m = getMaterial({ color: c, roughness:.2 });
    const _s = new THREE.Mesh(_g, _m);
    _s.position.z = d / 2;
    _s.position.x = x;
    _s.position.y = y;
    scene.add(_s);
    console.log(camera.position);
    camera.position.set(...state.cameraPos);
    return _s;
  }
  const addBox = (x, y, d, c) => {
    const param = JSON.stringify([window.innerWidth+game.config.dotSize, window.innerHeight+game.config.dotSize]);
    if(!state.geometries.plane[param]) state.geometries.plane[param]=new THREE.PlaneBufferGeometry(...JSON.parse(param));
    const _g = state.geometries.plane[param];
    //const _g = new THREE.BoxGeometry(window.innerWidth, window.innerHeight, 5);
    //const _g = new THREE.PlaneBufferGeometry(window.innerWidth+game.config.dotSize, window.innerHeight+game.config.dotSize);
    const _m = getMaterial({ color: c, });
    const _s = new THREE.Mesh(_g, _m);
    _s.position.z = 0;//-5 / 2;
    _s.position.x = (window.innerWidth+game.config.dotSize) / 2;
    _s.position.y = (window.innerHeight+game.config.dotSize) / 2;
    scene.add(_s);
    camera.position.set(...state.cameraPos);
    return _s;
  }
  const ground = addBox(0, 0, 0, '#00ffff')
  const draw = () => {
    requestAnimationFrame(draw);
    
    if(game.state.gameOver) {console.log('over');return;}
    
    // draw apple
    if (!state.apple) state.apple = addSphere(game.state.applePos.x, game.state.applePos.y, game.config.dotSize, '#ff0000');
    else {
      state.apple.position.x = game.state.applePos.x+game.config.dotSize/2;
      state.apple.position.y = game.state.applePos.y+game.config.dotSize/2;
    }

    for (let i = state.snakeS.length; i < game.state.snakePos.length; ++i) {
      if (i === 0) state.snakeS.push(addSphere(game.state.snakePos[i].x, game.state.snakePos[i].y, game.config.dotSize, '#00ff00'));
      else state.snakeS.push(addSphere(game.state.snakePos[i].x, game.state.snakePos[i].y, game.config.dotSize, '#0000ff'));
    }
    while (state.snakeS.length > game.state.snakePos.length) scene.remove(snakeS.pop());

    game.state.snakePos.forEach((xy, i) => {
      state.snakeS[i].position.x = xy.x+game.config.dotSize/2;
      state.snakeS[i].position.y = xy.y+game.config.dotSize/2;
    });
    controls.update();
    renderer.render(scene, camera);
  }
  draw();
  game.runGame();
}
init3DGame();