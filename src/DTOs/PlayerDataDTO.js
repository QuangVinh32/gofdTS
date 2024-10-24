class PlayerDataDTO{
    constructor(id, totalHigestScore, totalHigestStar, highestLevelsUnlocked){
        this.id = id;
        this.totalHigestScore = totalHigestScore;
        this.totalHigestlStar = totalHigestStar;
        this.highestLevelsUnlocked = highestLevelsUnlocked;
    }
    getId(){
        return this.id;
    }
    setId(id){
        this.id = id;
    }
    getTotalHigestScore(){
        return this.totalHigestScore;
    }
    setTotalHigestScore(totalHigestScore){
        this.totalHigestScore = totalHigestScore
    }
    getTotalHigestStar(){
        return this.totalHigestlStar;
    }
    setTotalHigestStar(totalHigestlStar){
        this.totalHigestlStar = totalHigestlStar
    }
    getHighestLevelsUnlocked(){
        return this.getHighestLevelsUnlocked;
    }
    setHighestLevelsUnlocked(highestLevelsUnlocked){
        this.highestLevelsUnlocked = highestLevelsUnlocked;
    } 
}