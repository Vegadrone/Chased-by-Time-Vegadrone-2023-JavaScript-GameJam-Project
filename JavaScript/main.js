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

    //Canvas dimensions
    canvas.width = 1800;
    canvas.height = 540;

    
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 70;
            this.gameSpeed = 3;
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

            if (this.age > 20 ) {
                this.player.x--;
                this.monster.x--; 
            } else if (!this.player.checkCollision()){
                this.monster.x++;
            } else {
                this.monster.x = 0;
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
          this.clocks.push(new FlyingClock(this))          
        }
    }
   
    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function monsterCollisionCheck(){
        if (game.monster.x < game.player.x + game.player.width &&
            game.monster.x + game.monster.width > game.player.x &&
            game.monster.y < game.player.y + game.player.height &&
            game.monster.y + game.monster.height > game.player.y) {
            game.gameOverSound.play();
            game.music.pause();
            game.gameOver = true;
        }
    }

    //Age Count
    function ageCount(){ game.age++;}
    
    //GameLoop
    function animate(timeStamp){
            game.music.play();
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            setInterval(ageCount, 5000 - deltaTime);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.draw(ctx);
            game.update(deltaTime);     
            if(!game.gameOver){
                requestAnimationFrame(animate);
            } else {
                toggleScreen('start-screen', false);
                toggleScreen('gameScreen', false);
                toggleScreen('gameOver-screen', true);
                game.gameOver = false;
            }
            
    }
    //Visibility Screen Toggle
    function toggleScreen(id, toggle){
        let element = document.getElementById(id);
        let display = ( toggle ) ? 'block' : 'none';
        element.style.display = display;
    }
    
    function startGame() {
        //Starts GameLoop
        animate(0);
        toggleScreen('start-screen', false);
        toggleScreen('gameOver-screen', false);
        toggleScreen('gameScreen', true); 
    }

    document.getElementById("start-button").onclick = startGame;
    document.getElementById("retry-button").onclick = startGame;
    
})

