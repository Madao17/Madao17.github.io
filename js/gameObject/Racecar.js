var Racecar = function Racecar( state, x, y ) {
	Kiwi.GameObjects.StaticImage.call(
		this, state, state.textures['racecar'], x, y
  );

	this.state = state;
	this.speed = 20;
	this.time = this.state.game.time;
	this.physics = this.components.add( new Kiwi.Components.ArcadePhysics( this, this.box ) );
};

Kiwi.extend( Racecar, Kiwi.GameObjects.StaticImage );

Racecar.prototype.update = function() {
	Kiwi.GameObjects.StaticImage.prototype.update.call( this );

	if(!(this.state.greenLightTime < this.time.now())) {
    if(this.x < -50) {
      this.destroy();
    } else {
      this.x -= this.speed;
    }
  } else {
    if(this.x > 500) {
      this.x -= this.speed;
    } else {
      this.x = 500;
    }
  }

	this.physics.update();

	var turtleIndex,
      turtles = this.state.turtleGroup.members;
  var isChecked = false;

	if(!isChecked) {
		checkTurtle:
		for(turtleIndex = 0; turtleIndex < turtles.length; turtleIndex++) {
			var turtle = turtles[turtleIndex];
			if(turtle.physics.overlaps(this)) {
				isChecked = true;
				break checkTurtle;
			};
		}
	}
};
