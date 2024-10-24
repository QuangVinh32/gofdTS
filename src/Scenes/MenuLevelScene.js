class MenuLevelScene extends Phaser.Scene {
    constructor() {
      super("startGame");
      this.soundtrack = null;
    }
    preload() {
      this.load.image("bg_menu", "assets/images/bg_menu.png");
      this.load.image("menu_text_world", "assets/images/menu_text_world.png"); 
      this.load.image("menu_text_minigolf", "assets/images/menu_text_minigolf.png"); 
      this.load.image("but_continue", "assets/images/but_continue.png");
      this.load.image("but_play", "assets/images/but_play.png");
      this.load.image("but_exit","assets/images/but_exit.png");
      this.load.spritesheet('but_level', 'assets/images/but_level_spritesheet.png', { 
        frameWidth: 128,  
        frameHeight: 129
      });
      this.load.spritesheet("star","assets/images/star.png",{
        frameWidth:84,
        frameHeight:84,
      })
      this.load.spritesheet('audio_icon', 'assets/images/audio_icon_spritesheet.png', { 
        frameWidth: 128,  
        frameHeight: 129  
      });
    }
    create() {

      this.add.image(0, 0, 'bg_menu').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
      let darkOverlay = this.add.graphics();
      darkOverlay.fillStyle(0x000000, 0.6);  
      darkOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);

      const levelsCount = 3;
      for (let i = 1; i <= levelsCount; i++) {
          let playText = this.add.text(20, 20 + (i - 1) * 30, `LEVEL ${i}`, { font: "25px Arial", fill: "yellow" });
          playText.setInteractive();
          playText.on('pointerdown', () => {
              // console.log(`Level ${i} clicked`);
              this.scene.launch("uiScene");
              // this.scene.launch("scoreboard");
              // this.scene.launch("editPolygon");

              this.scene.start("Levels", { levelNumber: i });
          });
      };

      let exitButton = this.add.image(860, 45, 'but_exit').setInteractive().setOrigin(0.5, 0.5).setDisplaySize(70, 70);  
      exitButton.on('pointerdown', () => {
        if (!isTweening) {
          isTweening = true;  
          this.tweens.add({
            targets: exitButton,  
            scaleX: 0.6,  
            scaleY: 0.6, 
            ease: 'Power1',  
            duration: 100,  
            yoyo: true, 
            repeat: 0,  
            onComplete: () => {
              isTweening = false;
              this.soundtrack.stop();
              this.scene.start("playGame")
            }
          });
        }
      });

    this.add.text(210, 70, "SELECT A LEVEL", { font: "30px Arial", fill: "Yellow" });
    this.add.text(300, 520, "TOTAL SCORE:", { font: "25px Arial", fill: "Yellow" });
    let buttonGroup = this.add.container(60, 180);

    for (let i = 1; i <= 18; i++) {
      let butLevel = this.add.sprite(0, 0, 'but_level').setInteractive().setOrigin(0.5, 0.5).setDisplaySize(60, 60);
      let isTweening = false;
      let pass = true;
      butLevel.setFrame(1);

      butLevel.on('pointerdown', () => { 
        if (!isTweening) {
            isTweening = true;
            pass = !pass;

            if (pass) {
                butLevel.setFrame(1);
                console.log("pass");
            } else {
                butLevel.setFrame(0);  
                console.log("false");
            }

            this.tweens.add({
                targets: butLevel,
                scaleY: 0.6,
                scaleX: 0.6,
                ease: 'Power1',
                duration: 100,
                yoyo: true,
                repeat: 0,
                onComplete: () => {
                    isTweening = false;
                }
            });
        }
    });

    let star1 = this.add.sprite(0, -45,'star').setOrigin(0.5, 0.5).setDisplaySize(20, 20);
    let star2 = this.add.sprite(22, -40,'star').setOrigin(0.5, 0.5).setDisplaySize(20, 20);
    let star3 = this.add.sprite(-22, -40,'star').setOrigin(0.5, 0.5).setDisplaySize(20, 20);
    let levelPoins = this.add.text(300, 520,"TOTAL SCORE:", { font: "25px Arial", fill: "Yellow" });

    let numberOfLevels = this.add.text(-11, -15, i.toString(), { font: "25px Arial Bold", fill: "yellow" }).setOrigin(0,0);

    let singleButtonGroup = this.add.container((i - 1) % 6 * 90, Math.floor((i - 1) / 6) * 120); 
    singleButtonGroup.add([butLevel, star1, star2, star3, numberOfLevels]);

    buttonGroup.add(singleButtonGroup);
}

buttonGroup.x += 50;



    }
  }
  