video="";
status_detect="";
objects=[];
ob_name="";
function preload(){
    video=createCapture(VIDEO);
    video.hide();
    sound="Alarm.mp3";
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Detecting Objects";
}

function modelLoaded(){
    console.log("Model is Loaded");
status_detect="t";
}

function setup(){
    canvas= createCanvas(500,400);
    canvas.center();
}
function gotResult(error,results){
    if(error){
console.error(error);
    }
    console.log(results);
objects=results;
}
function draw(){
    image(video,0,0,500,400);
    if(status_detect!=""){
objectDetector.detect(video,gotResult);
for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="Detected Objects";
    document.getElementById("no_objects").innerHTML="No of objects detected are- "+objects.length;
    ob_name=objects[i].label;

    fill("red");
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
    stroke("red");
    noFill();
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

    if(ob_name!="person"){
        var synth=window.speechSynthesis;
        speak_data= "Baby not found";
        var utterThis= new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    }
}
    }
}
