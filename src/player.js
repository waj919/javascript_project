
export default class Player {
    constructor(){
        this.x = 600;
        this.y = 500;
        this.width = 40;
        this.height = 56;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 2;
        this.moving = false
        this.keys = [];
        this.weaponX = this.x;
        this.weaponY = this.y;
        this.shoot = false
        
        this.sprite = new Image();
        this.sprite.src = ('./src/images/hulk.png')
        
        addEventListener('keydown', function(e){
            this.keys[e.key] = true;
            if (this.keys[" "]) this.shoot = true
            
        }.bind(this))
        
       addEventListener('keyup', function(e){
            delete this.keys[e.key];
            this.moving = false;
            this.frameY = 3;
            
        }.bind(this))
        
    }
    
    move(){ 
        if (this.keys["ArrowLeft"] && this.x > 0){
            this.x -= this.speed
            this.frameY = 1
            this.moving = true;
        }
        if (this.keys['ArrowRight'] && this.x < 1200){
            this.x += this.speed
            this.frameY = 2
            this.moving = true  ;
        }
        
    }

    handleSpriteFrame() {
        if (this.frameX < 3 && this.moving){
            this.frameX++;
        } else {
            this.frameX = 0
        }
    }

    draw(c){
        
        c.drawImage(
            this.sprite, 
            this.width * this.frameX,
            this.height * this.frameY,
            this.width,
            this.height, 
            this.x, 
            this.y, 
            100, 
            100
        );      
       
    }

}