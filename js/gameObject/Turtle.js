var Turtle = function Turtle( state, x, y ) {
	Kiwi.GameObjects.StaticImage.call(
		this, state, state.textures['turtle'], x, y
  );

	this.state = state;
	this.time = this.state.game.time;
	this.speed = 30;
	this.physics = this.components.add( new Kiwi.Components.ArcadePhysics( this, this.box ) );
};

Kiwi.extend( Turtle, Kiwi.GameObjects.StaticImage );

Turtle.prototype.update = function() {
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
};
