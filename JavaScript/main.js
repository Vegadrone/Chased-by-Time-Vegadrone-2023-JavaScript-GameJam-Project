import { Player } from "./player.js";
import { Monster } from "./monster.js";
import { InputHandler } from "./input.js";

window.addEventListener('load', function(){
    //Canvas Set Up
    const canvas = document.getElementById("gameScreen");
    const ctx = canvas.getContext('2d');

    //Canvas dimensions
    canvas.width = 1300;
    canvas.height = 600;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.monster = new Monster(this);
            this.input = new InputHandler();

        }

        update(){
        //Game calculations e framecount
            this.player.update(this.input.keys);
            this.monster.update();
        }

        draw(context){
        //draw of score, character and more
            this.player.draw(context);  
            this.monster.draw(context);  
        }
    }

    const game = new Game(canvas.width, canvas.height);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);
        game.update();
        requestAnimationFrame(animate);
    }
    animate();
});