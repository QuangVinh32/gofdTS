class MainScene extends Phaser.Scene {
  constructor() {
      super("playGame");
      this.settingService = null; // Thêm thuộc tính để lưu SettingService
      this.settingView = null; // Thêm thuộc tính để lưu SettingView
  }

  preload() {
      this.load.image("bg_menu", "assets/images/bg_menu.png");
      this.load.image("menu_text_world", "assets/images/menu_text_world.png");
      this.load.image("menu_text_minigolf", "assets/images/menu_text_minigolf.png");
      this.load.image("but_continue", "assets/images/but_continue.png");
      this.load.image("but_play", "assets/images/but_play.png");
      this.load.spritesheet("audio", "assets/images/audio_icon_spritesheet.png", {
          frameWidth: 128,
          frameHeight: 128,
      });
  }

  async create() {
      this.add.image(0, 0, 'bg_menu').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);

      let menuTextMiniGolf = this.add.image(0, 70, "menu_text_minigolf")
          .setOrigin(0, 0)
          .setDisplaySize(400, 280)
          .setAngle(-4)
          .setInteractive();

      let menuTextWorld = this.add.image(150, 180, "menu_text_world")
          .setOrigin(0, 0)
          .setDisplaySize(300, 200)
          .setAngle(-4)
          .setInteractive();

      let continueButton = this.add.image(400, 287, "but_continue")
          .setOrigin(0, 0)
          .setDisplaySize(150, 350)
          .setInteractive();

      let playButton = this.add.image(313, 352, "but_play")
          .setOrigin(0, 0)
          .setDisplaySize(150, 350)
          .setInteractive();


      
      const settingId = 1;
      this.settingService = new SettingService(this, "assets/data/setting.json");
      await this.settingService.initialize(settingId);

      // Xử lý sự kiện khi nhấn nút Play
      playButton.on('pointerdown', () => {
          this.handleButtonClick(playButton, "startGame");
      });

      // Xử lý sự kiện khi nhấn nút Continue
      continueButton.on('pointerdown', () => {
          this.handleButtonClick(continueButton, "startGame");
      });
  }

  handleButtonClick(button, sceneKey) {
      this.tweens.add({
          targets: button,
          y: button.y + 15,
          duration: 100,
          ease: 'Power2',
          yoyo: true,
          onComplete: () => {
              this.cameras.main.fadeOut(250);
              this.cameras.main.once('camerafadeoutcomplete', function () {
                  this.scene.start(sceneKey);
              }, this);
          }
      });
  }

  update() {
  }
}
