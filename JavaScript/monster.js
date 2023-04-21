export class Monster {
    constructor(game) {
        //Point to the whole game object
        this.game = game;
        //MonsterDimension Dimensions
        this.width = 250;
        this.height = 400;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('monster');
        //Sprite animation values
        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;
        this.staggerFrame = 8;
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