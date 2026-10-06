// Windows 2000 Web Audio API Sound Synthesizer

class RetroAudio {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Windows 2000 Iconic Startup Sound Synthesizer
    playStartup() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        // Chords sequence mimicking Win2K warm pad & chime
        // Chord 1: E Major (E3, B3, E4, G#4)
        // Chord 2: B Major / G# minor (D#4, F#4, B4)
        // Shimmering bell on top
        const notes = [
            { f: 164.81, start: 0.0, dur: 3.0, gain: 0.12, type: 'triangle' }, // E3
            { f: 246.94, start: 0.0, dur: 3.0, gain: 0.10, type: 'sine' },     // B3
            { f: 329.63, start: 0.1, dur: 2.8, gain: 0.15, type: 'triangle' }, // E4
            { f: 415.30, start: 0.2, dur: 2.6, gain: 0.14, type: 'sine' },     // G#4
            { f: 659.25, start: 0.4, dur: 2.4, gain: 0.10, type: 'sine' },     // E5 bell
            { f: 830.61, start: 0.7, dur: 2.2, gain: 0.08, type: 'sine' },     // G#5 chime
            { f: 987.77, start: 1.0, dur: 2.2, gain: 0.12, type: 'sine' },     // B5 crystal
            { f: 1318.51, start: 1.3, dur: 2.0, gain: 0.07, type: 'sine' }    // E6 sparkle
        ];

        notes.forEach(n => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = n.type;
            osc.frequency.setValueAtTime(n.f, now + n.start);

            gain.gain.setValueAtTime(0.001, now + n.start);
            gain.gain.exponentialRampToValueAtTime(n.gain, now + n.start + 0.15);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + n.start + n.dur);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + n.start);
            osc.stop(now + n.start + n.dur + 0.1);
        });
    }

    // Classic Windows Navigation / Click
    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.035);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
    }

    // Windows Ding / Asterisk
    playDing() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now); // A5

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
    }

    // Windows Critical Stop / Chord
    playChord() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        [220, 330, 440].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.4);
        });
    }

    // Minesweeper Bomb Explosion
    playExplosion() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const bufferSize = this.ctx.sampleRate * 0.4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.35);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.38);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start();
    }
}

const retroSound = new RetroAudio();
