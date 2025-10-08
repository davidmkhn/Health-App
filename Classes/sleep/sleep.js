class sleepTracker {
constructor() {
this.sleepSession = [];
}

addSleepSession(startTime, endTime, quality){
this.sleepSession.push({startTime, endTime, quality})
}

duration(){
    return this.sleepSession.map( session => {

        const [sh, sm] = session.startTime.split(":").map(Number);
        const [eh, em] = session.endTime.split(":").map(Number);

        let startMin = sh*60 + sm;
        let endMin = eh*60 + em;

        if(endMin<startMin) {
            endMin += 24*60;
        }

        const diffMin = endMin - startMin;
        const hours = Math.floor(diffMin/60);
        const minutes = diffMin % 60;

        return {
            startTime: session.startTime,
            endTime: session.endTime,
            quality: session.quality,
            duration: `${hours} годин, ${minutes} хвилин` 
        };
    });
}

clear(){
    this.sleepSession = [];
}

} 

const tracker = new sleepTracker();
tracker.addSleepSession("23:00", "07:15", 8);
tracker.addSleepSession("00:10", "06:40", 6);
console.log(tracker.duration());
