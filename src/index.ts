import chick from '../assets/images/chick.png';
import duck from '../assets/images/duck.png';
import owl from '../assets/images/owl.png';
import parrot from '../assets/images/parrot.png';
import pixel from '../assets/images/pixel.png';
import { MainView } from './MainView';

class Game extends PIXI.Application {
    public constructor() {
        super({ resizeTo: window, backgroundColor: 0xcdcdcd });
        document.body.appendChild(this.view);
        this.loader
            .add('chick', chick)
            .add('duck', duck)
            .add('owl', owl)
            .add('parrot', parrot)
            .add('pixel', pixel)
            .load(() => {
                this.stage.addChild(new MainView());
            });
    }
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const game = new Game();
        window.game = game;
    }
};
