class ObstacleView extends Phaser.GameObjects.Container {
    constructor(scene, dto) {
        super(scene);
        this.scene = scene;
        this.obstacleData = dto;
        this.createView();
    }

    createView() {
        const { pointA, pointB, height, color, alpha, isStatic, restitution } = this.obstacleData;

        // Tính chiều dài là khoảng cách giữa hai điểm
        const length = Phaser.Math.Distance.Between(pointA.x, pointA.y, pointB.x, pointB.y);

        // Tính góc giữa hai điểm
        const angle = Phaser.Math.Angle.Between(pointA.x, pointA.y, pointB.x, pointB.y);

        const normalX = Math.cos(angle + Math.PI / 2);
        const normalY = Math.sin(angle + Math.PI / 2);

        const offsetX = normalX * height / 2; // Tính offset theo chiều ngang
        const offsetY = normalY * height / 2; // Tính offset theo chiều dọc

        const midPointX = (pointA.x + pointB.x) / 2;
        const midPointY = (pointA.y + pointB.y) / 2;

        // Tạo obstacle (hình chữ nhật)
        this.obstacle = this.scene.add.rectangle(midPointX + offsetX, midPointY + offsetY, length, height, color, alpha);

        // Đặt góc cho obstacle
        this.obstacle.setRotation(angle);
        this.obstacle.setOrigin(0, 0.5); // Đặt gốc tại cạnh trái giữa của hình chữ nhật

        // Thêm obstacle vào thế giới vật lý
        this.scene.matter.add.gameObject(this.obstacle, {
            shape: { type: 'rectangle', width: length, height: height },
            angle: angle,
            isStatic: isStatic,
            restitution: restitution,
            // density: 500000 // Tăng khối lượng

        });

    }

    updateView() {
        const { pointA, pointB, height, color, alpha, isStatic, restitution } = this.obstacleData;

        // Cập nhật chiều dài và góc
        const length = Phaser.Math.Distance.Between(pointA.x, pointA.y, pointB.x, pointB.y);
        const angle = Phaser.Math.Angle.Between(pointA.x, pointA.y, pointB.x, pointB.y);

        const normalX = Math.cos(angle + Math.PI / 2);
        const normalY = Math.sin(angle + Math.PI / 2);

        const offsetX = normalX * height / 2; // Tính offset theo chiều ngang
        const offsetY = normalY * height / 2; // Tính offset theo chiều dọc

        // Tính toán trung điểm
        const midPointX = (pointA.x + pointB.x) / 2;
        const midPointY = (pointA.y + pointB.y) / 2;

        // Cập nhật vị trí
        this.obstacle.setPosition(midPointX + offsetX, midPointY + offsetY);

        // Cập nhật kích thước
        this.obstacle.width = length;
        this.obstacle.height = height;

        // Cập nhật góc
        this.obstacle.setRotation(angle);
        this.obstacle.setOrigin(0, 0.5);

        // Cập nhật màu sắc và alpha
        this.obstacle.fillColor = color;
        this.obstacle.setAlpha(alpha);

        // Cập nhật các thuộc tính vật lý
        this.obstacle.body.isStatic = isStatic;
        this.obstacle.body.restitution = restitution;
    }
}
