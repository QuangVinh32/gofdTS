class LevelController {
    constructor() {
        this.levels = [];
    }

    addLevel(dto) {
        this.levels.push(dto);
    }

    getAllLevels() {
        return this.levels;
    }

    getLevelById(id) {
        return this.levels.find(level => level.getLevelId() === id);
    }

    updateLevel(id, newData) {
        const level = this.getLevelById(id);
        if (level != null) {
            level.setLevelNumber(newData.levelNumber);
        }
    }
}
