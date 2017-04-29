

var game = new Kiwi.Game(null, 'Froggger', null, { renderer: Kiwi.RENDERER_CANVAS });
var frogState = new Kiwi.State('frogState');
var winState = new Kiwi.State('winState');

var renderCrosswalk = function renderCrosswalk(state) {
  for(var i = 0; i < 7; i++) {
    state.addChild(new Kiwi.GameObjects.StaticImage(state, state.textures['wRect'], 350, 150 + 50 * i));
  }
};

frogState.preload = function(){
    Kiwi.State.prototype.preload.call(this);
  	this.addImage('car', './assets/img/car.png', true);
    this.addImage('frog', './assets/img/frog.png', true);
    this.addImage('log', './assets/img/log.png', true);
    this.addImage('racecar', './assets/img/racecar.png', true);
    this.addImage('turtle', './assets/img/turtle.png', true);
    this.addImage('wRect', './assets/img/whiteRect.png', true);
    this.addImage('lwRect', './assets/img/largeWhiteRect.png', true);
    this.addImage('vlwRect', './assets/img/verticalLargeWhiteRect.png', true);
    this.addImage('face', './assets/img/face.png', true);
    this.addImage('chipotle', './assets/img/chipotle.png', true);
    this.addImage('burrito', './assets/img/burrito.png', true);

    this.addAudio('bgm', './assets/audio/bgm.mp3');
    this.addAudio('hit', './assets/audio/hit.mp3');
    this.addAudio('coin', './assets/audio/coin1.wav');
};

frogState.create = function(){
    Kiwi.State.prototype.create.call(this);

    this.carGroup = new Kiwi.Group(this);
    this.racecarGroup = new Kiwi.Group(this);
    this.turtleGroup = new Kiwi.Group(this);
    this.faceGroup = new Kiwi.Group(this);

    this.isGreenLight = false;
    this.greenLightTime = this.game.time.now() + 30000;

    this.game.stage.rgbColor = {
      r: 0,
      g: 0,
      b: 0
    };

    this.life = 3;
    this.burritoCount = 0;
    this.burritoAdded = false;

    this.spawnPool = new SpawnPool(this, this.game.time);
    this.spawnFace = new FaceSpawn(this, this.game.time, this.faceGroup);

    this.spawnPool.addUnitType(Car, this.carGroup, 100, 300);
    this.spawnPool.addUnitType(Racecar, this.racecarGroup, 200, 300);
    this.spawnPool.addUnitType(Turtle, this.turtleGroup, 100, 800);

    this.chipotle = new Kiwi.GameObjects.StaticImage(this, this.textures['chipotle'], 250, 15);
    this.chipotle.physics =
      this.chipotle.components.add( new Kiwi.Components.ArcadePhysics( this.chipotle, this.chipotle.box ) );
    this.frog = new Frog(this, 385, 550);
    this.lifeFrog = new Kiwi.GameObjects.StaticImage(this, this.textures['frog'], 20, 20);
    this.lifeFrog.rotation = Kiwi.Utils.GameMath.degreesToRadians(180);
    this.lifeMessage = new Kiwi.GameObjects.Textfield(
      this, 'x' + this.life, 55, 20, '#FFFFFF', 24
    );
    this.youSuck = false;
    this.youSuckMessage = new Kiwi.GameObjects.TextField (
      this, 'YOU SUCK!', 20, 60, '#FFFFFF', 24
    );
    this.burrito = new Kiwi.GameObjects.StaticImage(this, this.textures['burrito'], 20, 50);
    this.burritoMessage = new Kiwi.GameObjects.TextField (
      this, '', 114, 60, '#FFFFFF', 24
    );

    this.bgm = new Kiwi.Sound.Audio(this.game, 'bgm', 1, true);
    this.hit = new Kiwi.Sound.Audio(this.game, 'hit', 1, false);
    this.coin = new Kiwi.Sound.Audio(this.game, 'coin', 1, false);
    this.hit.addMarker('short', 0.00, 0.2, false);

    renderCrosswalk(this);
    this.addChild(new Kiwi.GameObjects.StaticImage(this, this.textures['lwRect'], 0, 100));
    this.addChild(new Kiwi.GameObjects.StaticImage(this, this.textures['lwRect'], 0, 500));
    this.addChild(new Kiwi.GameObjects.StaticImage(this, this.textures['vlwRect'], 475, 120));
    this.addChild(this.carGroup);
    this.addChild(this.racecarGroup);
    this.addChild(this.turtleGroup);
    this.addChild(this.faceGroup);
    this.addChild(this.frog);
    this.addChild(this.lifeFrog);
    this.addChild(this.lifeMessage);
    this.addChild(this.burritoMessage);

    this.bgm.play();
};

frogState.update = function() {
   Kiwi.State.prototype.update.call(this);
   if(this.life < -1 && !this.youSuck) {
     this.youSuck = true;
     this.addChild(this.youSuckMessage);
   };
   this.lifeMessage.text = 'x' + this.life;
   if(this.game.time.now() < this.greenLightTime) {
      this.spawnPool.spawnNextUnit();
   } else {
     if(!this.isGreenLight) {
       this.isGreenLight = true;
       this.addChild(this.chipotle);
       this.removeChild(this.youSuckMessage);
     }
     this.spawnFace.update();
     if(!this.burritoAdded) {
       this.addChild(this.burrito);
     };
   }
 };

 frogState.resetTime = function() {
   this.greenLightTime = this.game.time.now() + 30000;
 };

winState.preload = function(){
   Kiwi.State.prototype.preload.call( this );
   this.addAudio('victory', './assets/audio/victory.mp3');
};
winState.create = function(){
  Kiwi.State.prototype.create.call( this);
  var winMessage;
  frogState.isGreenLight? winMessage = 'GOT CHIPOTLE!': winMessage = 'WIN!';
  this.textField = new Kiwi.GameObjects.Textfield(
    this, winMessage, this.game.stage.width / 2, this.game.stage.height / 2 - 72, '#FFFFFF', 72);
	this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
  this.victory = new Kiwi.Sound.Audio(this.game, 'victory', 1, false);
  this.victory.play();
  this.burritoCount = new Kiwi.GameObjects.Textfield(
    this, frogState.burritoCount + '!', this.game.stage.width / 2, this.game.stage.height / 2 + 40 , '#FFFFFF', 36
  );
  this.burritoCount.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

  this.burrito = new Kiwi.GameObjects.StaticImage(
    this, frogState.textures['burrito'], this.game.stage.width / 2 - 44, this.game.stage.height / 2
  );
  if(frogState.isGreenLight) {
    this.addChild(this.burritoCount);
    this.addChild(this.burrito);
  }
  this.addChild(this.textField);
  if(frogState.burritoCount == 100) {
    this.addChild(new Kiwi.GameObjects.StaticImage(
      this, frogState.textures['face'], this.game.stage.width / 2 - 17, this.game.stage.height / 2 + 76
    ));
  };
};
winState.update = function() {
  console.log(frogState.burritoCount);
  Kiwi.State.prototype.update.call(this);
};

game.states.addState(winState, true);
game.states.addState(frogState, true);
