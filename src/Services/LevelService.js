class LevelService {
    constructor(scene, jsonPath) {
        this.scene = scene; // scene của Phaser
        this.jsonPath = jsonPath; // đường dẫn đến file JSON
        this.controller = new LevelController(); // LevelService quản lý LevelController
        this.levelViews = []; 
    }

    // Tải dữ liệu cấp độ từ JSON và thêm vào LevelController
    async loadLevels() {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.forEach(levelData => {
                const dto = new LevelDTO(
                    levelData.levelId,
                    levelData.levelNumber,
                    levelData.width,
                    levelData.height,
                    levelData.columns,
                    levelData.rows,
                    levelData.origin,

                );
                this.controller.addLevel(dto);
            });
            return this.controller.getAllLevels();
        } catch (error) {
            console.error("Error loading levels:", error);
            return [];
        }
    }

    // Khởi tạo các LevelView dựa trên levelNumber
    async initialize(levelNumber) {
        const levels = await this.loadLevels();
        const specificLevelDTO = levels.find(dto => dto.levelNumber === levelNumber);
        if (specificLevelDTO) {
            this.createLevelView(specificLevelDTO);
        }
    }

    // Tạo LevelView và thêm vào scene
    createLevelView(dto) {
        const levelView = new LevelView(this.scene, dto);
        this.levelViews.push(levelView);
        return levelView;
    }

    // Cập nhật LevelView khi DTO thay đổi
    updateLevelView(dto) {
        const levelView = this.levelViews.find(view => view.levelData.levelId === dto.levelId);
        if (levelView) {
            levelView.updateLevel();
        }
    }

    // Cập nhật dữ liệu level và đồng bộ với view
    updateLevel(id, newData) {
        this.controller.updateLevel(id, newData);
        const updatedLevel = this.controller.getLevelById(id);
        if (updatedLevel) {
            this.updateLevelView(updatedLevel);
        }
    }

    // Lấy tất cả các LevelView
    getAllLevelViews() {
        return this.levelViews;
    }

    // Lấy LevelView theo ID
    getLevelViewById(id) {
        return this.levelViews.find(view => view.levelData.levelId === id);
    }

    // Lấy LevelDTO theo ID
    getLevelDTOById(id) {
        return this.controller.getLevelById(id);
    }

    // Lấy tất cả các LevelDTOs
    getAllLevelDTOs() {
        return this.controller.getAllLevels();
    }
}
