export class InputHandler {
    constructor() {
        this.keys = []
        window.addEventListener('keydown', e => {
            if (
                e.key === 'a' && this.keys.indexOf(e.key) === -1 ||
                e.key === 'd' && this.keys.indexOf(e.key) === -1 ||
                e.key === 's' && this.keys.indexOf(e.key) === -1 ||
                e.key === ' ' && this.keys.indexOf(e.key) === -1
            ) {
                this.keys.push(e.key);
            }
            console.log(this.keys, e.key);
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
            console.log(this.keys, e.key);
        })
    }
}