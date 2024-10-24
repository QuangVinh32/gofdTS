
var config = {
  type: Phaser.AUTO,
  width: 650,
  height: 500,
  backgroundColor: '#000000',

  physics: {
    default: 'matter', 
    matter: {
      gravity: {
        y: 0 // Tắt trọng lực theo chiều dọc
      },
      debug: true, // Tắt hoàn toàn chế độ debug
      // debug: {
      //   debug: true 
      //   // renderFill: false,
      //   // showInternalEdges: true,
      //   // showConvexHulls: true
      // }
    }
  },
  scene: [
    LoadingScene,
    MainScene,
    MenuLevelScene,
    LevelsScene,
    UIScene,
    ScoreboardScene,
    ChoiceScene,
    EditorPolygon
  ]
};

var game = new Phaser.Game(config);
