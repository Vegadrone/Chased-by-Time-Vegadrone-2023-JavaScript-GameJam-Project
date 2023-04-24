
class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    
    update(){
        if (this.x < -this.width) this.x = 0;
        else this.x -= this.game.gameSpeed * this.speedModifier;  
    }
    
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        //Point to the whole game object
        this.game = game;
        //Background Dimension
        this.imgWidth = 1800;
        this.imgHeight = 540;
        this.layer5image = document.getElementById('layer5');
        this.layer4image = document.getElementById('layer4');
        this.layer2image = document.getElementById('layer2');
        this.layer3image = document.getElementById('layer3');
        this.layer1image = document.getElementById('layer1');
        this.layer1 = new Layer(this.game, this.imgWidth, this.imgHeight, 1.5, this.layer5image);
        this.layer2 = new Layer(this.game, this.imgWidth, this.imgHeight, 0.6, this.layer4image);
        this.layer3 = new Layer(this.game, this.imgWidth, this.imgHeight, 1, this.layer2image);
        this.layer4 = new Layer(this.game, this.imgWidth, this.imgHeight, 0.4, this.layer3image);
        this.layer5 = new Layer(this.game, this.imgWidth, this.imgHeight, 0, this.layer1image);
        this.backgroundLayers = [this.layer5, this.layer4, this.layer2, this.layer3, this.layer1];
    }

    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
    
        })
    }

    draw(context){
        this.backgroundLayers.forEach(layer =>{
            layer.draw(context);
        })
    }
}