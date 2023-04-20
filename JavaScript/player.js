export class Player {
    constructor(game){
        //Point to the whole game object
        this.game = game;
        //Player Dimensions
        this.width = 200;
        this.height = 200;
        //This put the sprite in the middle of the canvas at the bottom
        this.x = this.game.width /2 - this.width /2;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player');
        //Sprite animation values
        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;
        this.staggerFrame = 5;
        //Horizontal movement values
        this.movementSpeed = 0;
        this.maxMovementSpeed = 4;
        this.lowerMovementSpeed = -2;
        //Vertical movement values
        this.verticalVelocity = 0;
    }

    update(input){
        //input handling
        if (input.includes('d')) this.movementSpeed = this.maxMovementSpeed;
        else if (input.includes('a')) this.movementSpeed = this.lowerMovementSpeed;
        else this.movementSpeed = 0;

        //Horizontal Movement
        this.x += this.movementSpeed;
        //Set L and R boundries
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > this.game.width - this.width){
            this.x = this.game.width - this.width;
        }

        //Sprite Animation             
        if (this.gameFrame % this.staggerFrame == 0) {
            if (this.frameX < 7) this.frameX++;
            else this.frameX = 0;
        };
        this.gameFrame++;
    }

    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
            this.width, this.height, this.x, this.y, this.width, this.height);
        
    }
}