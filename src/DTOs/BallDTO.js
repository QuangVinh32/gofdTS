class BallDTO {
    constructor(id, positionX, positionY, width, height, origin, bounce, friction, levelId) {
        this.id = id;
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.origin = origin;
        this.bounce = bounce;
        this.friction = friction;
        this.velocity = { x: 0, y: 0 };
        this.levelId = levelId;
    }

    getId() { 
        return this.id;
     }

    setId(id) {
         this.id = id;
    }

    getPositionX() {
         return this.positionX; 
    }

    setPositionX(positionX) {
         this.positionX = positionX;
    }

    getPositionY() {
         return this.positionY;
    }

    setPositionY(positionY) {
         this.positionY = positionY;
    }

    getWidth() {
         return this.width;
    }

    setWidth(width) {
         this.width = width;
    }

    getHeight() { 
        return this.height; 
    }

    setHeight(height) { 
        this.height = height;
    }
    getOrigin() { 
        return this.origin;
    }

    setOrigin(origin) { 
        this.origin = origin;
    }

    getBounce() {
         return this.bounce;
    }

    setBounce(bounce) { 
        this.bounce = bounce; 
    }

    getFriction() {
         return this.friction; 
    }
    setFriction(friction) { 
        this.friction = friction;
    }

    getVelocity() {
        return this.velocity;
    }

    setVelocity(velocity) {
         this.velocity = velocity;
    }
}