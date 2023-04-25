export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = []
        window.addEventListener('keydown', e => {
            if (
                e.key === 'a' && this.keys.indexOf(e.key) === -1 ||
                e.key === 'd' && this.keys.indexOf(e.key) === -1 ||
                e.key === 's' && this.keys.indexOf(e.key) === -1 ||
                e.key === ' ' && this.keys.indexOf(e.key) === -1
            ) {
                this.keys.push(e.key);
            } else if (e.key === 'p') {
                this.game.debug = !this.game.debug;
            }
           
        })

        window.addEventListener('keyup', e => {
            if (
                e.key === 'a' ||
                e.key === 'd' ||
                e.key === 's' ||
                e.key === ' '
            ) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
       
        })
    }
}