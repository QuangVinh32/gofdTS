class ObstacleController {
    constructor() {
        this.obstacles = [];
    }

    addObstacle(dto) {
        this.obstacles.push(dto);
    }

    getAllObstacles() {
        return this.obstacles;
    }

    getObstacleById(id) {
        return this.obstacles.find(obstacle => obstacle.id === id);
    }

    updateObstacle(id, newData) {
        const obstacle = this.getObstacleById(id);
        if (!obstacle) return;

        const setters = {
            pointA: obstacle.setPointA.bind(obstacle),
            pointB: obstacle.setPointB.bind(obstacle),
            // Thêm các setter khác nếu có
        };

        for (const [key, value] of Object.entries(newData)) {
            if (value === undefined) continue;

            if (setters[key]) {
                setters[key](value);
            } else if (key in obstacle) {
                obstacle[key] = value;
            }
        }
    }
}
