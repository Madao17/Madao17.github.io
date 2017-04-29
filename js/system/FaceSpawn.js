
var FaceSpawn = function FaceSpawn(state, time, group) {
  this.time = time;
  this.state = state;
  this.group = group;
  this.faceCount = 0;
  this.nextSpawnTime = 0;
  this.delay = 100;
  this.toggle = false;
};

FaceSpawn.prototype.update = function update() {
  if(this.faceCount < 100 && this.nextSpawnTime < this.time.now()) {
    this.spawnFace();
    this.nextSpawnTime = this.time.now() + this.delay;
    this.faceCount++;
  }
};

FaceSpawn.prototype.spawnFace = function spawnFace() {
  var rightPos = 800,
      leftPos = -34;

  if(this.faceCount < 100 && this.nextSpawnTime < this.time.now()) {
    if(this.toggle) {
      this.group.addChild(new Face(this.state, leftPos + 34, 535, 1));
      this.toggle = !this.toggle;
    } else {
      this.group.addChild(new Face(this.state, rightPos - 34, 535, -1));
      this.toggle = !this.toggle;
    }
  }
}
