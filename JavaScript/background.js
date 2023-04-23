class Background {
    constructor(game){
          //Point to the whole game object
          this.game = game;
          //Background Dimension
          this.width = 250;
          this.height = 400;
          this.x = 30;
          this.y = this.game.height - this.height;
          this.image = document.getElementById('layer-1');
    }
}