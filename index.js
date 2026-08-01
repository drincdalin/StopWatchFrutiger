const display = document.getElementById("display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update,10);
        isRunning = true;
    }
    
}


function stop(){
    if(isRunning){
        isRunning = false;
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset(){
    clearInterval(timer);
    timer = null;
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
}

function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let miliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2,"0");
    miliseconds = String(miliseconds).padStart(2, "0");


    display.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;
}

// AI SLOP
window.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
        case "s": // Press 'S' to Start
            start();
            break;
        case "t": // Press 'T' to Stop/Timeout
            stop();
            break;
        case "r": // Press 'R' to Reset
            reset();
            break;
        case " ": // Press 'Spacebar' to Toggle Start/Stop
            event.preventDefault(); // Prevents the page from scrolling down
            if (isRunning) {
                stop();
            } else {
                start();
            }
            break;
    }
});
