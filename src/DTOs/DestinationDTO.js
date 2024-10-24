class DestinationDTO {
    constructor(id, positionX, positionY, radius, origin, shape, levelNumber) {
        this.id = id;
        this.positionX = positionX;
        this.positionY = positionY;
        this.radius = radius;
        this.origin = origin;
        this.shape = shape;
        this.levelNumber = levelNumber;
    }

    // Getters
    getId() {
        return this.id;
    }

    getPositionX() {
        return this.positionX;
    }

    getPositionY() {
        return this.positionY;
    }

    getRadius() {
        return this.radius;
    }

    getOrigin() {
        return this.origin;
    }

    getShape() {
        return this.shape;
    }

    getLevelNumber() {
        return this.levelNumber;
    }

    // Setters
    setId(id) {
        this.id = id;
    }

    setPositionX(positionX) {
        this.positionX = positionX;
    }

    setPositionY(positionY) {
        this.positionY = positionY;
    }

    setRadius(radius) {
        this.radius = radius;
    }

    setOrigin(origin) {
        this.origin = origin;
    }

    setShape(shape) {
        this.shape = shape;
    }

    setLevelNumber(levelNumber) {
        this.levelNumber = levelNumber;
    }
}
