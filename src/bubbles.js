export default class Bubbles {
    constructor(x, y , radius, velX, velY){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velY = velY;
        this.velX = velX;
        this.damping = .98;
        this.gravity = 0.07;
        // this.traction = 0.8;

        

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
    
        if (this.x + this.radius >= 1250) {
            this.velX = -this.velX * this.damping;
            this.x = 1250 - this.radius;
          } else if (this.x - this.radius <= 0) {
            this.velX = -this.velX * this.damping;
            this.x = this.radius;
          }
          if (this.y + this.radius >= canvas.height) {
            this.velY = -this.velY * this.damping;
            this.y = canvas.height - this.radius;
            // traction here
            // this.velX *= this.traction;
          } else if (this.y - this.radius <= 0) {
            this.velY = -this.velY * this.damping;
            this.y = this.radius;
          }

          
        
          this.velY += this.gravity; 
        
          this.x += this.velX;
          this.y += this.velY;


    }


}