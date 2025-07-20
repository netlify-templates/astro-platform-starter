<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Coin Tap Game</title>
  <style>
    body {
      background: linear-gradient(to bottom, #87ceeb, #ffffff);
      font-family: Arial, sans-serif;
      text-align: center;
      padding-top: 100px;
    }

    h1 {
      color: #333;
    }

    #coin {
      font-size: 100px;
      cursor: pointer;
      animation: bounce 0.3s;
    }

    @keyframes bounce {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }

    #score {
      font-size: 32px;
      margin-top: 20px;
      color: #444;
    }

    .footer {
      position: fixed;
      bottom: 10px;
      width: 100%;
      font-size: 14px;
      color: #888;
    }
  </style>
</head>
<body>
  <h1>💰 Coin Tap Game</h1>
  <div id="coin" onclick="collectCoin()">🪙</div>
  <div id="score">Coins: 0</div>

  <div class="footer">Created by YOU | Earn & Have Fun</div>

  <audio id="sound" src="https://www.soundjay.com/button/sounds/button-4.mp3" preload="auto"></audio>

  <script>
    let coins = 0;
    const scoreDisplay = document.getElementById("score");
    const sound = document.getElementById("sound");

    function collectCoin() {
      coins++;
      scoreDisplay.innerText = "Coins: " + coins;
      sound.play();
    }
  </script>
</body>
</html>
