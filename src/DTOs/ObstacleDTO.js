class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }s
}

class ObstacleDTO {
    constructor(id, pointA, pointB, height = 20, color = 0xff5500, alpha = 0.5, isStatic = true, restitution = 0, shape = "rectangle", levelNumber = 1) {
        this.id = id;
        this.pointA = pointA; // { x: number, y: number }
        this.pointB = pointB; // { x: number, y: number }
        this.height = height;
        this.color = color;
        this.alpha = alpha;
        this.isStatic = isStatic;
        this.restitution = restitution;
        this.shape = shape;
        this.levelNumber = levelNumber;
    }

    setPointA(pointA) {
        this.pointA = pointA;
    }

    setPointB(pointB) {
        this.pointB = pointB;
    }
}

