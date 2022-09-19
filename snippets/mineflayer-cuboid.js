/*
var v = require('vec3');
let cuboid = new Cuboid(v(-84, 63, -94), v(-98, 63, -104));

let positions = cuboid.getBlockPositions();
console.log(`There are ${positions.length} positions in this cuboid..`)
*/

class Cuboid {

    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
        this.xMin = Math.min(point1.x, point2.x);
        this.xMax = Math.max(point1.x, point2.x);
        this.yMin = Math.min(point1.y, point2.y);
        this.yMax = Math.max(point1.y, point2.y);
        this.zMin = Math.min(point1.z, point2.z);
        this.zMax = Math.max(point1.z, point2.z);
        //this.world = bot.world;
        this.xMinCentered = this.xMin + 0.5;
        this.xMaxCentered = this.xMax + 0.5;
        this.yMinCentered = this.yMin + 0.5;
        this.yMaxCentered = this.yMax + 0.5;
        this.zMinCentered = this.zMin + 0.5;
        this.zMaxCentered = this.zMax + 0.5;
    }
  
    getBlockPositions() {
        let blocks = new Array();
        for(let y = this.yMin; y <= this.yMax; ++y) {
            for(let x = this.xMin; x <= this.xMax; ++x) {
                for(let z = this.zMin; z <= this.zMax; ++z) {
                    blocks.push(v(x, y, z));
                }
            }
        }
        return blocks;
    }

    // Returns vec3
    getCenter() {
        return v((this.xMax - this.xMin) / 2 + this.xMin, (this.yMax - this.yMin) / 2 + this.yMin, (this.zMax - this.zMin) / 2 + this.zMin);
    }

    // Returns double
    getDistance() {
        return this.point1.distanceTo(point2)
    }

    // TODO: Use mineflayer distanceTo
    // Returns double
    getDistanceSquared() {
        return this.getPoint1().distanceSquared(this.getPoint2());
    }

    // Returns int
    getHeight() {
        return this.yMax - this.yMin + 1;
    }

    // Returns vec3
    getPoint1() {
      return point1;
    }

    // Returns vec3
    getPoint2() {
        return point2;
    }

    // Returns vec3
    getRandomLocation() {
        let rand = new Random();
        let x = rand.nextInt(Math.abs(this.xMax - this.xMin) + 1) + this.xMin;
        let y = rand.nextInt(Math.abs(this.yMax - this.yMin) + 1) + this.yMin;
        let z = rand.nextInt(Math.abs(this.zMax - this.zMin) + 1) + this.zMin;
        return v(x, y, z);
    }

    // Returns int
    getTotalBlockSize() {
        return this.getHeight() * this.getXWidth() * this.getZWidth();
    }

    // Returns int
    getXWidth() {
        return this.xMax - this.xMin + 1;
    }

    // Returns int
    getZWidth() {
        return this.zMax - this.zMin + 1;
    }

    // Returns boolean
    posIsIn(loc) {
        return loc.x >= this.xMin && loc.x <= this.xMax && loc.y >= this.yMin && loc.y <= this.yMax && loc
                .z >= this.zMin && loc.z <= this.zMax;
    }

    // Returns boolean
    entityIsIn(entity) {
      if(!entity.position) return false;
      return this.posIsIn(entity.position);
    }

    // Returns boolean
    isInWithMarge(loc, marge) {
        return loc.x >= this.xMinCentered - marge && loc.x <= this.xMaxCentered + marge && loc.y >= this.yMinCentered - marge && loc
                .y <= this.yMaxCentered + marge && loc.z >= this.zMinCentered - marge && loc.z <= this.zMaxCentered + marge;
    }
}
