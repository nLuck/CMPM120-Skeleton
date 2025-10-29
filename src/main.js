import { Title } from './scenes/Title.js';
import { Start } from './scenes/Start.js';
import { GameOver } from './scenes/GameOver.js';
import { Credits } from './scenes/Credits.js';

const config = {
    type: Phaser.AUTO,
    title: 'Space Shooter',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    physics: { default: 'arcade' },
    scene: [
        Title, Start, GameOver, Credits
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            