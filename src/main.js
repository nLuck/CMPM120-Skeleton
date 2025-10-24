import { Start } from './scenes/Start.js';
import { Bullet } from './scripts/bullet.js';

const config = {
    type: Phaser.AUTO,
    title: 'CMPM 120 Project Skeleton',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    physics: { default: 'arcade' },
    scene: [
        Start, Bullet
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            