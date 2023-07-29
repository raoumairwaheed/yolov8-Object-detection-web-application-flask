//Updating Frames in Image tag to Show Video Stream
window.addEventListener('load', function () {
    console.log("Window UP")
    // document.getElementById("videoElement").src = "/video_feed"
    // clearTerminal();
    // stopProcess("");
});
var show_ad = false;

$(document).ready(function () {


    $("#banner2").hide();
    $("#closeAd").click(function () {
        $("#banner2").hide(1000);
    });
});

function startVideo() {
    var url = $('#url').val();
    $('#urlForm').attr('action', '/index'); // Set the form action to /index
    $('#urlForm').attr('method', 'POST'); // Set the form method to POST
    $('#urlForm').find('#url').val(url); // Set the URL value in the form
    $('#urlForm').submit(); // Submit the form
}

// function startVideo() {
//     var url = $('#url').val();
//
//     $.ajax({
//         url: "/index",
//         type: "POST",
//
//         data: {url: url},
//         success: function () {
//             console.log("Video stream started successfully!");
//
//             location.reload();
//         },
//         error: function () {
//             console.log("Error starting video stream!");
//         }
//     });
// }

function stopProcess(message) {
    console.log("Stop BUTTON");
    const terminalData = document.getElementById('terminal').innerHTML;
    document.getElementById('terminal').innerHTML = terminalData + "<br><br><center>" + message + "</center><br><br>";
    fetch('/stop_process')
        .then(response => response.text())
        .then(message => {
            console.log(message);
            // Redirect to homepage after stopping the process
            window.location.href = '/';
        })
        .catch(error => console.error(error));
}


// function clearTerminal() {
//     // Get a reference to the clear button
//     const clearButton = document.getElementById('clear-button');
//
//     // Add a click event listener to the clear button
//     clearButton.addEventListener('click', function () {
//         console.log("CLEAR BUTTON")
//         document.getElementById('terminal').innerHTML = "";
//     });
//
//     // Clear the terminal on page load
//     document.getElementById('terminal').innerHTML = "";
// }


//This Code is used to Communicate b/w Client & Server via SOCKETIO
var socket = io.connect('http://127.0.0.1:5000/');

function appendToTerminal(message) {
    var terminal = document.getElementById("terminal");
    var p = document.createElement("p");
    p.innerHTML = `<table class="table table-striped text-center"><tr class="row"><td class="col-md-6">${message[0]}</td>
                   <td  class="col-md-6">${message[1]}</td></tr></table>`;
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;

    if (show_ad) {
        let className = message[0];
        //let ad = '<a href="' + randomObject.product_url + '" target="_blank">Ad Found</a>';

        $('#banner2').show(1000);
        $("#spanTxt").text(className);
        $(".no-link").prop("href", "https://www.amazon.com/s?k=" + className);
    }
}

//Updating Terminal with Detected Objects
socket.on("label", (data) => {
    appendToTerminal(data);
});

//Code For All Switches
function toggleHSwitch() {
    var switchElement = $("#flip-horizontal");
    var switchIsOn = switchElement.is(":checked");

    if (switchIsOn) {
        console.log("SWITCH ON")
        $.getJSON("/request_flipH_switch", function (data) {
            console.log("Switch on request sent.");
        });
    } else {
        console.log("SWITCH OFF")
        $.getJSON("/request_flipH_switch", function (data) {
            console.log("Switch off request sent.");
        });
    }
}

function toggleDetSwitch() {

    var switchElement = $("#run_detection");
    var switchIsOn = switchElement.is(":checked");

    if (switchIsOn) {
        console.log("SWITCH ON")
        $.getJSON("/request_run_model_switch", function (data) {
            console.log("Switch on request sent.");
        });
    } else {
        console.log("SWITCH OFF")
        $.getJSON("/request_run_model_switch", function (data) {
            console.log("Switch off request sent.");
        });
    }
}

function toggleOffSwitch() {
    var switchElement = $("#turn_off");
    var switchIsOn = switchElement.is(":checked");

    if (switchIsOn) {
        console.log("Camera ON")
        $.getJSON("/request_preview_switch", function (data) {
            console.log("Switch on request sent.");
        });
    } else {
        console.log("Camera OFF")
        $.getJSON("/request_preview_switch", function (data) {
            console.log("Switch off request sent.");
        });
    }
}

$(document).ready(function () {
    // Get the slider element
    var slider = $('#slider');

    // Attach the event listener to the slider element
    slider.on('input', function () {
        // Get the value of the slider
        var sliderValue = slider.val();

        // Call the updateSliderValue() function and pass in the slider value
        updateSliderValue(sliderValue);
    });
});


function updateSliderValue(sliderValue) {
    console.log(sliderValue)
    $.ajax({
        type: 'POST',
        url: '/update_slider_value',
        data: {'sliderValue': sliderValue},
        success: function () {
            console.log('Slider value updated successfully!');
        },
        error: function () {
            console.log('Error updating slider value!');
        }
    });
    document.getElementById("conf_display").innerHTML = sliderValue
}
