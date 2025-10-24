import { Bullet } from "../scripts/bullet";

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.image('player_sprite', 'assets/playerShip2_blue.png');
        this.load.image('bullet', 'assets/laserBlue01.png');

        this.load.image('enemy1', 'assets/enemyRed1.png');
        this.load.image('enemy2', 'assets/enemyGreen1.png');
        this.load.image('enemy3', 'assets/enemyBlack1.png');

        this.load.audio('shoot_sound', 'assets/sfx_laser1.ogg');

    }

    create() {
        this.background = this.add.sprite(640, 320, 'background');
        this.player = this.add.sprite(640, 320, 'player_sprite');
        
        this.bullets = [];

        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.shootSound = this.sound.add('shoot_sound');

        this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => { this.spawnBullet(); }
        });
    }

    update(time, delta) {
        let dt = delta / 1000;

        let speed = 50;
        
        if (this.leftKey.isDown) {
            this.player.x -= speed * dt;
        }
        if (this.rightKey.isDown) {
            this.player.x += speed * dt;
        }
        // update bullets and purge destroyed ones
        for (let i = this.bullets.length - 1; i >= 0; --i) {
            const b = this.bullets[i];
            if (!b.scene || !b.active) {
                // already destroyed or removed
                this.bullets.splice(i, 1);
                continue;
            }
            b.update(time, delta);
        }
    }
    
    spawnBullet() {
        const x = this.player.x;
        const y = this.player.y - (this.player.height / 2) - 8;
        const bullet = new Bullet(this, x, y, 'bullet', -90, 300);
        this.bullets.push(bullet);
        if (this.shootSound) this.shootSound.play();
    }
}
