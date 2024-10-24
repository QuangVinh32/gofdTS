class SettingService {
    constructor(scene, jsonPath) {
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.controller = new SettingController();
        this.settingViews = [];
        this.settings = null; // hoặc một cấu trúc dữ liệu khác để lưu trữ settings

        
    }

    async loadSettings() {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.settings.forEach(settingData => {
                const dto = new SettingDTO(
                    settingData.id,
                    settingData.positionX,
                    settingData.positionY,
                    settingData.isSoundOn,
                    settingData.currentFrame
                );
                this.controller.addSetting(dto);
            });
            return this.controller.getAllSettings();
        } catch (error) {
            console.error("Error loading settings:", error);
            return [];
        }
    }

    // async initialize() {
    //     const settings = await this.loadSettings();
    //     settings.forEach(settingDTO => {
    //         this.createSettingView(settingDTO);
    //     });
    // }


    async initialize(settingId) {
        await this.loadSettings();
        const settingDTO = this.controller.getSettingById(settingId);
        if (settingDTO) {
            this.createSettingView(settingDTO);
        }
    }
    

    createSettingView(dto) {
        const settingView = new SettingView(this.scene, dto);
        this.settingViews.push(settingView);
        return settingView;
    }

    updateSettingView(dto) {
        const settingView = this.settingViews.find(view => view.settingData.id === dto.id);
        if (settingView) {
            settingView.updateAudio();
            settingView.updatePosition();
        }
    }

    updateSetting(id, newData) {
        this.controller.updateSetting(id, newData);
        const updatedSetting = this.controller.getSettingById(id);
        if (updatedSetting) {
            this.updateSettingView(updatedSetting);
        }
    }

    getAllSettingViews() {
        return this.settingViews;
    }

    getSettingViewById(id) {
        return this.settingViews.find(view => view.settingData.id === id);
    }

    getSettingDTOById(id) {
        return this.controller.getSettingById(id);
    }

    getAllSettingDTOs() {
        return this.controller.getAllSettings();
    }
    

}
