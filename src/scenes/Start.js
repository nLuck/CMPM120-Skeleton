export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.image('player_sprite', 'assets/playerShip2_blue.png');

    }

    create() {
        this.background = this.add.sprite(640, 320, 'background');
        this.player = this.add.sprite(640, 320, 'player');
        this.last_time = 0;

        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }

    update(time) {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;

        let speed = 50;
        
        if (this.leftKey.isDown) {
            this.player.x -= speed * dt;
        }
        if (this.rightKey.isDown) {
            this.player.x += speed * dt;
        }

    }
    
}
