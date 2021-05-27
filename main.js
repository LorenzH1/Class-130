function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("posenet is intialized");
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scorerightwrist > 0.2){
        circle(rightWristx, rightWristy, 20);
        if(rightWristy > 0 && rightWristy <= 100){
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristy > 100 && rightWristy <= 200){
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }
        else if(rightWristy > 200 && rightWristy <= 300){
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristy > 300 && rightWristy <= 400){
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        }
        else if(rightWristy > 400 && rightWristy <= 500){
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }

    
    if(scoreleftwrist > 0.2){
        circle(leftWristx, leftWristy, 20);
        InNumberleftWristY = Number(leftWristy);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "volume = "+ volume;
        song.setVolume(volume);
    }
    

}

song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreleftwrist = 0;
scorerightwrist = 0;


function gotPoses(results){
    if(results.length > 0){
        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("Score right wrist = "+scorerightwrist);
        console.log("Score left wrist = "+scoreleftwrist);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristx = "+leftWristx+"leftWristy = "+leftWristy);
        
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristx = "+rightWristx+"rightWristy = "+rightWristy);
    }
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}