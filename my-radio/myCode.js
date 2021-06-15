
var play_pause_status = "pause";

function play_pause() {
  var player_radio = document.getElementById('player');
  
  if (play_pause_status == "pause") {

    //test
    visualize()

    player_radio.play();
    play_pause_status = "play";
    document.getElementById('my-btn-play').style.backgroundImage="url(img/Pause.png)";
    
  } else {
    player_radio.pause();
    play_pause_status = "pause";
    document.getElementById('my-btn-play').style.backgroundImage="url(img/But-Play.png)";
  }
  
  function visualize() {
    var context = new AudioContext();
    var src = context.createMediaElementSource(player_radio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "whitesmoke";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.fillStyle = "rgb(232,132,118)";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    player_radio.play();
    renderFrame();
  };

}



