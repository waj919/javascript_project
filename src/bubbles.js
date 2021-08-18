export default class Bubbles {
    constructor(x, y , radius, velX, velY){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velY = velX;
        this.velX = velY;
        

    }

    draw(c){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false )
        c.fillStyle = 'hsl(203, 18%, 45%)';
        c.strokeStyle = 'black'
        c.fill();
        c.stroke();
        c.closePath()
    }

    move(){
        
        if (this.x - this.radius < 0|| this.x + this.radius > 1250 ){
            this.velX *= -1;
        } 
        if (this.y  < 0 || this.y + this.radius >= 600){
            this.velY *= -1; 
        }
        
        this.velY += .1;
        this.y += this.velY;
        this.x += this.velX;

    
    }


}