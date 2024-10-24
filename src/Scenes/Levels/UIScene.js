class UIScene extends Phaser.Scene {
  constructor() {
    super("uiScene");
    this.settingService = null; // Thêm thuộc tính để lưu SettingService

  }

  preload() {
    this.load.image("but_exit", "assets/images/but_exit.png");
    this.load.image("but_restart_small", "assets/images/but_restart_small.png");
    this.load.image("but_centre_view", "assets/images/but_centre_view.png");
  }

  async create() {

    const settingId = 3;
    this.settingService = new SettingService(this, "assets/data/setting.json");
    await this.settingService.initialize(settingId);

  

    let launchCount = 0; 
    let textPar = this.add.text(15, 20, "PAR: 3", { font: "22px Arial", fill: "Yellow" });
    this.launchText = this.add.text(250, 15, 'Launch: 0', { fontSize: '30px', fill: 'Yellow' });
    let textHole = this.add.text(560, 460, "HOLE: 1", { font: "22px Arial", fill: "Yellow" });
    this.textContainer = this.add.container(0, 0, [textPar, this.launchText, textHole]);      
  
    let isTweening = false;
  
    // Nút thoát
    let exitButton = this.add.image(620, 40, 'but_exit')
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDisplaySize(55, 55);
    exitButton.on('pointerdown', () => {
      if (!isTweening) {
        isTweening = true;
        this.tweens.add({
          targets: exitButton,
          scaleX: 0.5,
          scaleY: 0.5,
          ease: 'Power1',
          duration: 150,
          yoyo: true,
          onComplete: () => {
            isTweening = false;
            this.scene.launch("choice");
          }
        });
      }
    });
  
    // Nút khởi động lại
    let restartSmallButton = this.add.image(560, 40, 'but_restart_small')
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDisplaySize(55, 55);
    restartSmallButton.on('pointerdown', () => {
      if (!isTweening) {
        isTweening = true;
        this.tweens.add({
          targets: restartSmallButton,
          scaleX: 0.5,
          scaleY: 0.5,
          ease: 'Power1',
          duration: 150,
          yoyo: true,
          onComplete: () => {
            isTweening = false;
            this.scene.start("startGame");
          }
        });
      }
    });
  
// Khai báo và khởi tạo nút trung tâm
let centreViewButton = this.add.image(50, 460, 'but_centre_view')
  .setInteractive()
  .setOrigin(0.5, 0.5)
  .setDisplaySize(55, 55);

// Bắt sự kiện cho nút trung tâm
centreViewButton.on('pointerdown', () => {
  if (!isTweening) {
    isTweening = true;
    this.tweens.add({
      targets: centreViewButton,
      scaleX: 0.5,
      scaleY: 0.5,
      ease: 'Power1',
      duration: 100,
      yoyo: true,
      onComplete: () => {
        isTweening = false;

        // Lấy scene hiện tại
        let levelScene = this.scene.get('Levels');
        console.log("Level Scene:", levelScene);

        if (levelScene && levelScene.ballService) {
          // Lấy quả bóng dựa vào levelNumber
          const ballView = levelScene.ballService.getBallViewById(levelScene.levelNumber);
          console.log("Ball view:", ballView);

          if (ballView) {
            const camera = levelScene.cameras.main;
            console.log("Camera:", camera);

            // Kiểm tra tọa độ của quả bóng
            console.log("Ball coordinates:", ballView.phaserObject.x, ballView.phaserObject.y);

            // Di chuyển camera tới vị trí quả bóng
            camera.pan(ballView.phaserObject.x, ballView.phaserObject.y, 1000, 'Power2');
          } else {
            console.warn("Quả bóng không tìm thấy!");
          }
        } else {
          console.warn("Scene hoặc ballService không tồn tại.");
        }
      }
    });
  }
});
}
// Hàm nhận dữ liệu và cập nhật giao diện
updateLaunchCount(newLaunchCount) {
  this.launchCount = newLaunchCount;
  this.launchText.setText(`Launch: ${this.launchCount}`);  // Cập nhật văn bản trên UI
}


}
