
var rows = [
  130,
  165,
  200,
  235,
  270,
  305,
  340,
  375,
  410,
  445,
  480
]

var getRow = function getRow() {
  return rows[Math.floor(Math.random() * 10)];
};

var SpawnPool = function SpawnPool(state, time) {
  this.time = time;
  this.units = [];
  this.state = state;
};

SpawnPool.prototype.addUnitType = function addUnitType(unitType, unitGroup, maxTime, minTime) {
  var spawnObj = {
    unitType: unitType,
    unitGroup: unitGroup,
    maxTime: maxTime,
    minTime: minTime,
    nextTimer: 0
  };
  this.units.push(spawnObj);
};

SpawnPool.prototype.spawnNextUnit = function spawnNextUnit() {
  var index,
      unitsLength = this.units.length;
  for(index = 0; index < unitsLength; index++) {
    var unit = this.units[index],
        unitType = unit.unitType,
        unitGroup = unit.unitGroup,
        currentTime = this.time.now(),
        max = unit.maxTime,
        min = unit.minTime;
    if(currentTime > unit.nextTimer) {
      unit.nextTimer = this.time.now() + Math.random() * (max - min) + min;
      var row = getRow();
      unitGroup.addChild(new unitType(this.state, 800, row));
    }
  }
};
