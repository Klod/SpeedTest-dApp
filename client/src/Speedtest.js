import React from 'react';
import Testrun from './Testrun.js'

var imageAddr = "https://cdn.macrumors.com/article-new/2013/03/speedtest.jpg"; 
var downloadSize = 92000; //bytes

function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }    
    var oProgress = document.getElementById("progress");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
}
function InitiateSpeedDetection(callback) {
    
        ShowProgressMessage("Loading the image, please wait...");
        // window.setTimeout(MeasureConnectionSpeed, 1);
        window.setTimeout(function() {
            MeasureConnectionSpeed(callback)
     },1);
 

    
}; 

function MeasureConnectionSpeed(callback) {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        let speed = showResults(); 
        callback(speed)
    }
    download.onerror = function (err, msg) {
        ShowProgressMessage("Invalid image, or error downloading");
    }
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster; 
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
               
        ShowProgressMessage([
        "Your connection speed is:", 
        speedBps + " bps", 
        speedKbps + " kbps", 
        speedMbps + " Mbps"
        ]);
        return speedBps
    }

}


class Speedtest extends React.Component {
  
    componentDidMount () {
        if (window.addEventListener) {
            InitiateSpeedDetection(this.props.onTest);
            
        } else if (window.attachEvent) {
            window.attachEvent('onload', InitiateSpeedDetection);
        }
    }
    
    render(){
        return(
            <h1 id="progress">JavaScript Speed Test</h1>
            )
    }
}

export default Speedtest