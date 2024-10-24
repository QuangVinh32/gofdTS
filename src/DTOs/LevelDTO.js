class LevelDTO {
    constructor(levelId, levelNumber, width, height, columns, rows, origin, 
        // ball = null, destination = null, playerLevelResult = null
    ) {
        this.levelId = levelId;
        this.levelNumber = levelNumber;
        this.width = width;
        this.height = height;
        this.columns = columns;
        this.rows = rows;
        this.origin = origin;
        // this.ball = ball;
        // this.obstacles = [];
        // this.destination = destination;
        // this.playerLevelResult = playerLevelResult;
    }

    getLevelId() {
        return this.levelId;
    }

    setLevelId(id) {
        this.levelId = levelId;
    }

    getLevelNumber() {
        return this.levelNumber;
    }

    setLevelNumber(levelNumber) {
        this.levelNumber = levelNumber;
    }

    getWidth() {
        return this.width;
    }

    setWidth(width) {
        this.width = width;
    }

    getHeight() {
        return this.height;
    }

    setHeight(height) {
        this.height = height;
    }

    getColumns() {
        return this.columns;
    }

    setColumns(columns) {
        this.columns = columns;
    }

    getRows() {
        return this.rows;
    }

    setRows(rows) {
        this.rows = rows;
    }

    getOrigin() {
        return this.origin;
    }

    setOrigin(origin) {
        this.origin = origin;
    }

}
