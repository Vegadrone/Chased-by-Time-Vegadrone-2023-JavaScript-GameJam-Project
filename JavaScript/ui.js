export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 50;
        //If you want to use a googlefonts linked it in the index.html and use the family name here
        this.fontFamily = 'Silkscreen';
        
    }
    draw(context){
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText("AGES: " + this.game.age , 790, 50);
    }
}