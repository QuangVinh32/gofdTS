class EditorPolygon extends Phaser.Scene {
    constructor() {
        super("editPolygon");
        this.points = [];
        this.rectsOnEdges = [];
        this.texts = [];
        this.dragStartPos = null;
        this.line = null;
        this.isPaused = false;
    }

    preload() {
        this.load.image("ball", "assets/images/ball.png");
    }

    create() {
        // Đặt giới hạn cho thế giới vật lý với kích thước 1800x900
        this.matter.world.setBounds(0, 0, 1800, 900);
        this.matter.world.disableGravity(); 

        let textHole = this.add.text(560, 460, "HOLE: 1", { font: "22px Arial", fill: "Yellow" });

        // Gọi sự kiện nhấp chuột để thêm điểm trên toàn bản đồ
        this.input.on('pointerdown', this.addPoint, this);
        
        this.graphics = this.add.graphics();
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Lắng nghe phím W

        this.drawPolygon();

        const ball = this.matter.add.image(509, 290, "ball").setDisplaySize(10, 10);
        ball.setCircle(5);
        ball.setBounce(1);
        ball.setFriction(0.001);

        ball.setInteractive();
        this.input.setDraggable(ball);

        // Cài đặt drag cho đối tượng
        this.input.on('dragstart', (pointer, gameObject) => {
            this.dragStartPos = { x: gameObject.x, y: gameObject.y };
            this.line = this.add.line(0, 0, gameObject.x, gameObject.y, pointer.x, pointer.y, 0xff00ff);
            this.line.setLineWidth(2);
        });

        this.input.on('drag', (pointer, gameObject) => {
            this.line.setTo(gameObject.x, gameObject.y, pointer.x, pointer.y);
        });

        this.input.on('dragend', (pointer, gameObject) => {
            const directionX = pointer.x - this.dragStartPos.x;
            const directionY = pointer.y - this.dragStartPos.y;

            const velocityX = -directionX * 0.1;
            const velocityY = -directionY * 0.1;

            gameObject.setVelocity(velocityX, velocityY);
            this.line.destroy();
            this.line = null;
        });

        // Đặt giới hạn cho camera theo kích thước map
        this.cameras.main.setBounds(0, 0, 1800, 900);
        this.setupCameraInteractions();

        this.cameras.main.setZoom(1);
    }

    update() {
        if (this.keyQ.isDown) {
            this.isPaused = !this.isPaused;
            console.log("Đã chuyển đổi tạm dừng:", this.isPaused);
        }

        // Kiểm tra xem phím W có được nhấn không
        if (Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.savePointsToFile(); // Gọi hàm lưu tọa độ
        }
    }

    // Phương thức thêm điểm trên toàn bộ bản đồ
    // addPoint(pointer) {
    //     if (this.isPaused) return;
        
    //     // Lấy tọa độ của pointer trong thế giới vật lý, thay vì trên màn hình
    //     const worldX = pointer.worldX;
    //     const worldY = pointer.worldY;
        
    //     // Tạo điểm mới sử dụng tọa độ thế giới
    //     const newPoint = new Phaser.Math.Vector2(worldX, worldY);
    //     this.points.push(newPoint);

    //     console.log("Điểm mới được thêm tại:", worldX, worldY); // Debug xem tọa độ chính xác

    //     // Vẽ lại polygon sau khi thêm điểm
    //     this.drawPolygon();
    // }

    addPoint(pointer) {
        if (this.isPaused) return;
    
        // Log giá trị scroll của camera
        console.log("Camera Scroll:", this.cameras.main.scrollX, this.cameras.main.scrollY);
        
        // Tính toán tọa độ của pointer trong không gian của bản đồ
        const worldX = pointer.x + this.cameras.main.scrollX;
        const worldY = pointer.y + this.cameras.main.scrollY;
    
        // Tạo điểm mới sử dụng tọa độ thế giới
        const newPoint = new Phaser.Math.Vector2(worldX, worldY);
        this.points.push(newPoint);
    
        console.log("Điểm mới được thêm tại:", newPoint.x, newPoint.y); // Debug xem tọa độ chính xác
    
        // Vẽ lại polygon sau khi thêm điểm
        this.drawPolygon();
    }
    
    

    drawPolygon() {
        this.graphics.clear();
        this.rectsOnEdges.forEach(rect => rect.destroy());
        this.rectsOnEdges = [];
        this.texts.forEach(text => text.destroy());
        this.texts = [];

        if (this.points.length > 1) {
            this.graphics.lineStyle(2, 0x002bff, 1);
            this.graphics.beginPath();
            this.graphics.moveTo(this.points[0].x, this.points[0].y);

            for (let i = 1; i < this.points.length; i++) {
                this.graphics.lineTo(this.points[i].x, this.points[i].y);
            }

            this.graphics.lineTo(this.points[0].x, this.points[0].y);
            this.graphics.strokePath();
            this.drawRectanglesOnEdges();
            this.displayCoordinates();
        }
    }

    drawRectanglesOnEdges() {
        for (let i = 0; i < this.points.length; i++) {
            const pointA = this.points[i];
            const pointB = this.points[(i + 1) % this.points.length];

            const length = Phaser.Math.Distance.Between(pointA.x, pointA.y, pointB.x, pointB.y);
            const angle = Phaser.Math.Angle.Between(pointA.x, pointA.y, pointB.x, pointB.y);
            const height = 25;

            const normalX = Math.cos(angle + Math.PI / 2);
            const normalY = Math.sin(angle + Math.PI / 2);
            const offsetX = normalX * height / 2;
            const offsetY = normalY * height / 2;

            const midPointX = (pointA.x + pointB.x) / 2;
            const midPointY = (pointA.y + pointB.y) / 2;

            const rect = this.add.rectangle(midPointX, midPointY, length, height, 0xff5500, 0.5);
            rect.setPosition(midPointX + offsetX, midPointY + offsetY);

            this.matter.add.gameObject(rect, {
                shape: { type: 'rectangle', width: length, height: height },
                angle: angle,
                isStatic: true,
                restitution: 0
            });
            this.rectsOnEdges.push(rect);
        }
    }

    displayCoordinates() {
        this.points.forEach(point => {
            const text = this.add.text(point.x - 15, point.y - 15, `(${Math.round(point.x)}, ${Math.round(point.y)})`, {
                fontSize: '12px',
                // fill: '#00ff00'
            });
            this.texts.push(text);
        });
    }

    savePointsToFile() {    
        // Chuyển đổi danh sách điểm thành chuỗi JSON để lưu vào file
        const pointsData = this.points.map(point => `(${Math.round(point.x)}, ${Math.round(point.y)})`).join("\n");

        // Tạo một Blob chứa chuỗi tọa độ
        const blob = new Blob([pointsData], { type: 'text/plain' });

        // Tạo đường dẫn để tải xuống file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'points.txt'; // Tên file khi tải xuống
        document.body.appendChild(a);
        a.click(); // Bắt đầu tải file
        document.body.removeChild(a); // Xóa thẻ a sau khi tải xong
    }

    setupCameraInteractions() {
        this.input.on('pointerdown', (pointer) => {
            this.startX = pointer.x;
            this.startY = pointer.y;
        });

        this.input.on('pointermove', (pointer) => {
            if (pointer.isDown) {
                this.handleCameraMovement(pointer);
            }
        });
    }

    handleCameraMovement(pointer) {
        const dx = pointer.x - this.startX;
        const dy = pointer.y - this.startY;
        const camera = this.cameras.main;
        camera.scrollX -= dx / camera.zoom;
        camera.scrollY -= dy / camera.zoom;

        this.startX = pointer.x;
        this.startY = pointer.y;

        if (this.cameraFollowingBall) {
            this.cameras.main.stopFollow();
            this.cameraFollowingBall = false;
        }
    }
}
