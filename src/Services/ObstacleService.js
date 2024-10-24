class ObstacleService {
    constructor(scene, jsonPath) {
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.controller = new ObstacleController(); 
        this.obstacleViews = [];
    }

    // Tải dữ liệu obstacles từ JSON và thêm vào ObstacleController
    async loadObstacles() {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (!data.obstacles) {
                throw new Error("JSON does not contain 'obstacles' key.");
            }

            data.obstacles.forEach(obstacleData => {
                const dto = new ObstacleDTO(
                    obstacleData.id,
                    obstacleData.pointA,
                    obstacleData.pointB,
                    obstacleData.height,
                    obstacleData.color,
                    obstacleData.alpha,
                    obstacleData.isStatic,
                    obstacleData.restitution,
                    obstacleData.shape,
                    obstacleData.levelNumber
                );
                this.controller.addObstacle(dto);
            });
            return this.controller.getAllObstacles();
        } catch (error) {
            console.error("Error loading Obstacles:", error);
            return [];
        }
    }

    // Khởi tạo tất cả các ObstacleView dựa trên levelNumber
    async initialize(levelNumber) {
        const allObstacles = await this.loadObstacles();
        const specificObstacles = allObstacles.filter(dto => dto.levelNumber === levelNumber);
        specificObstacles.forEach(dto => this.createObstacleView(dto));
    }

    // Tạo ObstacleView và thêm vào scene
    createObstacleView(dto) {
        const obstacleView = new ObstacleView(this.scene, dto);
        this.obstacleViews.push(obstacleView);
        return obstacleView;
    }

    // Thêm obstacle mới vào scene từ DTO
    addNewObstacle(dto) {
        this.controller.addObstacle(dto);
        return this.createObstacleView(dto);
    }

    // Lấy tất cả ObstacleView
    getAllObstacleViews() {
        return this.obstacleViews;
    }

    // Lấy ObstacleView theo ID
    getObstacleViewById(id) {
        return this.obstacleViews.find(obstacle => obstacle.id === id);
    }

    // Lấy ObstacleDTO theo ID
    getObstacleDTOById(id) {
        return this.controller.getObstacleById(id);
    }

    // Lấy tất cả các ObstacleDTOs
    getAllObstacles() {
        return this.controller.getAllObstacles();
    }

    // Cập nhật ObstacleView khi DTO thay đổi
    updateObstacleView(dto) {
        const obstacleView = this.getObstacleViewById(dto.id);
        if (obstacleView) {
            obstacleView.updateView(dto);
        }
    }

    // Cập nhật dữ liệu obstacle và đồng bộ với view
    updateObstacle(id, newData) {
        // Cập nhật DTO thông qua ObstacleController
        this.controller.updateObstacle(id, newData);
        const updatedObstacle = this.controller.getObstacleById(id);
        if (updatedObstacle) {
            // Cập nhật view tương ứng
            this.updateObstacleView(updatedObstacle);
        }
    }
}
