var Face = function Face( state, x, y, dir ) {
	Kiwi.GameObjects.StaticImage.call(
		this, state, state.textures['face'], x, y
  );

	this.speed = 3;
  this.dir = dir;
  this.chipotle = this.state.chipotle;
	this.physics = this.components.add( new Kiwi.Components.ArcadePhysics( this, this.box ) );
};

Kiwi.extend( Face, Kiwi.GameObjects.StaticImage );

Face.prototype.update = function() {
	Kiwi.GameObjects.StaticImage.prototype.update.call( this );


  if( 350 < this.x && this.x < 425 ) {
    this.y -= this.speed;
  } else {
    this.x += (this.speed) * this.dir;
  }

	this.physics.update();

  if(this.chipotle.physics.overlaps(this)) {
    this.state.coin.play();
    this.state.burritoCount++;
    this.state.burritoMessage.text = 'x'+this.state.burritoCount;
    this.destroy();
  }
};
