export class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    preload() {

    }

    create() {
        this.makeBackground('title_background');

        this.add.text(640, 70, 'Credits', { font: '60px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(640, 150, 'Game Developer: Yong Zhao', { font: '30px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(640, 200, 'Graphics: Kenny.nl', { font: '30px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(640, 250, 'Sound Effects: Kenny.nl', { font: '30px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);

        this.add.text(640, 340, 'Controls', { font: '60px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(640, 420, 'Move Left: A Key', { font: '30px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(640, 470, 'Move Right: D Key', { font: '30px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(640, 520, 'Shoot: SPACE Key', { font: '30px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);

        this.add.text(640, 650, 'Press M to return to title', { font: '40px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);

        this.titleScreen = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update(time, delta) {
        if (this.titleScreen.isDown) {
            this.scene.stop('Credits');
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