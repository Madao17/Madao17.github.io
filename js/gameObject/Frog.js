var Frog = function Frog( state, x, y ) {
	Kiwi.GameObjects.StaticImage.call(
		this, state, state.textures['frog'], x, y
	);

	this.speed = 2;
	this.state = state;
	this.oX = x;
	this.oY = y;
	this.chipotle = state.chipotle;

	this.keyboard = this.game.input.keyboard;

	this.game.input.keyboard.onKeyDownOnce.add( this.keyDownOnce, this );
	this.game.input.keyboard.onKeyUp.add( this.keyUp, this );

	this.rightArrowKey = this.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT, true);
	this.leftArrowKey = this.keyboard.addKey(Kiwi.Input.Keycodes.LEFT, true);
	this.upArrowKey = this.keyboard.addKey(Kiwi.Input.Keycodes.UP, true);
	this.downArrowKey = this.keyboard.addKey(Kiwi.Input.Keycodes.DOWN, true);

	this.physics = this.components.add( new Kiwi.Components.ArcadePhysics( this, this.box ) );
};

Kiwi.extend( Frog, Kiwi.GameObjects.StaticImage );

Frog.prototype.update = function() {
	Kiwi.GameObjects.StaticImage.prototype.update.call( this );

  if( this.rightArrowKey.isDown ){
		this.x += this.speed;
	}

	if( this.leftArrowKey.isDown ){
		this.x -= this.speed;
	}

	if( this.upArrowKey.isDown ){
		this.y -= this.speed;
	}
	if( this.downArrowKey.isDown ){
		this.y += this.speed;
	}

	this.physics.update();

	this.checkCollisions();
};

Frog.prototype.keyDownOnce = function(keyCode, key) {
	console.log("Keycode : " + keyCode + " has been pressed.");
};
Frog.prototype.keyUp = function(keyCode, key) {
	console.log("Keycode : " + keyCode + " has been released. Held for: " + (key.timeUp - key.timeDown) + " milliseconds.");
};
Frog.prototype.checkCollisions = function() {
	var turtleIndex, carIndex, racecarIndex;
	var cars = this.state.carGroup.members,
			racecars = this.state.racecarGroup.members,
			turtles = this.state.turtleGroup.members;
	var isChecked = false;

	if(!isChecked) {
		checkTurtle:
		for(turtleIndex = 0; turtleIndex < turtles.length; turtleIndex++) {
			var turtle = turtles[turtleIndex];
			if(turtle.physics.overlaps(this)) {
				this.x = this.oX;
				this.y = this.oY;
				this.state.life -= 1;
				this.state.hit.play('short', false);
				this.state.resetTime();
				isChecked = true;
				break checkTurtle;
			};
		}
	}

	if(!isChecked) {
		checkCar:
		for(carIndex = 0; carIndex < cars.length; carIndex++) {
			var car = cars[carIndex];
			if(car.physics.overlaps(this)) {
				this.x = this.oX;
				this.y = this.oY;
				this.state.life -= 1;
				this.state.hit.play('short', false);
				this.state.resetTime();
				isChecked = true;
				break checkCar;
			};
		}
	}

	if(!isChecked) {
		checkRacecar:
		for(racecarIndex = 0; racecarIndex < racecars.length; racecarIndex++) {
			var racecar = racecars[racecarIndex];
			if(racecar.physics.overlaps(this)) {
				this.x = this.oX;
				this.y = this.oY;
				this.state.life -= 1;
				this.state.hit.play('short', false);
				this.state.resetTime();
				isChecked = true;
				break checkRacecar;
			};
		}
	}

	if(this.chipotle.physics.overlaps(this)) {
		this.state.bgm.pause();
		this.game.states.switchState('winState');
	}
};
