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
        const dt = delta / 1000;

        this.x += Math.cos(this.direction) * this.speed * dt;
        this.y += Math.sin(this.direction) * this.speed * dt;

        const w = this.scene.scale.width;
        const h = this.scene.scale.height;
        const margin = 64;
        if (this.x < -margin || this.x > w + margin || this.y < -margin || this.y > h + margin) {
            this.destroy();
        }
    }
}