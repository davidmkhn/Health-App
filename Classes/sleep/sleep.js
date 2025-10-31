class SleepSession {
    constructor(startTime, endTime, quality){
        this.startTime = startTime;
        this.endTime = endTime;
        this.quality = quality;
    }

calcDuration(){
        const [sh, sm] = this.startTime.split(":").map(Number);
        const [eh, em] = this.endTime.split(":").map(Number);

        let startMin = sh*60 + sm;
        let endMin = eh*60 + em;

        if(endMin<startMin) {
            endMin += 24*60;
        }

        const diffMin = endMin - startMin;
        const hours = Math.floor(diffMin/60);
        const minutes = diffMin % 60;

        return `${hours} годин, ${minutes} хвилин` 
        }
    }

class SleepTracker {
    constructor() {
        this.sleepSessions = [];
}

addSleepSession(startTime, endTime, quality){
    const session = new SleepSession(startTime, endTime, quality);
    this.sleepSessions.push(session);
}

getSession() {
    return this.sleepSessions.map(session => ({
        startTime: session.startTime,
        endTime: session.endTime,
        quality: session.quality,
        duration: session.calcDuration()
    }));
}

clear(){
    this.sleepSessions = [];
}

} 

const tracker = new SleepTracker();
tracker.addSleepSession("23:00", "07:15", 8);
tracker.addSleepSession("00:10", "06:40", 6);
console.log(tracker.getSession());