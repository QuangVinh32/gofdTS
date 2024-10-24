class BallView extends Phaser.GameObjects.Container {
    constructor(scene, ballData) {
        super(scene);
        this.scene = scene;
        this.ballData = ballData;
        this.phaserObject = this.createBall();
        this.scene.add.existing(this);
    }

    createBall() {
        const ball = this.scene.matter.add.image(this.ballData.positionX, this.ballData.positionY, "ball")
            .setDisplaySize(this.ballData.width, this.ballData.height)
            .setCircle(this.ballData.width / 2)
            .setBounce(this.ballData.bounce)
            .setFriction(this.ballData.friction)
            .setOrigin(this.ballData.origin.x, this.ballData.origin.y)
            .setVelocity(this.ballData.velocity.x, this.ballData.velocity.y);
        this.add(ball);
        return ball;
    }

    updateBall() {
        this.phaserObject.setPosition(this.ballData.positionX, this.ballData.positionY);
        this.phaserObject.setVelocity(this.ballData.velocity.x, this.ballData.velocity.y);
    }
}

