class ScoreboardScene extends Phaser.Scene {
    constructor() {
      super("scoreboard");
    }
    preload() {
      this.load.image("msg_box","assets/images/msg_box.png");
      this.load.image("but_continue_big","assets/images/but_continue_big.png");
      this.load.image("but_restart_big","assets/images/but_restart_big.png");
      this.load.spritesheet("star","assets/images/star.png",{
        frameWidth:84,
        frameHeight:84,
      })
    }
    create(){
      const centerX = this.cameras.main.width / 2;
      const centerY = this.cameras.main.height / 2;

      let darkOverlay = this.add.graphics();
      darkOverlay.fillStyle(0x000000, 0.6);
      darkOverlay.fillRect(0, 0, this.game.config.width, this.game.config.height);

      let scoreBoard = this.add.image(centerX, centerY,"msg_box")
           .setInteractive()
           .setOrigin(0.5, 0.5)  
           .setDisplaySize(420, 300);
      let isTweening = false;

      let restartBigButton = this.add.image(280,320,"but_restart_big")
           .setInteractive()
           .setOrigin(0.5, 0.5)  
           .setDisplaySize(70, 70);
           restartBigButton.on('pointerdown', () => {
          if (!isTweening) {
                isTweening = true;  
                this.tweens.add({
                  targets: restartBigButton,  
                  scaleX: 0.5,  
                  scaleY: 0.5, 
                  ease: 'Power1',  
                  duration: 100,  
                  yoyo: true, 
                  repeat: 0,  
                  onComplete: () => {
                    isTweening = false;
                  this.scene.stop("scoreboard");

                  }
                });
              }
            });
      let continueBigButton = this.add.image(375,320,"but_continue_big")
           .setInteractive()
           .setOrigin(0.5, 0.5)  
           .setDisplaySize(70, 70);
      continueBigButton.on('pointerdown', () => {
          if (!isTweening) {
              isTweening = true;  
              this.tweens.add({
                targets: continueBigButton,  
                scaleX:0.5,  
                scaleY:0.5, 
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

      let completeText1 = this.add.text(260, 200, "COMPLETE", { font: "23px Arial", fill: "yellow" });
      let scoreText = this.add.text(230, 250, "SCORE:", { font: "17px Arial", fill: "yellow" });
      let score = this.add.text(370, 250, "6000", { font: "17px Arial", fill: "yellow" });


     
      let starGroup = this.add.group(); 

      // Thêm từng star vào group
      let star1 = this.add.sprite(280, 170, "star")
          .setInteractive()
          .setOrigin(0.5, 0.5)  
          .setDisplaySize(40, 40);
      
      let star2 = this.add.sprite(320, 160, "star")
          .setInteractive()
          .setOrigin(0.5, 0.5)  
          .setDisplaySize(40, 40);
      
      let star3 = this.add.sprite(360, 170, "star")
          .setInteractive()
          .setOrigin(0.5, 0.5)  
          .setDisplaySize(40, 40);
      
      starGroup.add(star1);
      starGroup.add(star2);
      starGroup.add(star3);
      

    }
}