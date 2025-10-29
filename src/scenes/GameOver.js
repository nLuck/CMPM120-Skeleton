export class GameOver extends Phaser.Scene {
    
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.finalWave = data.wave || 1;
    }

    preload() {
        this.load.image('end_background', 'assets/darkPurple.png');
    }

    create() {
        this.makeBackground('end_background');

        this.add.text(640, 300, 'GAME OVER', { font: '60px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(640, 350, `Final Score: ${this.finalScore}`, { font: '30px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(640, 400, `Waves Survived: ${this.finalWave}`, { font: '30px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(640, 450, 'press ENTER to restart', { font: '40px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(640, 500, 'press M to return to title', { font: '40px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);

        this.startGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.titleScreen = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update(time, delta) {
        let dt = delta / 1000;

        if (this.startGame.isDown) {
            this.scene.stop('GameOver');
            this.scene.start('Start');
        }
        if (this.titleScreen.isDown) {
            this.scene.stop('GameOver');
            this.scene.start('Title');
        }
    }

    makeBackground(which) {
        for (let i = 0; i < 7; i++) {
            this.add.sprite(-128+(256*i), 320-256, which);
        }
        for (let i = 0; i < 7; i++) {
            this.add.sprite(-128+(256*i), 320, which);
        }
        for (let i = 0; i < 7; i++) {
            this.add.sprite(-128+(256*i), 320+256, which);
        }
    }
}