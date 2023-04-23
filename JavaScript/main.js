import { Player } from "./player.js";
import { Monster } from "./monster.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";

window.addEventListener('load', function(){
    //Canvas Set Up
    const canvas = document.getElementById("gameScreen");
    const ctx = canvas.getContext('2d');

    //Canvas dimensions
    canvas.width = 2400;
    canvas.height = 720;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.gameSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.monster = new Monster(this);
            this.input = new InputHandler();

        }

        update(deltaTime){
        //Game calculations e framecount
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            this.monster.update(deltaTime);
        }

        draw(context){
        //draw of score, character and more
            this.background.draw(context);
            this.player.draw(context);  
            this.monster.draw(context);  
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);
        game.update(deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
});