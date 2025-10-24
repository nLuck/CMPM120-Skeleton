export class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, which, direction, speed) {
        super(scene, x, y, which);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.speed = speed;
        this.direction = Phaser.Math.DegToRad(direction);
    }

    update(time, delta) {
        this.y -= this.speed * (delta / 1000);
        if (this.y < 0) {
            this.destroy();
        }
    }
}