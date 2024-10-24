class SettingView extends Phaser.GameObjects.Container {
    constructor(scene, settingData) {
        super(scene);
        this.settingData = settingData; 
        this.isSoundOn = settingData.isSoundOn; 
        this.createAudio();
        this.scene.add.existing(this);
    }

    createAudio() {
        // Tạo biểu tượng âm thanh
        this.audioIcon = this.scene.add.sprite(this.settingData.positionX, this.settingData.positionY, "audio")
            .setDisplaySize(55, 55)
            .setOrigin(0.5, 0.5)
            .setInteractive();

        // Cập nhật trạng thái âm thanh ban đầu
        this.updateAudio();

        // Thêm sự kiện nhấn cho biểu tượng âm thanh
        this.audioIcon.on('pointerdown', () => {
            this.toggleAudio();
        });

        this.add(this.audioIcon); 
    }

    updateAudio() {
        if (this.isSoundOn) {
            this.audioIcon.setFrame(0); // Khung hình cho âm thanh bật (khung hình 0)
            console.log(0);
        } else {
            this.audioIcon.setFrame(1); // Khung hình cho âm thanh tắt (khung hình 1)
            console.log(1);
        }
    }

    toggleAudio() {
        this.isSoundOn = !this.isSoundOn;
        this.updateAudio();

        // Thực hiện hành động thêm (ví dụ: phát/dừng âm thanh)
        if (this.isSoundOn) {
            this.scene.sound.resumeAll(); 
        } else {
            this.scene.sound.pauseAll(); 
        }
    }
}
