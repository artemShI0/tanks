const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import {
    cage,
    rect,
    point,
    mouse,
    pressed,
    tank1,
    tank2,
    kust,
    out,
    brick_white,
    brick_brown,
    bullet,
    map,
    push1,
    push2,
    last,
    pusheri,
    pusherj,
} from "./elem.js";

import {
    drawPoint,
    drawRect,
    inside,
    pointStatus,
    drawCage,
    move1,
    move2,
    drawOut,
    appearence1,
    appearence2,
    bulletset,
    bulletgo,
    drawwalls,
    setmap1,
    setmap2,
    touch,
    setbullet,
    shot,
    bulletflight
} from "./drafts.js";

//#######################################################################################################

let winner = {}
let time;
let time1 = 0;
let time2 = 0;
let a = 10;
let b = 10;
let c = (700/brick_white.height - 1) * brick_white.height - 5;
let d = (1530/brick_white.width - 1) * brick_white.width - 15;

setmap2(map.walls_goriz, map.walls_vert, brick_white);
setbullet(tank1, bullet);
setbullet(tank2, bullet);


//########################################################################################################

function render() {
    time = new Date()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
//    ctx.drawImage(brick_brown.image, 700, 500, brick_brown.width, brick_brown.height);
//    drawCage(cage);
////      drawRect(rect);
//    drawPoint(point);
//    drawOut(out);
    ctx.drawImage(tank1.image, tank1.x, tank1.y, tank1.width, tank1.height);
    ctx.drawImage(tank2.image, tank2.x, tank2.y, tank2.width, tank2.height);
    
//    ctx.drawImage(kust.image, kust.x, kust.y, kust.width, kust.height);
//    pointStatus(point, mouse);
    drawwalls(map.walls_goriz, map.walls_vert);
    appearence1(tank1, last(push1, pusheri));
    appearence2(tank2, last(push2, pusherj));
    move1(tank1, tank2, map);
    move1(tank2, tank1, map);
//    move2(tank2, pressed, brick_white, a, b, c, d);
//    inside(tank1, brick_white, a, b, c, d);
//    inside(tank2, brick_white, a, b, c, d);

    time1 = shot(pressed["KeyQ"], tank1, time, time1);
    time2 = shot(pressed["Space"], tank2, time, time2);
    bulletflight(tank1, tank2, map, winner);
    bulletflight(tank2, tank1, map, winner);

////    function small(){rect.height = 0; rect.width = 0;}
////    if(winner.who = 'red'){rect.height = 100; rect.width = 100; setTimeout(small, 5000);}
////    if(winner.who = 'blue'){rect.height = 100; rect.width = 100; setTimeout(small, 5000);}

    window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);


