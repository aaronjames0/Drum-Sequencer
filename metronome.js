function metronome(tick, step, timeInterval) {
    this.timeInterval = timeInterval;
    this.running = false;
    
    this.start = () => {
        this.running = true;
        this.expected = Date.now() + this.timeInterval;
        this.theTimeout = null;
        tick();
        this.timeout = setTimeout(this.round, this.timeInterval);
    }
    this.stop = () => {
        this.running = false;
        clearTimeout(this.timeout);
    }
    this.round = () => {
        let drift = Date.now() - this.expected;
        step();
        tick();
        this.expected += this.timeInterval;
        this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
  }

  export default metronome;