class BallService {
    constructor(scene, jsonPath) {
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.controller = new BallController();
        this.ballViews = [];

    }

    // Tải dữ liệu bóng từ JSON và thêm vào BallController
    async loadBalls() {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.balls.forEach(ballData => {
                const dto = new BallDTO(
                    ballData.id,
                    ballData.positionX,
                    ballData.positionY,
                    ballData.width,
                    ballData.height,
                    ballData.origin,
                    ballData.bounce,
                    ballData.friction,
                    ballData.levelNumber
                );
                this.controller.addBall(dto);
            });
            return this.controller.getAllBalls();
        } catch (error) {
            console.error("Error loading balls:", error);
            return [];
        }
    }

    // Khởi tạo các BallView dựa trên levelNumber
    async initialize(levelNumber) {
        const balls = await this.loadBalls();
        const specificBallDTO = balls.find(dto => dto.id === levelNumber);
        if (specificBallDTO) {
            this.createBallView(specificBallDTO);
        }
    }

    // Tạo BallView và thêm vào scene
    createBallView(dto) {
        const ballView = new BallView(this.scene, dto);
        ballView.phaserObject.label = 'ball';
        this.ballViews.push(ballView);
        return ballView;
    }

    // Cập nhật BallView khi DTO thay đổi
    updateBallView(dto) {
        const ballView = this.ballViews.find(view => view.ballData.id === dto.id);
        if (ballView) {
            ballView.updateBall();
        }
    }

    // Cập nhật dữ liệu bóng và đồng bộ với view
    updateBall(id, newData) {
        // Cập nhật DTO thông qua BallController
        this.controller.updateBall(id, newData);
        const updatedBall = this.controller.getBallById(id);
        if (updatedBall) {
            // Cập nhật view tương ứng
            this.updateBallView(updatedBall);
        }
    }

    // Lấy tất cả các BallView
    getAllBallViews() {
        return this.ballViews;
    }

    // Lấy BallView theo ID
    getBallViewById(id) {
        return this.ballViews.find(view => view.ballData.id === id);
    }

    // Lấy BallDTO theo ID
    getBallDTOById(id) {
        return this.controller.getBallById(id);
    }

    // Lấy tất cả các BallDTOs
    getAllBallDTOs() {
        return this.controller.getAllBalls();
    }
}

