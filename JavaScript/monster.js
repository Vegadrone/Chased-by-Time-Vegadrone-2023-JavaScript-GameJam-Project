export class Monster {
    constructor(game) {
        //Point to the whole game object
        this.game = game;
        //Player Dimensions
        this.width = 200;
        this.height = 400;
        //This put the sprite in the middle of the canvas at the bottom
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player');
        //Sprite animation values
        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;
        this.staggerFrame = 5;
        //Sound Effects
    }

    update() {
        //Sprite Animation             
        if (this.gameFrame % this.staggerFrame == 0) {
            if (this.frameX < 7) this.frameX++;
            else this.frameX = 0;
        };
        this.gameFrame++;
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
            this.width, this.height, this.x, this.y, this.width, this.height);

    }
}