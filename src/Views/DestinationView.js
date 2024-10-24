class DestinationView {
    constructor(scene, destinationData) {
        this.scene = scene;
        this.destinationData = destinationData;
        
        // Tạo đối tượng Matter và graphics
        this.phaserObject = this.createPhaserObject();
        this.matterBody = this.createMatterBody();
    }

    createPhaserObject() {
        // Tạo đối tượng graphics
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(2, 0xff0000);
        graphics.strokeCircle(this.destinationData.positionX, this.destinationData.positionY, this.destinationData.radius);

        return graphics;
    }

    createMatterBody() {
        // Tạo body Matter cho điểm đến
        const body = this.scene.matter.add.circle(
            this.destinationData.positionX, 
            this.destinationData.positionY, 
            this.destinationData.radius / 2, 
            { isStatic: true }
        );


    }

    update() {
        this.phaserObject.clear(); 
        this.phaserObject.lineStyle(2, 0xff0000); 
        this.phaserObject.strokeCircle(this.destinationData.positionX, this.destinationData.positionY, this.destinationData.radius);
    }
}
