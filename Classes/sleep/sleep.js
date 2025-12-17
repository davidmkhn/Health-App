class ScoreStrategy {
  calcScore(durationMin) {
    return 0;
  }
}

class LightScoreStrategy extends ScoreStrategy {
  calcScore(durationMin) {
    return durationMin * 0.5;
  }
}

class DeepScoreStrategy extends ScoreStrategy {
  calcScore(durationMin) {
    return durationMin * 1.5;
  }
}

class REMScoreStrategy extends ScoreStrategy {
  calcScore(durationMin) {
    return durationMin * 1.0 + 10;
  }
}

class BaseSleepSession {
  constructor(startDateTime, endDateTime, scoreStrategy = null) {
    this.start = new Date(startDateTime);
    this.end = new Date(endDateTime);
    this.scoreStrategy = scoreStrategy;

    if (isNaN(this.start.getTime()) || isNaN(this.end.getTime())) {
      throw new Error("Invalid start/end datetime in sleep session");
    }
  }

  calcDuration() {
    let diffMs = this.end - this.start;

    if (diffMs < 0) {
      diffMs += 24 * 60 * 60 * 1000;
    }

    return diffMs / 60000;
  }

  getSleepScore() {
    if (!this.scoreStrategy) return 0;
    return this.scoreStrategy.calcScore(this.calcDuration());
  }
}

class LightSleep extends BaseSleepSession {
  constructor(start, end) {
    super(start, end, new LightScoreStrategy());
  }
}

class DeepSleep extends BaseSleepSession {
  constructor(start, end) {
    super(start, end, new DeepScoreStrategy());
  }
}

class REMSleep extends BaseSleepSession {
  constructor(start, end) {
    super(start, end, new REMScoreStrategy());
  }
}

class NightSleepSession {
  constructor(dateLabel, maxScore = 520) {
    this.dateLabel = dateLabel;
    this.phases = [];
    this.maxScore = maxScore;
  }

  addPhase(phase) {
    if (!phase) throw new Error("Phase is required");
    this.phases.push(phase);
  }

  removePhase(index) {
    if (index < 0 || index >= this.phases.length) return false;
    this.phases.splice(index, 1);
    return true;
  }

  updatePhaseTime(index, newStart, newEnd) {
    if (index < 0 || index >= this.phases.length) return false;

    const start = new Date(newStart);
    const end = new Date(newEnd);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid datetime in updatePhaseTime");
    }

    this.phases[index].start = start;
    this.phases[index].end = end;
    return true;
  }

  getTotalDuration() {
    return this.phases.reduce((acc, p) => acc + p.calcDuration(), 0);
  }

  getRawScore() {
    return this.phases.reduce((acc, p) => acc + p.getSleepScore(), 0);
  }

  getNormalizedScore() {
    const raw = this.getRawScore();
    const normalized = (raw / this.maxScore) * 100;
    return Math.min(100, Math.max(0, Number(normalized.toFixed(1))));
  }

  getPhasesInfo() {
    return this.phases.map((p, idx) => ({
      index: idx,
      type: p.constructor.name,
      start: p.start.toLocaleString(),
      end: p.end.toLocaleString(),
      durationMin: Number(p.calcDuration().toFixed(1)),
      score: Number(p.getSleepScore().toFixed(1))
    }));
  }
}

class SleepTracker {
  constructor() {
    this.nights = [];
  }

  addNight(night) {
    if (!night) throw new Error("Night is required");
    this.nights.push(night);
  }

  removeNight(dateLabel) {
    const idx = this.nights.findIndex(n => n.dateLabel === dateLabel);
    if (idx === -1) return false;
    this.nights.splice(idx, 1);
    return true;
  }

  findByDate(dateLabel) {
    const night = this.nights.find(n => n.dateLabel === dateLabel) || null;
    return night;
  }

  getAllNights() {
    return this.nights.map(n => ({
      date: n.dateLabel,
      totalDurationMin: Number(n.getTotalDuration().toFixed(1)),
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
        maxScore: n.maxScore,
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
      const night = new NightSleepSession(n.dateLabel, n.maxScore ?? 520);

      n.phases.forEach(p => {
        let phase;

        if (p.type === "LightSleep") {
          phase = new LightSleep(p.start, p.end);
        } else if (p.type === "DeepSleep") {
          phase = new DeepSleep(p.start, p.end);
        } else if (p.type === "REMSleep") {
          phase = new REMSleep(p.start, p.end);
        }

        if (!phase) {
          throw new Error("Unknown phase type in JSON: " + p.type);
        }

        night.addPhase(phase);
      });

      return night;
    });
  }
}

// Decorator with logging
class LoggingSleepTracker extends SleepTracker {
  
  // Do not log adding the night. Nothing to decorate
  // addNight(nigh)
  
  removeNight(dateLabel){
    console.log("\nRemoving night " +  dateLabel + "...");
    const removedNight = super.removeNight(dateLabel);
    console.log("Removed night:", removedNight);
    return removedNight;
  }
  
  findByDate(dateLabel) {
    const night = super.findByDate(dateLabel);
    console.log("Search by date:", night ? night.dateLabel : "Not found");
    return night;
  }
  
  getAllNights() {
    const nights = super.getAllNights();
    console.log("All nights:", nights);
    return nights;
  }
  
  sortByScore() {
    console.log("\nDates BEFORE sort:", super.getNightDates());
    super.sortByScore();
    console.log("Dates AFTER sort:", super.getNightDates());
  }
  
  save() {
    console.log("\nSaving to JSON...");
    const saved = super.save();
    console.log("Saved JSON length:", saved.length);
    return saved;
  }
  
  load(saved){
    console.log("\nRestoring from JSON...");
    super.load(saved);
    console.log("Restored dates:", super.getNightDates());
  }
}

const tracker = new LoggingSleepTracker();

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

const foundNight = tracker.findByDate("12.11.2025 → 13.11.2025");

if (foundNight) {
  console.log("\nEditing phase #0 times...");
  foundNight.updatePhaseTime(0, "2025-11-12 23:05", "2025-11-12 23:50");
  console.log("After edit:", foundNight.getPhasesInfo());
}

if (foundNight) {
  console.log("\nRemoving phase #1...");
  const ok = foundNight.removePhase(1);
  console.log("Removed:", ok);
  console.log("After remove:", foundNight.getPhasesInfo());
}

tracker.sortByScore();

const saved = tracker.save();

const tracker2 = new LoggingSleepTracker();

tracker2.load(saved);

const removedNight = tracker.removeNight("10.11.2025 → 11.11.2025");

console.log("Remaining dates:", tracker.getNightDates());
