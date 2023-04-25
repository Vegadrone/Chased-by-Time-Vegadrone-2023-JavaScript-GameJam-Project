export class Player {
    constructor(game){
        //Point to the whole game object
        this.game = game;
        //Player Dimensions
        this.width = 100;
        this.height = 150;
        //Player Position
        this.x = this.game.width /2 - this.width /2;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('player2');
        //Sprite animation values
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 7;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        //Horizontal movement values
        this.movementSpeed = 0;
        this.maxMovementSpeed = 4;
        this.lowerMovementSpeed = -2;
        //Vertical movement values
        this.verticalVelocity = 0;
        this.gravity = 1;
        //Sound Effects
        this.sound = new Audio();
        this.sound.src = '../assets/jump.flac';
        this.runSound = new Audio();
        this.runSound.src = '../assets/fastrunning-6306.mp3';
    }

    update(input, deltaTime){
        this.checkCollision();
        //Horizontal input handling
        if (input.includes('d')) this.movementSpeed = this.maxMovementSpeed;
        else if (input.includes('a')) this.movementSpeed = this.lowerMovementSpeed;
        else this.movementSpeed = 0;

        //Horizontal Movement
        this.x += this.movementSpeed //this.runSound.play();
       

        //Set L and R boundries
        if (this.x < 0) this.x = 0;
        else if (this.x > this.game.width - this.width){
            this.x = this.game.width - this.width;
        }

        //Vertical input handling
        if (input.includes(' ') && this.onGround()) this.verticalVelocity = -22,  this.sound.play();

        //Vertical Movement
        this.y += this.verticalVelocity;
        if (!this.onGround()){
            this.verticalVelocity += this.gravity;
        } else if (this.y > this.game.height - this.height){
            this.y = this.game.height - this.height;
        } else this.verticalVelocity = 0;

        //Sprite Animation             
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    draw(context){
        //debug mode, see collision hitbox
        if (this.game.debug) {
            //this draw a rectangle with only the border visible
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
            this.width, this.height, this.x, this.y, this.width, this.height);
        
    }

    //This function check if the player is on ground
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    //Cheking player clock collision
    checkCollision(){
        this.game.clocks.forEach(clock => {
            if (clock.x < this.x + this.width &&
                clock.x + clock.width > this.x &&
                clock.y < this.y + this.height &&
                clock.y + clock.height > this.y) {
                //collision is detected
                clock.markedForDeletion = true;
                this.game.score++; 
            } else {
                //no collision
            }
        });
    }
}