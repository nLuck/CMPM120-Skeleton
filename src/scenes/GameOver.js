export class GameOver extends Phaser.Scene {
    
    constructor() {
        super('GameOver');
    }

    preload() {
        this.load.image('end_background', 'assets/darkPurple.png');
    }

    create() {
        for (let i = 0; i < 7; i++) {
            this.add.sprite(-128+(256*i), 320-256, 'end_background');
        }
        for (let i = 0; i < 7; i++) {
            this.add.sprite(-128+(256*i), 320, 'end_background');
        }
        for (let i = 0; i < 7; i++) {
            this.add.sprite(-128+(256*i), 320+256, 'end_background');
        }

        this.add.text(640, 300, 'GAME OVER', { font: '40px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(640, 360, 'press ENTER to restart', { font: '40px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);

        this.startGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(time, delta) {
        let dt = delta / 1000;

        if (this.startGame.isDown) {
            this.scene.stop('Gameover');
            this.scene.start('Start');
        }
    }
}