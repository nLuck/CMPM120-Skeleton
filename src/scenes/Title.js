export class Title extends Phaser.Scene {

    constructor() {
        super('Title');
    }

    preload() {

    }

    create() {
        this.startGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(time, delta) {
        let dt = delta / 1000;

        if (this.startGame.isDown) {
            this.scene.stop('Title');
            this.scene.start('Start');
        }
    }
}