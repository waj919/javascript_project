export const checkPlayerCollision = function(bubble, player){
    
    let endX = player.x + 15 + player.width + 30;
    let endY = player.y + player.height + 40;
    
    let centerX = (player.x + endX) / 2;
    let centerY = (player.y +endY) / 2;
    
    let diffX =centerX - bubble.x
    let diffY = centerY - bubble.y
    
    let dist = Math.sqrt((diffX ** 2) + (diffY ** 2))
    
    if (dist < bubble.radius+40) return true;
    else return false;
}

export const ammoCollision = function (ammo, bubble){
    
    let diffX =ammo.x - bubble.x;
    
    let diffY = bubble.y - ammo.y;
    
    let dist = Math.sqrt((diffX ** 2) + (diffY ** 2))
    
    if (dist < bubble.radius ) return true;
    else return false;
    
}


export const drawInfo = function(score, lives, c){
    c.font = '30px OCR A Std, monospace';
    c.fillStyle = 'black'
    c.fillText(`Score: ${score}`, 1030, 50);

    c.fillStyle = 'white'
    c.fillText(`Score: ${score}`, 1035, 50);


    c.font =  '30px OCR A Std, monospace';
    c.fillStyle = 'hsl(45, 95%, 58%)'
    c.fillText('Lives: ' + lives.length, 150 ,50)
}









