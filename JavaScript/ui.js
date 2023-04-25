export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 12;
        //If you want to use a googlefonts linked it in the index.html and use the family name here
        this.fontFamily = 'Helvetica';
    }
    draw(context){
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText("Score: " + this.game.score , 20, 50);
    }
}