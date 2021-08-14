export default class Ammo {
    constructor(x, y){
        this.x = x;
        this.y = y;

    }

    draw(c){
        c.beginPath();
        c.arc(this.x, this.y, 5, 0, Math.PI * 2, false )
        c.fillStyle = 'yellow';
        c.strokeStyle = 'yellow'
        c.fill();
        c.stroke();
    }

    update(){
        this.y -= 2;
    }
}