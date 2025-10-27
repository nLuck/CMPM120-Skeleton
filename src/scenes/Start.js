import { Bullet } from "../gameobjects/Bullet.js";
import { Enemy } from "../gameobjects/Enemy.js";

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.image('player_sprite', 'assets/playerShip2_blue.png');
        this.load.image('bullet', 'assets/lasers/laserBlue01.png');

        this.load.image('enemy1', 'assets/enemies/enemyRed1.png');
        this.load.image('enemy2', 'assets/enemies/enemyGreen1.png');
        this.load.image('projectile', 'assets/lasers/laserRed01.png');

        this.load.audio('shoot_sound', 'assets/sounds/sfx_laser1.ogg');
    }

    create() {
        const width = this.scale.width;
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(2, 0xff0000, 1);
        this.graphics.setDepth(1000);

        this.background = this.add.sprite(640, 320, 'background');
        this.player = this.add.sprite(640, 640, 'player_sprite');
        this.physics.add.existing(this.player);
        if (this.player.body) {
            this.player.body.setAllowGravity(false);
            this.player.body.setImmovable(true);
        }
        this.shootSound = this.sound.add('shoot_sound');

        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.bulletsGroup = this.physics.add.group();
        this.enemiesGroup = this.physics.add.group();
        this.enemyProjectilesGroup = this.physics.add.group();

        this.leftPath1 = this.add.path(-80, 120).lineTo(width + 80, 120);
        this.leftPath2 = this.add.path(-80, 220).lineTo(width + 80, 220);
        this.rightPath1 = this.add.path(width + 80, 360).lineTo(-80, 360);
        this.rightPath2 = this.add.path(width + 80, 460).lineTo(-80, 460);
        this.horizontalPaths = [this.leftPath1, this.leftPath2, this.rightPath1, this.rightPath2];

        this.circlePath1 = new Phaser.Curves.Path();
        this.circlePath1.add(new Phaser.Curves.Ellipse(width / 2, 0, 320, 320, -20, 200));
        this.circlePath2 = new Phaser.Curves.Path();
        this.circlePath2.add(new Phaser.Curves.Ellipse(width / 2, 0, 480, 480, -20, 200));
        this.circularPaths = [this.circlePath1, this.circlePath2];

        this.baseEnemyCount = 4;

        this.physics.add.overlap(this.bulletsGroup, this.enemiesGroup, (bulletObj, enemyObj) => {
            if (bulletObj && bulletObj.destroy) bulletObj.destroy();
            if (enemyObj && enemyObj.destroy) enemyObj.destroy();
        }, null, this);

        // enemy projectiles -> player overlap
        // defensive: determine which object is the projectile before destroying it so we never destroy the player
        this.physics.add.overlap(this.enemyProjectilesGroup, this.player, (a, b) => {
            let proj = null;
            if (a && a.texture && a.texture.key === 'projectile') proj = a;
            else if (b && b.texture && b.texture.key === 'projectile') proj = b;

            if (proj && proj.destroy) proj.destroy();
            // apply damage to the player (explicitly this.player)
            this.playerTakeDamage();
        }, null, this);

        this.initialize();
    }

    initialize() {
        this.player.hp = 10;
        this.hpText = this.add.text(16, 16, `HP: ${this.player.hp}`, { font: '20px Arial', fill: '#ffffff' });
        this.hpText.setScrollFactor(0);

        this.player.speed = 250;
        this.player.canfire = true;
        this.player.fireRate = 500;

        this.bullets = [];
        this.enemies = [];
        this.enemyProjectiles = [];

        this.bulletsGroup.clear();
        this.enemiesGroup.clear();
        this.enemyProjectilesGroup.clear();

        this.nextHPath = 0;
        this.nextCPath = 0;

        this.wave = 1;
        this.spawnQueue = { enemy1: 0, enemy2: 0 };

        this.waveTimer = this.time.addEvent({
            delay: 800,
            callback: () => {
                this.startWave();
            },
            callbackScope: this,
            loop: true
        });
    }

    startWave() {
        if (this.enemies.length > 0) {
            return;
        }

        console.log(`Starting wave ${this.wave}`);
        const total = this.baseEnemyCount * this.wave;

        this.spawnQueue.enemy1 = total / 2;
        this.spawnQueue.enemy2 = total / 2;

        for (let i = 0; i < total / 2; i++) {
            const p = this.horizontalPaths[this.nextHPath];
            this.nextHPath = (this.nextHPath + 1) % this.horizontalPaths.length;
            const e = new Enemy(this, p, -80, 0, 'enemy1', Phaser.Math.FloatBetween(1, 4));
            this.enemies.push(e);
            this.enemiesGroup.add(e);
            this.spawnQueue.enemy1 -= 1;
        }
        for (let i = 0; i < total / 2; i++) {
            const p = this.circularPaths[this.nextCPath];
            this.nextCPath = (this.nextCPath + 1) % this.circularPaths.length;
            const e = new Enemy(this, p, 0, 0, 'enemy2', Phaser.Math.FloatBetween(1, 4));
            this.enemies.push(e);
            this.enemiesGroup.add(e);
            this.spawnQueue.enemy2 -= 1;
        }

        this.wave += 1;
    }

    update(time, delta) {
        let dt = delta / 1000;
        
        if (this.leftKey.isDown && this.player.x > 0) {
            this.player.x -= this.player.speed * dt;
        }
        if (this.rightKey.isDown && this.player.x < 1280) {
            this.player.x += this.player.speed * dt;
        }
        if (this.shootKey.isDown && this.player.canfire) {
            this.player.canfire = false;
            this.spawnBullet();

            this.time.delayedCall(this.player.fireRate, () => { this.player.canfire = true; }, [], this);
        }

        this.checkBullets(time, delta);
        this.checkEnemies(time, delta);
        this.checkEnemyProjectiles(time, delta);

        this.drawGraphics(true);
    }
    
    playerTakeDamage() {
        this.player.hp -= 1;
        this.hpText.setText(`HP: ${this.player.hp}`);

        this.player.tint = 0xff0000;
        this.time.delayedCall(500, () => { this.player.tint = 0xffffff; });
    }

    spawnBullet() {
        const x = this.player.x;
        const y = this.player.y - (this.player.height / 2) - 8;
        const bullet = new Bullet(this, x, y, 'bullet', -90, 300);
        this.bullets.push(bullet);
        this.bulletsGroup.add(bullet);
        if (this.shootSound) this.shootSound.play();
    }

    checkBullets(time, delta) {
        if (!this.bullets) return;
        for (let i = this.bullets.length - 1; i >= 0; --i) {
            const b = this.bullets[i];
            if (!b.scene || !b.active) {
                this.bullets.splice(i, 1);
                continue;
            }
            b.update(time, delta);
        }
    }

    checkEnemies(time, delta) {
        if (!this.enemies) return;
        for (let i = this.enemies.length - 1; i >= 0; --i) {
            const e = this.enemies[i];
            if (!e.scene || !e.active) {
                this.enemies.splice(i, 1);
                continue;
            }
            e.update(time, delta);
        }
    }

    checkEnemyProjectiles(time, delta) {
        if (!this.enemyProjectiles) return;
        for (let i = this.enemyProjectiles.length - 1; i >= 0; --i) {
            const p = this.enemyProjectiles[i];
            if (!p.scene || !p.active) {
                this.enemyProjectiles.splice(i, 1);
                continue;
            }
            p.update(time, delta);
        }
    }

    drawGraphics(toggle) {
        if (!toggle) return;

        this.graphics.clear();
        this.graphics.lineStyle(2, 0xff0000, 1);
        
        for (let p of this.horizontalPaths) {
            p.draw(this.graphics);
        }
        for (let p of this.circularPaths) {
            p.draw(this.graphics);
        }
    }
}