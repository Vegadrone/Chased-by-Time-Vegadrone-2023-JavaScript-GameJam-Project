export class Monster {
    constructor(game) {
        //Point to the whole game object
        this.game = game;
        //MonsterDimension Dimensions
        this.width = 250;
        this.height = 400;
        //Monster Position
        this.x = 30;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('monster');
        //Sprite animation values
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 7;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        //Sound Effects
    }

    update(deltaTime) {
          if (this.frameTimer > this.frameInterval) {
              this.frameTimer = 0;
              if (this.frameX < this.maxFrame) this.frameX++;
              else this.frameX = 0;
          } else {
              this.frameTimer += deltaTime;
          }
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
            this.width, this.height, this.x, this.y, this.width, this.height);

    }
}