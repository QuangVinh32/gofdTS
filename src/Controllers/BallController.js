class BallController {
    constructor() {
        this.balls = [];
    }

    addBall(dto) {
        this.balls.push(dto);
    }

    getAllBalls() {
        return this.balls;
    }

    getBallById(id) {
        return this.balls.find(ball => ball.id === id);
    }

    updateBall(id, newData) {
        const ball = this.getBallById(id);
        if (ball != null) {
            ball.setPositionX(newData.positionX);
            ball.setPositionY(newData.positionY);
            ball.setVelocity(newData.velocity);
        }
    }
}

