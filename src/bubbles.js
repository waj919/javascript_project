
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
        c.fillStyle = 'red';
        c.strokeStyle = 'red'
        c.fill();
        c.stroke();
        c.closePath()
    }

    move(){

        if (this.x < 137 || this.x > 1125 ){
            this.velX *= -1;
        } 
        if (this.y  < 0 || this.y >= 475){
            this.velY *= -1; 
        }
        this.velY += .1;
        this.y += this.velY;
        this.x += this.velX;

    
    }


}