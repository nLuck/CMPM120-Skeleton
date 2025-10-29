import { Bullet } from './Bullet.js';

export class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, texture, speed, canYoyo = true, canFire = true) {
        super(scene, path, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.speed = speed || 1;
        this.startFollow({
            positionOnPath: true,
            duration: Math.max(1000, 10000 / this.speed),
            repeat: -1,
            rotateToPath: false,
            yoyo: canYoyo
        });

        if (canFire) this.scheduleNextShot();
    }

    scheduleNextShot() {
        const delay = Phaser.Math.Between(3000, 8000);
        if (this.shootTimer) this.shootTimer.remove(false);
        this.shootTimer = this.scene.time.delayedCall(delay, this.shoot, [], this);
    }

    shoot() {
        try {
            const proj = new Bullet(this.scene, this.x, this.y + (this.height / 2) + 8, 'projectile', 90, 200);
            if (proj && proj.setAngle) proj.setAngle(180);
            const sc = this.scene;
            if (sc && sc.enemyProjectiles) sc.enemyProjectiles.push(proj);
            if (sc && sc.enemyProjectilesGroup) sc.enemyProjectilesGroup.add(proj);
        } catch (err) {

        }

        this.scheduleNextShot();
    }

    update(time, delta) {
        
    }

    destroy(fromScene) {
        try {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
                this.shootTimer = null;
            }
        } catch (e) {

        }

        super.destroy(fromScene);
    }
}