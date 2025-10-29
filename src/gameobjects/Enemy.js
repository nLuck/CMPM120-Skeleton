import { Bullet } from './Bullet.js';

export class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, texture, speed, canYoyo = true, canFire = true) {
        super(scene, path, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // keep a stable reference to the scene in case Phaser internals shadow `scene`
        this.scene = scene;
        this.speed = speed || 1;

        // follow the path continuously
        this.startFollow({
            positionOnPath: true,
            duration: Math.max(1000, 10000 / this.speed),
            repeat: -1,
            rotateToPath: false,
            yoyo: canYoyo
        });

        // schedule first shot
        if (canFire) this.scheduleNextShot();
    }

    scheduleNextShot() {
        // random delay between 3 and 8 seconds
        const delay = Phaser.Math.Between(3000, 8000);
        if (this.shootTimer) this.shootTimer.remove(false);
        this.shootTimer = this.scene.time.delayedCall(delay, this.shoot, [], this);
    }

    shoot() {
        // create projectile moving downward (90 degrees)
        try {
            const proj = new Bullet(this.scene, this.x, this.y + (this.height / 2) + 8, 'projectile', 90, 200);
            // rotate projectile texture 180 degrees so it visually points downward
            if (proj && proj.setAngle) proj.setAngle(180);
            // register projectile with scene groups/arrays if they exist
            const sc = this.scene;
            if (sc && sc.enemyProjectiles) sc.enemyProjectiles.push(proj);
            if (sc && sc.enemyProjectilesGroup) sc.enemyProjectilesGroup.add(proj);
        } catch (err) {
            // fallback: ignore if Bullet class not available
            // console.warn('Enemy shoot failed', err);
        }

        // schedule next shot
        this.scheduleNextShot();
    }

    update(time, delta) {
        
    }

    destroy(fromScene) {
        // cancel any pending shoot timer so dead enemies don't keep firing
        try {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
                this.shootTimer = null;
            }
        } catch (e) {
            // ignore
        }

        // call parent destroy
        super.destroy(fromScene);
    }
}