class PlayerLevelResult {
    constructor(id, launchCount, highestScore, highestStar, isUnlocked, isHoleAchieved) {
        this.id = id;
        this.launchCount = launchCount;
        this.highestScore = highestScore;
        this.highestStar = highestStar;
        this.isUnlocked = isUnlocked;
        this.isHoleAchieved = isHoleAchieved;
        this.playerDatas = [];
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getLaunch() {
        return this.launchCount;
    }

    setLaunch(launch) {
        this.launchCount = launch;
    }

    getScore() {
        return this.highestScore;
    }

    setScore(score) {
        this.highestScore = score;
    }

    getStarsEarned() {
        return this.highestStar;
    }

    setStarsEarned(starsEarned) {
        this.highestStar = starsEarned;
    }

    getIsUnlocked() {
        return this.isUnlocked;
    }

    setIsUnlocked(isUnlocked) {
        this.isUnlocked = isUnlocked;
    }

    getIsHoleAchieved() {
        return this.isHoleAchieved;
    }

    setIsHoleAchieved(isHoleAchieved) {
        this.isHoleAchieved = isHoleAchieved;
    }
}
