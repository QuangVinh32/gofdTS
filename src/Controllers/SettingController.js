class SettingController {
    constructor() {
        this.settings = [];
    }

    // Thêm SettingDTO
    addSetting(dto) {
        this.settings.push(dto);
    }

    // Lấy tất cả settings
    getAllSettings() {
        return this.settings;
    }

    // Cập nhật setting dựa trên ID và dữ liệu mới
    updateSetting(id, newData) {
        const setting = this.getSettingById(id);
        if (setting) {
            setting.setPositionX(newData.positionX);
            setting.setPositionY(newData.positionY);
            setting.setIsSoundOn(newData.isSoundOn);
            setting.setCurrentFrame(newData.currentFrame);  
        }
    }

    // Tìm setting theo ID
    getSettingById(id) {
        return this.settings.find(setting => setting.getId() === id);
    }
}
