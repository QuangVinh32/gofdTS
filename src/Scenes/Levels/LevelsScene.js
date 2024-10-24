class LevelsScene extends Phaser.Scene {
    constructor() {
        super("Levels");
        this.levelNumber = 1;
        this.ballService = null;
        this.line = null;
        this.cameraFollowingBall = false;
        this.levelService = null;
    }

    init(data) {
        this.levelNumber = data.levelNumber || 1;
    }

    preload() {
        this.loadAssets();
    }

    async create() {
        this.createBackground();
        // console.log("LevelScene created with canvas size:", this.calculateCanvasSize());
        
        const canvasSize = this.calculateCanvasSize();
        this.cameras.main.setBounds(0, 0, canvasSize.width, canvasSize.height);

        this.ballService = new BallService(this, "assets/data/ball.json");
        await this.ballService.initialize(this.levelNumber); 
        this.ballHitSound = this.sound.add("hit_ball");
 
        const ballDTO = this.ballService.getBallDTOById(this.levelNumber);
        if (ballDTO) {
            ballDTO.label = 'Circle Body'; // Gán thuộc tính tùy chỉnh để nhận biết
            const ballView = this.ballService.getBallViewById(this.levelNumber);
            if (ballView) {
                this.followBall(ballView.phaserObject);

            }
        }
        
        this.destinationService = new DestinationService(this, 'assets/data/destination.json');
        await this.destinationService.initialize(this.levelNumber);

        const destinationDTO = this.destinationService.getDestinationDTOById(this.levelNumber);
        destinationDTO.label = 'Rectangle Body';
        
        
        this.obstacleService = new ObstacleService(this, "assets/data/obstacle.json");
        await this.obstacleService.initialize(this.levelNumber);
        const obstacleDTO = this.obstacleService.getObstacleDTOById(this.levelNumber);


        this.matter.world.on('collisionstart', (event) => {
            console.log("Collision detected");
            
            event.pairs.forEach(pair => {
                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;
                console.log("1",bodyA.label)
                console.log("2",bodyA.label)
                console.log("3",ballDTO.label)
        
                // Kiểm tra thuộc tính tùy chỉnh "type" của bodyA và bodyB
                const isBall = (bodyA.label === ballDTO.label || bodyB.type === ballDTO.label);
                const isDestination = (bodyA.type === destinationDTO.label || bodyB.type === destinationDTO.label);
        
                // Nếu một trong hai đối tượng là bóng và đối tượng kia là đích
                if (isBall && isDestination) {
                    console.log("Đã va chạm giữa ball và destination");
        
                    // Xử lý va chạm giữa bóng và đích
                    this.scene.launch('scoreboard');
                } else {
                    console.warn("Không có va chạm giữa ball và destination");
                }
            });
        });
        
        
        
        // this.matter.world.on('collisionstart', (event) => {
        //     console.log("Collision detected");
        //     event.pairs.forEach(pair => {
        //         // find the class type of body A
        //         if (pair.bodyA instanceof BallDTO) {
          

        //         }

        //         const bodyA = pair.bodyA;
        //         console.log(bodyA)
        //         const bodyB = pair.bodyB;
        //         console.log(bodyB)

        //         console.log(`Body A ID: ${bodyA.id}, Body B ID: ${bodyB.id}`);
 
        
        //         const isSpecificCollision = 
        //             (bodyA.id === 9 && bodyB.id === 10) ||
        //             (bodyA.id === 10 && bodyB.id === 9);
        
        //         if (isSpecificCollision) {
        //             console.log("Specific collision detected between body A (id: 9) and body B (id: 10)");
        //             this.scene.launch('scoreboard'); 
        //         }
        //     });
        // })



        this.setupFlags();
        this.setupCameraInteractions();
        // this.cameras.main.setZoom(1.5);
        
    }
 
    loadAssets() {
        for (let i = 1; i <= 18; i++) {
            this.load.image(`level${this.levelNumber}_${i}`, `assets/images/level${this.levelNumber}/bg_piece_${i.toString().padStart(2, '0')}.png`);
        }
        this.load.image("ball", "assets/images/ball.png");
        this.load.image("flag", "assets/images/flag.png");
        this.load.image("arrow", "assets/images/arrow.png");
        this.load.audio("hit_ball", "assets/audio/hit_ball.mp3");
    }

    createBackground() {
        const levels = [];
        for (let i = 1; i <= 18; i++) {
            levels.push(`level${this.levelNumber}_${i}`);
        }
        const columns = 6;
        const rows = 3;
        const imageWidth = 300;
        const imageHeight = 300;
    
        this.group = this.add.group();
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const index = row * columns + col;
                if (index < levels.length) {
                    let img = this.add.image(col * imageWidth, row * imageHeight, levels[index])
                        .setOrigin(0, 0)
                        .setDisplaySize(imageWidth, imageHeight);
                    this.group.add(img);
                }
            }
        }
    }

    calculateCanvasSize() {
        const imageWidth = 300;
        const imageHeight = 300;
        const columns = 6;
        const rows = 3;

        const canvasWidth = columns * imageWidth;
        const canvasHeight = rows * imageHeight;
        return { width: canvasWidth, height: canvasHeight };
    }

    followBall(phaserBall) {
        this.cameras.main.startFollow(phaserBall);
        this.cameraFollowingBall = true;
        this.setupBallInteraction(phaserBall);
    }


    setupFlags() {
        const flagPositions = this.getFlagPositions(this.levelNumber);
        flagPositions.forEach(pos => {
            const flag = this.add.image(pos.x, pos.y, "flag").setDisplaySize(30, 50);
            this.group.add(flag);
        });
    }

    getFlagPositions(level) {
        const flagPositions = {
            1: [{ x: 1160, y: 322 }, { x: 1073, y: 275 }],
            2: [{ x: 1262, y: 410 }, { x: 1163, y: 455 }],
            3: [{ x: 500, y: 400 }, { x: 450, y: 350 }],
            default: [{ x: 100, y: 100 }, { x: 150, y: 150 }]
        };
        return flagPositions[level] || flagPositions.default;
    }

    setupBallInteraction(phaserBall) {
        phaserBall.setInteractive();
        this.input.setDraggable(phaserBall);
    
        this.input.on('dragstart', (pointer, gameObject) => {
            this.onDragStart(pointer, gameObject);
            this.isDraggingBall = true; 
        });
    
        this.input.on('drag', (pointer, gameObject) => {
            this.onDrag(pointer, gameObject);
        });
    
        this.input.on('dragend', (pointer, gameObject) => {
            this.onDragEnd(pointer, gameObject);
            this.isDraggingBall = false; 
        });
    }
    
    onDragStart(pointer, gameObject) {
        this.isDraggingBall = true; 
        this.dragStartPos = { x: gameObject.x, y: gameObject.y };
        
        const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
        
        this.line = this.add.line(0, 0, gameObject.x, gameObject.y, worldPoint.x, worldPoint.y, 0xFF0000);
        this.line.setLineWidth(1);
    
        this.cameras.main.stopFollow();
    }
    
    onDrag(pointer, gameObject) {
        const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
        
        if (this.line) {
            this.line.setTo(gameObject.x, gameObject.y, worldPoint.x, worldPoint.y);
        }
    }
    
    onDragEnd(pointer, gameObject) {
        this.isDraggingBall = false; 
        
        const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
        
        const directionX = worldPoint.x - gameObject.x; 
        const directionY = worldPoint.y - gameObject.y;
    
        const velocityX = -directionX * 0.1;
        const velocityY = -directionY * 0.1;
    
        gameObject.setVelocity(velocityX, velocityY);
        
        // Bắt đầu theo dõi quả bóng sau khi thả
        this.cameraFollowingBall = true;
        this.cameras.main.startFollow(gameObject);
        
        if (!gameObject.launch) {
            gameObject.launch = 0;
        }
        gameObject.launch += 1;
        console.log(`Launch count: ${gameObject.launch}`);
    
        const uiScene = this.scene.get('uiScene');
        if (uiScene) {
            uiScene.updateLaunchCount(gameObject.launch);
        }
    
   
        if (this.line) {
            this.line.destroy();
            this.line = null;
        }
        this.ballHitSound.play();
    }
    
    setupCameraInteractions() {
        this.input.on('pointerdown', (pointer) => {
            if (!this.isDraggingBall) { 
                this.startX = pointer.x;
                this.startY = pointer.y;
                // console.log("Camera Interaction Start:", this.startX, this.startY);
            }
        });
    
        this.input.on('pointermove', (pointer) => {
            if (pointer.isDown) {
                if (!this.isDraggingBall) { 
                    this.handleCameraMovement(pointer);
                }
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


    update() {

    }
}
