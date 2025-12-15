class BaseSleepSession {
    constructor(startDateTime, endDateTime) {
        this.start = new Date(startDateTime);
        this.end = new Date(endDateTime);
    }

    calcDuration() {
        const diffMs = this.end - this.start;

        if (diffMs < 0) {
            return (this.end - this.start + 24 * 60 * 60 * 1000) / 60000;
        }

        return diffMs / 60000;
    }

    getSleepScore() {
        return 0;
    }
}

class LightSleep extends BaseSleepSession {
    getSleepScore() {
        return this.calcDuration() * 0.5;
    }
}

class DeepSleep extends BaseSleepSession {
    getSleepScore() {
        return this.calcDuration() * 1.5;
    }
}

class REMSleep extends BaseSleepSession {
    getSleepScore() {
        return this.calcDuration() * 1.0 + 10;
    }
}

class NightSleepSession {
    constructor(dateLabel) {
        this.dateLabel = dateLabel; 
        this.phases = [];         
    }

    addPhase(phase) {
        this.phases.push(phase);
    }

    getTotalDuration() {
        return this.phases.reduce((acc, p) => acc + p.calcDuration(), 0);
    }

    getRawScore() {
        return this.phases.reduce((acc, p) => acc + p.getSleepScore(), 0);
    }

    getNormalizedScore() {
        const raw = this.getRawScore();
        const MAX_SCORE = 520; 

        const normalized = (raw / MAX_SCORE) * 100;

        return Math.min(100, Math.max(0, normalized.toFixed(1)));
    }

    getPhasesInfo() {
        return this.phases.map(p => ({
            type: p.constructor.name,
            start: p.start.toLocaleString(),
            end: p.end.toLocaleString(),
            durationMin: p.calcDuration().toFixed(1),
            score: p.getSleepScore().toFixed(1)
        }));
    }
}

class SleepTracker {
    constructor() {
        this.nights = [];
    }

    addNight(night) {
        this.nights.push(night);
    }

   findByDate(dateLabel) {
    const found = this.nights
        .filter(n => n.dateLabel === dateLabel)
        .map(n => n.dateLabel);

    console.log("Search by date:", found);
    return found;
}

    getAllNights() {
        return this.nights.map(n => ({
            date: n.dateLabel,
            totalDurationMin: n.getTotalDuration(),
            nightScore: n.getNormalizedScore(),
            phases: n.getPhasesInfo()
        }));
    }

    sortByScore() {
        this.nights.sort((a, b) => b.getNormalizedScore() - a.getNormalizedScore());
    }

    getNightDates() {
        return this.nights.map(n => n.dateLabel);
    }

    save() {
        return JSON.stringify(
            this.nights.map(n => ({
                dateLabel: n.dateLabel,
                phases: n.phases.map(p => ({
                    type: p.constructor.name,
                    start: p.start.toISOString(),
                    end: p.end.toISOString()
                }))
            }))
        );
    }

    load(jsonString) {
        const data = JSON.parse(jsonString);

        this.nights = data.map(n => {
            const night = new NightSleepSession(n.dateLabel);

            n.phases.forEach(p => {
                let phase;

                if (p.type === "LightSleep") {
                    phase = new LightSleep(p.start, p.end);
                } else if (p.type === "DeepSleep") {
                    phase = new DeepSleep(p.start, p.end);
                } else if (p.type === "REMSleep") {
                    phase = new REMSleep(p.start, p.end);
                }

                night.addPhase(phase);
            });

            return night;
        });
    }
}

const tracker = new SleepTracker();

const night1 = new NightSleepSession("12.11.2025 → 13.11.2025");

night1.addPhase(new LightSleep("2025-11-12 23:00", "2025-11-12 23:45"));
night1.addPhase(new DeepSleep("2025-11-12 23:45", "2025-11-13 03:30"));
night1.addPhase(new REMSleep("2025-11-13 03:30", "2025-11-13 05:30"));
night1.addPhase(new LightSleep("2025-11-13 05:30", "2025-11-13 06:30"));

tracker.addNight(night1);

const night2 = new NightSleepSession("10.11.2025 → 11.11.2025");

night2.addPhase(new LightSleep("2025-11-10 00:30", "2025-11-10 01:20"));
night2.addPhase(new REMSleep("2025-11-10 01:20", "2025-11-10 02:10"));
night2.addPhase(new DeepSleep("2025-11-10 02:10", "2025-11-10 04:40"));

tracker.addNight(night2);

console.log("All nights:", tracker.getAllNights());

console.log("Sorted by quality:", tracker.getNightDates());
console.log("Found by date:", tracker.findByDate("12.11.2025 → 13.11.2025"));

console.log("Saving to JSON:");
const saved = tracker.save();

const savedParsed = JSON.parse(saved);
console.log("Saved nights:", savedParsed.length);
console.log("Dates:", savedParsed.map(n => n.dateLabel));

console.log("Restoring from JSON:");
const tracker2 = new SleepTracker();
tracker2.load(saved);
console.log("Restored dates:", tracker2.getNightDates());
