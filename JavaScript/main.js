import { Player } from "./player.js";
import { Monster } from "./monster.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingClock, GroundClock } from "./clock.js";
import { UI } from "./ui.js"; 


window.addEventListener('load', function(){
    //Canvas Set Up
    const canvas = document.getElementById("gameScreen");
    const ctx = canvas.getContext('2d');
    //prvent the right click on canvas
    // document.addEventListener("contextmenu", (event) => {
    //     event.preventDefault();
    //  });
    //Canvas dimensions
    canvas.width = 1800;
    canvas.height = 540;

    
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 70;
            this.gameSpeed = 5;
            this.background = new Background(this);
            this.player = new Player(this);
            this.monster = new Monster(this);
            this.input = new InputHandler(this);
            this.gameOver = false;
            //UI
            this.UI = new UI(this);
            this.fontColor = 'orange';
            this.age = 0;
            //Clocks timer values
            this.clockTimer = 0;
            this.clockInterval = 1500;
            this.clocks = [];
            //debug mode
            this.debug = true;
            //sound
            this.music = new Audio();
            this.music.src = '../assets/general music.wav';
            this.gameOverSound = new Audio();
            this.gameOverSound.src = '../assets/lose-sound.wav';

        }
        
        update(deltaTime){
            monsterCollisionCheck();
            //Game calculations e framecount
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            this.monster.update(deltaTime);
            //Clocks Update
            if (this.clockTimer > this.clockInterval) {
                this.addClock();
                this.clockTimer = 0;
            } else{
                this.clockTimer += deltaTime;
            }
            this.clocks.forEach(clock =>{
                clock.update(deltaTime);
                if (clock.markedForDeletion) {
                    this.clocks.splice(this.clocks.indexOf(clock), 1);
                }
            })
        
            if (this.age > 2) {
                this.player.x--;
                this.monster.x++; 
            }
        }
        
        draw(context){
            //draw of score, character and more
            this.background.draw(context);
            this.player.draw(context);  
            this.clocks.forEach(clock => {
                clock.draw(context);
            })
            this.monster.draw(context);
            this.UI.draw(context);
        } 

        addClock(){
            //add chance to spawn clock
            if (Math.random() < 0.5) {
                this.clocks.push(new GroundClock(this)); 
            }
            if (Math.random() < 0.5) {
                this.clocks.push(new FlyingClock(this));
            }        
        }
    }
   
    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

     //Age Count
     function ageCount() {
         game.age++;
     }
     setInterval(ageCount, 2000);

    function monsterCollisionCheck(){
        if (game.monster.x < game.player.x + game.player.width -50 &&
            game.monster.x + game.monster.width > game.player.x + 60 &&
            game.monster.y < game.player.y + game.player.height &&
            game.monster.y + game.monster.height > game.player.y) {
            game.gameOverSound.play();
            game.music.pause();
            game.gameOver = true;
        }
    }

    //GameLoop
    function animate(timeStamp){
            game.music.play();
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.draw(ctx);
            game.update(deltaTime);     
            if(!game.gameOver){
                requestAnimationFrame(animate);
            } 
    }
    //Start GameLoop
    animate(0);
})

