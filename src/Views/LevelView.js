class LevelView extends Phaser.GameObjects.Container {
    constructor(scene, levelData) {
        super(scene)
        this.scene = scene;
        this.levelData = levelData;
        this.group = null; // Thuộc tính để chứa nhóm hình ảnh cấp độ
    }

    createBackground() {
        this.createLevelImages();
    }

    createLevelImages() {
        const levels = [];
        for (let i = 1; i <= 18; i++) {
            levels.push(`level${this.levelData.levelNumber}_${i}`);
        }

        const columns = this.levelData.columns; 
        const rows = this.levelData.rows; 
        const imageWidth = this.levelData.width / columns; 
        const imageHeight = this.levelData.height / rows; 

        this.group = this.scene.add.group(); 
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const index = row * columns + col;
                if (index < levels.length) {
                    const img = this.scene.add.image(col * imageWidth, row * imageHeight, levels[index])
                        .setOrigin(0, 0)
                        .setDisplaySize(imageWidth, imageHeight);
                    this.group.add(img);
                }
            }
        }
    }

}
