class ChoiceScene extends Phaser.Scene {
    constructor() {
      super("choice");
      this.isTweening = false; 
    }
  
    preload() {
      this.load.image("msg_box", "assets/images/msg_box.png");
      this.load.image("but_exit", "assets/images/but_exit.png");
      this.load.image("but_yes", "assets/images/but_yes.png");
    }
  
    create(){
      const centerX = this.cameras.main.width / 2;
      const centerY = this.cameras.main.height / 2;
  
      let darkOverlay = this.add.graphics();
      darkOverlay.fillStyle(0x000000, 0.6);  
      darkOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);
  
      let scoreBoard = this.add.image(centerX, centerY, "msg_box")
           .setInteractive()
           .setOrigin(0.5, 0.5)  
           .setDisplaySize(420, 320); 
  
      let exitButton = this.add.image(280 ,320,"but_exit")
           .setInteractive()
           .setOrigin(0.5, 0.5)  
           .setDisplaySize(70, 70);
  
        this.tweens.add({
          targets: exitButton,  
          scaleX: 0.6,  
          scaleY: 0.6, 
          ease: 'Power1',
          duration: 1000,  
          yoyo: true, 
          repeat: -1,
        });
  
        exitButton.on('pointerdown', () => {
          this.scene.stop('choice');       
        });
  
      let yesButton = this.add.image(375, 320, "but_yes")
           .setInteractive()
           .setOrigin(0.5, 0.5)  
           .setDisplaySize(70, 70);
      yesButton.on('pointerdown', () => {
          if (!this.isTweening) {
              this.isTweening = true;  
              this.tweens.add({
                targets: yesButton,  
                scaleX: 0.6,  
                scaleY: 0.6, 
                ease: 'Power1',  
                duration: 100,  
                yoyo: true, 
                repeat: 0,  
                onComplete: () => {
                  this.isTweening = false;
                  this.cameras.main.fadeOut(250);
                  this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.stop('uiScene');  
                    this.scene.stop('level1');    
                    this.scene.stop('choice');   
                    this.scene.start("playGame");
                });
  
                }
              });
          }
      });
  
  
      let completeText1 = this.add.text(180, 150, "ARE YOU SURE YOU WANT", { font: "22px Arial", fill: "yellow" });
      let scoreText = this.add.text(215, 200, "TO QUIT THE GAME?", { font: "22px Arial", fill: "yellow" });
    }
  }
  