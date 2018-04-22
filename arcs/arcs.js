
var ctx;
var sinLUT=[],cosLUT=[];
var SINCOS_PRECISION=1.0;
var SINCOS_LENGTH=360/SINCOS_PRECISION;

var dosave=false;
var cWidth,cHeight,num;
var pt=[],	// rotx, roty, deg, rad, w, speed
    style=[];


var tf0,		// global transformation matrix
    tf1,		// temp tf matrix
    tf;			// working tf matrix
tf0=tf1=tf=[1,0,0,0,1,0,0,0,1];

function random(a,b){
  if(a && !b) return a*Math.random();
  if(a && b) return (b-a)*Math.random()+a;
  
  return Math.random();
}

function init(){
  ctx=document.getElementById("canvas").getContext("2d");
  begin();
  setInterval(test,50);
}

function begin(w,h){
  cWidth=(w)?w:ctx.canvas.width;
  cHeight=(h)?h:ctx.canvas.height;
  ctx.canvas.width=cWidth;
  ctx.canvas.height=cHeight;
  for(var i=0;i<SINCOS_LENGTH;i++){
    sinLUT[i]=Math.sin(2*Math.PI/SINCOS_LENGTH*i);
    cosLUT[i]=Math.cos(2*Math.PI/SINCOS_LENGTH*i);
  }
  num=150;
  
  var index,prob;
  
  for(var i=0;i<num;i++){
    pt[index++]=int(random(2*Math.PI));	// random X rotation
    pt[index++]=int(random(2*Math.PI));	// random Y rotation
    
    pt[index++] =int(random(60,80));		// Short to quarter-circle arcs    
    if(random(100)>90) pt[index]=int(random(8,27)*10);
    
    pt[index++] = int(random(2,50)*5); // Radius. Space them out nicely
    
    pt[index++] = int(random(4,32)); // Width of band
    if(random(100)>90) pt[index]=int(random(40,60)); // Width of band
 
    pt[index++] = int(random(5,30)/5); // Speed of rotation in degrees
    
    prob=int(random(100));
    if(prob<30) style[i*2]=colorBlended(random(1), 255,0,100, 255,0,0, 210);
    else if(prob<70) style[i*2]=colorBlended(random(1), 0,153,255, 170,225,255, 210);
    else if(prob<90) style[i*2]=colorBlended(random(1), 200,255,0, 150,255,0, 210);
    else style[i*2]=color(255,255,255, 220);

    if(prob<50) style[i*2]=colorBlended(random(1), 200,255,0, 50,120,0, 210);
    else if(prob<90) style[i*2]=colorBlended(random(1), 255,100,0, 255,255,0, 210);
    else style[i*2]=color(255,255,255, 220);

    style[i*2+1]=int(random(100))%3;
  }
}

function draw(){

  background(0);
 
  var index=0;
  ctx.translate(cWidth/2, cHeight/2);
  tf=tf0;
  rotateX(30);
  rotateY(30);
  tf0=tf;
  for (var i = 0; i < num; i++) {
    tf=tf1=[1,0,0,0,1,0,0,0,1];
//    pushMatrix();
 
    rotateX(pt[index++]);
    rotateY(pt[index++]);
    if(style[i*2+1].hex==0) {
      ctx.strokeStyle=(style[i*2].rgb);
//      noFill();
//      strokeWeight(1);
      arcLine(0,0, pt[index++],pt[index++],pt[index++]);
      ctx.stroke();
    }/*
    else if(style[i*2+1]==1) {
      ctx.fillStyle=(style[i*2].rgb);
//      noStroke();
      arcLineBars(0,0, pt[index++],pt[index++],pt[index++]);
      ctx.fill();
    }
    else {
      ctx.fillStyle=(style[i*2].rgb);
//      noStroke();
      arc(0,0, pt[index++],pt[index++],pt[index++]);
      ctx.fill();
    }*/
    else{index+=3}
 
    // increase rotation
    pt[index-5]+=pt[index]/10;
    pt[index-4]+=pt[index++]/20;
 
//    popMatrix();
  }

}

function int(a){
  return Math.floor(a);
}

function color(ar,ag,ab,aa){
  aa=(aa)?aa/255:1;
  return {r:ar,g:ag,b:ab,a:aa,rgb:"rgba("+ar+","+ag+","+ab+","+aa+")",hex:((aa<<24)+(ar<<16)+(ab<<8)+ag)};
}

function multMat3(a,b){
  var ret=new Array(9);
  for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      ret[3*i+j] = a[3*i+0]*b[3*0+j] + a[3*i+1]*b[3*1+j] + a[3*i+2]*b[3*2+j];
    }
  }
  return ret;
}

function rotateX(t){		// about horizontal axis, in degrees
  tf=multMat3([1,0,0,0,cosLUT[t],-sinLUT[t],0,sinLUT[t],cosLUT[t]],tf);
  ctx.setTransform(tf[0],tf[3],tf[1],tf[4],cWidth/2, cHeight/2);
}
function rotateY(t){		// about vertical axis, in degrees
  tf=multMat3([cosLUT[t],0,sinLUT[t],0,1,0,-sinLUT[t],0,cosLUT[t]],tf);
  ctx.setTransform(tf[0],tf[3],tf[1],tf[4],cWidth/2, cHeight/2);
}

function background(p){
  ctx.fillStyle="black";
  ctx.fillRect(0,0,cWidth,cHeight);
}

// Get blend of two colors
function colorBlended(fract, r, g, b, r2, g2, b2, a) {
  return color(r+(r2-r)*fract, g+(g2-g)*fract, b+(b2-b)*fract, a);
}
 
 
// Draw arc line
function arcLine(x,y,deg,rad,w) {
  var a=int(Math.min(deg/SINCOS_PRECISION,SINCOS_LENGTH-1));
  var numlines=int(w/2);
 /*
  for (var j=0; j<numlines; j++) {
//    beginShape();
    ctx.beginPath();
    for (var i=0; i<a; i++) { 
      vertex(cosLUT[i]*rad+x,sinLUT[i]*rad+y);
    }
//    endShape();
    ctx.closePath();
    rad += 2;
  }
  */
  for(var j=0; j<numlines; j++){
    ctx.beginPath();
    ctx.moveTo(x+rad,y);
    ctx.arc(x,y,rad,0,deg*Math.PI/180);
    ctx.moveTo(x+rad,y);
    ctx.stroke();
    ctx.closePath();
    rad+=5;
  }
}
 
// Draw arc line with bars
function arcLineBars(x,y,deg, rad, w) {
  var a = int((Math.min(deg/SINCOS_PRECISION,SINCOS_LENGTH-1)));
  a /= 4;
 
  beginShape(QUADS);
  for (var i=0; i<a; i+=4) {
    vertex(cosLUT[i]*(rad)+x,sinLUT[i]*(rad)+y);
    vertex(cosLUT[i]*(rad+w)+x,sinLUT[i]*(rad+w)+y);
    vertex(cosLUT[i+2]*(rad+w)+x,sinLUT[i+2]*(rad+w)+y);
    vertex(cosLUT[i+2]*(rad)+x,sinLUT[i+2]*(rad)+y);
  }
  endShape();
}
 
// Draw solid arc
function arc(x, y, deg, rad, w) {
  var a = int(Math.min(deg/SINCOS_PRECISION,SINCOS_LENGTH-1));
  beginShape(QUAD_STRIP);
  for (var i = 0; i < a; i++) {
    vertex(cosLUT[i]*(rad)+x,sinLUT[i]*(rad)+y);
    vertex(cosLUT[i]*(rad+w)+x,sinLUT[i]*(rad+w)+y);
  }
  endShape();
}


function test(){
  ctx.clearRect(-250,-250,500,500);
  rotateX(int(10*Math.random()));
  rotateY(int(10*Math.random()));
  arcLine(0,0,60,150,30);
}


