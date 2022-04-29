//  featuers
// loop from each pad
// able to make them active
// set the speed of interval for repeater

class Kit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.allSelects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoInput = document.querySelector('.tempo');
        // audio src selected
        this.kickSelect = "./sounds/kick-classic.wav";
        this.snareSelect = "./sounds/snare-acoustic01";
        this.hihatSelect = "./sounds/hihat-acoustic01";
        // all Audios
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.bpm = 150;
        this.index = 0;
        this.isPlaying = null;
    }
    activePad() {
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 8;
        const runPad = document.querySelectorAll(`.b${step}`);
        runPad.forEach((pad) => {
            pad.style.animation = "AnimateActive 0.3s alternate ease-in-out 2";
            if (pad.classList.contains("active")) {
                if (pad.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (pad.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (pad.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
        let interval = (60 / this.bpm) * 1000;
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    playText() {
        if (!this.isPlaying) {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove('active')
        } else {
            this.playBtn.innerText = "Pause";
            this.playBtn.classList.add('active')
        }
    }
    changeSound(e) {
        let selectionName = e.target.name;
        let selectionValue = e.target.value;
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihatSelect":
                this.hihatAudio.src = selectionValue;
        }
    }
    muteVoice(e) {
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.muted = true;
                    break;
                case '1':
                    this.snareAudio.muted = true;
                    break;
                case '2':
                    this.hihatAudio.muted = true;
                    break;
            }
        } else {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.muted = false;
                    break;
                case '1':
                    this.snareAudio.muted = false;
                    break;
                case '2':
                    this.hihatAudio.muted = false;
                    break;
            }
        }
    }
    changeTempo(e) {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        let playBtn = document.querySelector('.play')
        if (playBtn.classList.contains('active')) {
            this.start();
        }
    }
    updateTempoText(e) {
        let tempoNo = document.querySelector('.tempo-no');
        this.bpm = e.target.value
        tempoNo.innerText = e.target.value;
    }
}

let Drumkit = new Kit();

// Event Listeners
Drumkit.playBtn.addEventListener("click", () => {
    Drumkit.start();
    Drumkit.playText();
});

Drumkit.pads.forEach((pad) => {
    pad.addEventListener("click", Drumkit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

Drumkit.allSelects.forEach((select) => {
    select.addEventListener("change", function (e) {
        Drumkit.changeSound(e);
    });
});

Drumkit.muteBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        Drumkit.muteVoice(e);
    });
});


Drumkit.tempoInput.addEventListener('input', function (e) {
    Drumkit.updateTempoText(e);
});

Drumkit.tempoInput.addEventListener('change', function () {
    Drumkit.changeTempo();
})