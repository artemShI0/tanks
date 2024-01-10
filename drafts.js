const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


export function drawPoint(point) {
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, point.radius, point.radius, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fillStyle = point.color;
    ctx.fill();
}

export function drawRect(rect) {
    ctx.beginPath();
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.fill();
}

export function drawCage(cage) {
    drawRect(cage.up);
    drawRect(cage.right);
    drawRect(cage.down);
    drawRect(cage.left);
}

//###########################################################################################################################################
//###########################################################################################################################################



export function touch(map, tankA, tankB){
    let pink = false;
    for(let i = 0; i < map.walls_goriz.length; ++i){
        if(tankA.x + tankA.width > map.walls_goriz[i][0].x && tankA.x < map.walls_goriz[i][0].x + map.walls_goriz[i][0].dx && 
            tankA.y + tankA.height > map.walls_goriz[i][0].y && tankA.y < map.walls_goriz[i][0].y + map.walls_goriz[i][0].dy){pink = true}
    }
    for(let i = 0; i < map.walls_vert.length; ++i){
        if(tankA.x + tankA.width > map.walls_vert[i][0].x && tankA.x < map.walls_vert[i][0].x + map.walls_vert[i][0].dx && 
            tankA.y + tankA.height > map.walls_vert[i][0].y && tankA.y < map.walls_vert[i][0].y + map.walls_vert[i][0].dy){pink = true}
    }
    if(tankA.x + tankA.height> tankB.x && tankA.x < tankB.x + tankB.width && tankA.y + tankA.height> tankB.y && tankA.y < tankB.y + tankB.height){pink = true}
    return pink;
}

export function touch_bullet(map, tankB, bullet){
    let pink = {};
    pink.touch = false;
    for(let i = 0; i < map.walls_goriz.length; ++i){
        if(bullet.x + bullet.width > map.walls_goriz[i][0].x && bullet.x < map.walls_goriz[i][0].x + map.walls_goriz[i][0].dx && 
            bullet.y + bullet.height > map.walls_goriz[i][0].y && bullet.y < map.walls_goriz[i][0].y + map.walls_goriz[i][0].dy){pink.touch = true;}
    }
    for(let i = 0; i < map.walls_vert.length; ++i){
        if(bullet.x + bullet.width > map.walls_vert[i][0].x && bullet.x < map.walls_vert[i][0].x + map.walls_vert[i][0].dx && 
            bullet.y + bullet.height > map.walls_vert[i][0].y && bullet.y < map.walls_vert[i][0].y + map.walls_vert[i][0].dy){pink.touch = true;}
    }
    if(bullet.x + bullet.width > tankB.x && bullet.x < tankB.x + tankB.width && bullet.y + bullet.height> tankB.y && bullet.y < tankB.y + tankB.height){pink.touch = true; pink.what = tankB.name}
    else{pink.name = 0;}
    return pink;
}


//###########################################################################################################################################
//###########################################################################################################################################


export function move1(tank, tankB, map) {
    if (tank.direction == 1) {
        tank.x += tank.dx;
        while(touch(map, tank, tankB)){
            tank.x -= 1;
        }
    }
    if (tank.direction == 3) {
        tank.x -= tank.dx;
        while(touch(map, tank, tankB)){
            tank.x += 1;
        }
    }
    if (tank.direction == 0) {
        tank.y -= tank.dy;
        while(touch(map, tank, tankB)){
            tank.y += 1;
        }
    }
    if (tank.direction == 2) {
        tank.y += tank.dy;
        while(touch(map, tank, tankB)){
            tank.y -= 1;
        }
    }
}

export function move2(rect, pressed, brick_white, a, b, c, d) {
    if (pressed["ArrowRight"] && rect.x < d - rect.width) {
        rect.x += rect.dx;
    }
    if (pressed["ArrowLeft"] && rect.x > a + brick_white.width) {
        rect.x -= rect.dx;
    }
    if (pressed["ArrowUp"] && rect.y > b - 9 + brick_white.height) {
        rect.y -= rect.dy;
    }
    if (pressed["ArrowDown"] && rect.y < c - rect.height) {
        rect.y += rect.dy;
    }
}






//###########################################################################################################################################
//###########################################################################################################################################

export function inside(rect, brick_white, a, b, c, d) {
    if (rect.x > d - rect.width) {
        rect.x = d - rect.width;
    }
    if (rect.x < a + brick_white.width) {
        rect.x = a + brick_white.width;
    }
    if (rect.y < b  + brick_white.height) {
        rect.y = b  + brick_white.height;
    }
    if (rect.y > c - rect.height) {
       rect.y = c - rect.height;
    }
}

export function pointStatus(point, mouse) {
    point.x = mouse.x;
    point.y = mouse.y;
    if (mouse.pressed) {
        point.color = "blue";
    } else {
        point.color = "red";
    }
}

//###########################################################################################################################################
//###########################################################################################################################################

export function drawOut(wall) {
    ctx.drawImage(wall.image, wall.up.x, wall.up.y, wall.up.width, wall.up.height);
    ctx.drawImage(wall.image, wall.down.x, wall.down.y, wall.down.width, wall.down.height);
    ctx.drawImage(wall.image, wall.left.x, wall.left.y, wall.left.width, wall.left.height);
    ctx.drawImage(wall.image, wall.right.x, wall.right.y, wall.right.width, wall.right.height);
}

//###########################################################################################################################################
//###########################################################################################################################################



function setwall_goriz(brick_white, x, y, dx){
    let wall_goriz = [];
    for(let i = 0; i < dx / brick_white.width; ++i){
        wall_goriz[i] = {}
        wall_goriz[i].x = x + i * brick_white.width;
        wall_goriz[i].y = y;
        wall_goriz[i].width = brick_white.width;
        wall_goriz[i].height = brick_white.height;
        wall_goriz[i].dx = dx;
        wall_goriz[i].dy = brick_white.height;
        wall_goriz[i].image = brick_white.white;
        wall_goriz[i].white = brick_white.white;
        wall_goriz[i].blue = brick_white.blue;
        wall_goriz[i].red = brick_white.red;
    }
    return wall_goriz;
}

function setwall_vert(brick_white, x, y, dy){
    let wall_vert = []
    for(let i = 0; i < dy / brick_white.height; ++i){
        wall_vert[i] = {};
        wall_vert[i].x = x;
        wall_vert[i].y = y + i * brick_white.height;
        wall_vert[i].width = brick_white.width;
        wall_vert[i].height = brick_white.height;
        wall_vert[i].dx = brick_white.width;
        wall_vert[i].dy = dy;
        wall_vert[i].image = brick_white.image;
        wall_vert[i].white = brick_white.white;
        wall_vert[i].blue = brick_white.blue;
        wall_vert[i].red = brick_white.red;
    }
    return wall_vert;
}


export function setmap1(walls_goriz, walls_vert, brick_white){
    walls_goriz[0] = setwall_goriz(brick_white, 10, 10, 1505);
    walls_goriz[1] = setwall_goriz(brick_white, 10, 660, 1505);
    walls_vert[0] = setwall_vert(brick_white, 10, 10, 665);
    walls_vert[1] = setwall_vert(brick_white, 1480, 10, 665);

    walls_goriz[2] = setwall_goriz(brick_white, 395, 330, 280);
    walls_goriz[3] = setwall_goriz(brick_white, 855, 330, 280);

    walls_vert[2] = setwall_vert(brick_white, 250, 225, 245);
    walls_vert[3] = setwall_vert(brick_white, 1255, 225, 245);
    walls_vert[4] = setwall_vert(brick_white, 740 , 100 , 175);
    walls_vert[5] = setwall_vert(brick_white, 740 , 425 , 175);
}

export function setmap2(walls_goriz, walls_vert, brick_white){
    walls_goriz[0] = setwall_goriz(brick_white, 10, 10, 1505);
    walls_goriz[1] = setwall_goriz(brick_white, 10, 660, 1505);
    walls_vert[0] = setwall_vert(brick_white, 10, 10, 665);
    walls_vert[1] = setwall_vert(brick_white, 1480, 10, 665);

    walls_goriz[2] = setwall_goriz(brick_white, 110, 290, 175);
    walls_goriz[3] = setwall_goriz(brick_white, 190, 510, 280);
    walls_goriz[4] = setwall_goriz(brick_white, 680, 350, 280);
    walls_goriz[5] = setwall_goriz(brick_white, 700, 500, 280);
    walls_goriz[6] = setwall_goriz(brick_white, 940, 105, 280);
    walls_goriz[7] = setwall_goriz(brick_white, 1145, 450, 70);
    walls_goriz[8] = setwall_goriz(brick_white, 1300, 450, 105);
    walls_goriz[9] = setwall_goriz(brick_white, 940, 105, 280);
    walls_goriz[10] = setwall_goriz(brick_white, 940, 105, 280);

    walls_vert[2] = setwall_vert(brick_white, 395, 200, 245);
    walls_vert[3] = setwall_vert(brick_white, 1050, 250, 245);
    walls_vert[4] = setwall_vert(brick_white, 150, 100, 140);
    walls_vert[5] = setwall_vert(brick_white, 640, 100, 175);
    walls_vert[6] = setwall_vert(brick_white, 540, 425, 175);
    walls_vert[7] = setwall_vert(brick_white, 800, 200, 70);
    walls_vert[8] = setwall_vert(brick_white, 835, 200, 70);
    walls_vert[9] = setwall_vert(brick_white, 850 , 590, 70);
    walls_vert[10] = setwall_vert(brick_white, 1245 , 200, 140);
    walls_vert[11] = setwall_vert(brick_white, 745 , 45, 35);

}




export function drawwalls(walls_goriz, walls_vert){
    for(let i = 0; i < walls_goriz.length; ++i){
        for(let j = 0; j < walls_goriz[i].length; ++j){
            ctx.drawImage(walls_goriz[i][j].image, walls_goriz[i][j].x, walls_goriz[i][j].y, walls_goriz[i][j].width, walls_goriz[i][j].height);
        }
    }
    for(let i = 0; i < walls_vert.length; ++i){
        for(let j = 0; j < walls_vert[i].length; ++j){
            ctx.drawImage(walls_vert[i][j].image, walls_vert[i][j].x, walls_vert[i][j].y, walls_vert[i][j].width, walls_vert[i][j].height);
        }
    }
}

//###########################################################################################################################################
//###########################################################################################################################################


export function appearence1(tank, last){
    if(last == "KeyW"){tank.image = tank.costumes[0]; tank.direction = 0; tank.direct = 0}
    else if(last == "KeyD"){tank.image = tank.costumes[1]; tank.direction = 1; tank.direct = 1}
    else if(last == "KeyS"){tank.image = tank.costumes[2]; tank.direction = 2; tank.direct = 2}
    else if(last == "KeyA"){tank.image = tank.costumes[3]; tank.direction = 3; tank.direct = 3}
    else{tank.direction = -1}
}

export function appearence2(tank, last){
    if(last == "ArrowUp"){tank.image = tank.costumes[0]; tank.direction = 0; tank.direct = 0}
    else if(last == "ArrowRight"){tank.image = tank.costumes[1]; tank.direction = 1; tank.direct = 1}
    else if(last == "ArrowDown"){tank.image = tank.costumes[2]; tank.direction = 2; tank.direct = 2}
    else if(last == "ArrowLeft"){tank.image = tank.costumes[3]; tank.direction = 3; tank.direct = 3}
    else{tank.direction = -1}
}



//###########################################################################################################################################
//###########################################################################################################################################

export function setbullet(tank, bullet){
    tank.bullets = [];
    tank.bullet_i = 0;
    for(let i = 0; i < tank.bullet_max; ++i){
        tank.bullets[i] = {};
        tank.bullets[i].costumes = bullet.costumes;
        tank.bullets[i].booms = bullet.booms;
        tank.bullets[i].dx = bullet.dx;
        tank.bullets[i].dy = bullet.dy;
        tank.bullets[i].see = bullet.see;
        tank.bullets[i].costume_i = bullet.costume_i;
    }
}





//###########################################################################################################################################
//###########################################################################################################################################



export function bulletset(bullet, tank){
    bullet.see = true;
    bullet.direction = tank.direct;
    if(bullet.direction == 0){bullet.image = bullet.costumes[0]; bullet.width = 25; bullet.height = 50;bullet.x = tank.x + 14; bullet.y = tank.y - 15;}
    if(bullet.direction == 1){bullet.image = bullet.costumes[1]; bullet.width = 50; bullet.height = 25;bullet.x = tank.x + 14; bullet.y = tank.y + 14;}
    if(bullet.direction == 2){bullet.image = bullet.costumes[2]; bullet.width = 25; bullet.height = 50;bullet.x = tank.x + 10; bullet.y = tank.y + 14;}
    if(bullet.direction == 3){bullet.image = bullet.costumes[3]; bullet.width = 50; bullet.height = 25;bullet.x = tank.x - 20; bullet.y = tank.y + 10;}
}


export function bulletgo(bullet, tankA, tankB, map, winner){
    let pink = touch_bullet(map, tankB, bullet);
    
    bullet.touch = pink.touch;

    if(pink.what == 'blue'){
        tankA.x = tankA.sx;
        tankA.y = tankA.sy;
        tankB.x = tankB.sx;
        tankB.y = tankB.sy;
        map.walls_vert[3][map.red_i].image = map.walls_vert[3][map.red_i].red;
        map.red_i++;
        if(map.red_i == 7){
            map.red_i = 0;
            map.blue_i = 0;
            for(let i = 0; i < 7; ++i){map.walls_vert[2][i].image = map.walls_vert[2][i].white;}
            for(let i = 0; i < 7; ++i){map.walls_vert[3][i].image = map.walls_vert[3][i].white;}
            winner.who = 'red'
        }
        // ctx.beginPath();
        // ctx.ellipse(100, 100, 100, 100, Math.PI / 4, 0, 2 * Math.PI);
        // ctx.fillStyle = 'red';
        // ctx.fill();
    }
    if(pink.what == 'red'){
        tankA.x = tankA.sx;
        tankA.y = tankA.sy;
        tankB.x = tankB.sx;
        tankB.y = tankB.sy;
        map.walls_vert[2][map.blue_i].image = map.walls_vert[2][map.blue_i].blue;
        map.blue_i++;
        if(map.blue_i == 7){
            map.red_i = 0;
            map.blue_i = 0;
            for(let i = 0; i < 7; ++i){map.walls_vert[2][i].image = map.walls_vert[2][i].white;}
            for(let i = 0; i < 7; ++i){map.walls_vert[3][i].image = map.walls_vert[3][i].white;}
            winner.who = 'blue'
        }
        // ctx.beginPath();
        // console.log(tankA.x, " ",tankA.sx)
        // ctx.ellipse(100, 100, 100, 100, Math.PI / 4, 0, 2 * Math.PI);
        // ctx.fillStyle = 'blue';
        // ctx.fill();
    }
    if(bullet.touch){
        if (bullet.direction == 1) {
            bullet.x += bullet.dx;
            while(touch(map, bullet, tankB)){
                bullet.x -= 1;
            }
            bullet.x += 30;
        }
        if (bullet.direction == 3) {
            bullet.x -= bullet.dx;
            while(touch(map, bullet, tankB)){
                bullet.x += 1;
            }
            bullet.x -= 30;
        }
        if (bullet.direction == 0) {
            bullet.y -= bullet.dy;
            while(touch(map, bullet, tankB)){
                bullet.y += 1;
            }
            bullet.y -= 30;
        }
        if (bullet.direction == 2) {
            bullet.y += bullet.dy;
            while(touch(map, bullet, tankB)){
                bullet.y -= 1;
            }
            bullet.y += 30;
        }
    }

    if(!bullet.touch){
        if(bullet.direction == 0){bullet.y -= bullet.dy;}
        if(bullet.direction == 1){bullet.x += bullet.dx;}
        if(bullet.direction == 2){bullet.y += bullet.dy;}
        if(bullet.direction == 3){bullet.x -= bullet.dx;}
    } else {
        if(bullet.costume_i == 0){
            bullet.image = bullet.booms[0];
            bullet.costume_i += 0.4;
            bullet.height = 50;
            bullet.width = 50;
        }
    }
    if(bullet.costume_i < 7 && bullet.costume_i != 0){
        bullet.image = bullet.booms[Math.floor(bullet.costume_i)];
        bullet.costume_i += 0.4;
    } else if(bullet.costume_i >= 7) {
        bullet.see = false;
        bullet.costume_i = 0;
    }
    if(winner.who != 'blue' && winner.who != 'red'){winner.who = 0;}
}



//###########################################################################################################################################
//###########################################################################################################################################

export function shot(button, tank, time, time0){
    if(button && !tank.bullets[tank.bullet_i].see && time0 < time - 200){
        bulletset(tank.bullets[tank.bullet_i], tank);
        tank.bullet_i++;
        if(tank.bullet_i == tank.bullet_max){tank.bullet_i = 0}
        time0 = time
    }
    return time0;
}

export function bulletflight(tankA, tankB, map, winner){
    for(let i = 0; i < tankA.bullet_max; ++i){
        if(tankA.bullets[i].see){
            ctx.drawImage(tankA.bullets[i].image, tankA.bullets[i].x, tankA.bullets[i].y, tankA.bullets[i].width, tankA.bullets[i].height);
            bulletgo(tankA.bullets[i], tankA, tankB, map, winner);
        }
    }
}



//###########################################################################################################################################
//###########################################################################################################################################
