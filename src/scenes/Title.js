import { Enemy } from "../gameobjects/Enemy.js";

export class Title extends Phaser.Scene {

    constructor() {
        super('Title');
    }

    preload() {
        this.load.image('title_background', 'assets/black.png');
        this.load.image('player_sprite', 'assets/playerShip2_blue.png');
    }

    create() {
        const width = this.scale.width;
        this.makeBackground('title_background');

        this.path1 = this.add.path(width / 2, 780).lineTo(width / 2, -60);
        this.path2 = this.add.path(width*0.25, 780).lineTo(width*0.25, -60);
        this.path3 = this.add.path(width*0.75, 780).lineTo(width*0.75, -60);

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(2, 0xff0000, 1);

        new Enemy(this, this.path1, 0, 0, 'player_sprite', 2, false, false);
        new Enemy(this, this.path2, 0, 0, 'player_sprite', 1.5, false, false);
        new Enemy(this, this.path3, 0, 0, 'player_sprite', 1, false, false);

        this.add.text(640, 280, 'Space Shooter', { font: '80px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        this.add.text(640, 360, 'press ENTER to start game', { font: '40px Arial', fill: '#ffffff' }).setOrigin(0.5, 0.5);

        this.startGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(time, delta) {
        let dt = delta / 1000;

        if (this.startGame.isDown) {
            this.scene.stop('Title');
            this.scene.start('Start');
        }

        if (true) {
            this.graphics.clear()
            this.graphics.lineStyle(2, 0xff0000, 1);
            this.path1.draw(this.graphics);
            this.path2.draw(this.graphics);
            this.path3.draw(this.graphics);
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