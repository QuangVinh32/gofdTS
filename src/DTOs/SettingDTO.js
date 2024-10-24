class SettingDTO {
    constructor(id, positionX, positionY, isSoundOn, currentFrame ) {
        this.id = id;
        this.positionX = positionX;
        this.positionY = positionY;
        this.isSoundOn = isSoundOn;
        this.currentFrame = currentFrame;  
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

    getIsSoundOn() {
        return this.isSoundOn;
    }

    setIsSoundOn(isSoundOn) {
        this.isSoundOn = isSoundOn;
    }

    setCurrentFrame(currentFrame) {  
        this.currentFrame = currentFrame;
    }
    getCurrentFrame() {
        return this.currentFrame;
    }
}
