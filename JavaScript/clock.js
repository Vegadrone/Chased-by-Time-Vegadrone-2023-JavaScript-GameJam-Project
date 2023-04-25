class Clock {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }

    update(deltaTime){
    //movement
        this.x -= this.speedX + this.game.gameSpeed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        } else {
            this.frameTimer += deltaTime;
        }
        //if clocks are off Screen
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(context){
        if (!this.game.debug) {
            //this draw a rectangle with only the border visible
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class FlyingClock extends Clock {
    constructor(game){
        super();
        this.game = game;
        this.width = 80;
        this.height = 60 ;
        //With random are spredding randomly between them
        this.x = this.game.width + Math.random() * this.game.width * 1;
        //With random are spredding randomly at varipus heights
        this.y = 50 +  Math.random() * this.game.height * 0.5;
        //With random they move at different speed
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('clock');
        //for wabbly movement
        this.angle = 0;
        this.velocityOfAngle = Math.random() * 0.1 + 0.1;
    }
    
    update(deltaTime){
        super.update(deltaTime);
        //for wabbly movement
        this.angle += this.velocityOfAngle;
        this.y += Math.sin(this.angle);
    }
}

export class GroundClock extends Clock {
    constructor(game){
        super();
        this.game = game;
        this.width = 80;
        this.height = 60;
        this.x = this.game.width + Math.random() * this.game.width * 1;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('clock2');
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
    }
}