class LoadingScene extends Phaser.Scene {
  constructor() {
    super("loadingGame");
  }
  preload() {
    this.load.image("loading", "assets/images/loading.png");
  }
  create() {
    let loadingContainer = this.add.container(0, 0);

    let loadingImage = this.add.image(0, 0, "loading").setDisplaySize(200, 200).setOrigin(0,0);

    let loadingText = this.add.text(0, 220, "Loading game....", { 
      fontSize: "24px", 
      color: "yellow" 
    }).setOrigin(0, 0); 

    loadingContainer.add([loadingImage, loadingText]);
    loadingContainer.setPosition(
      this.cameras.main.width / 2  - loadingImage.displayWidth / 2, 
      this.cameras.main.height / 2 - loadingImage.displayHeight / 2 
    );

    this.cameras.main.once('camerafadeoutcomplete', function (camera) {
      this.scene.start("playGame");

  }, this);
  this.cameras.main.fadeOut(1000);


  }
}
