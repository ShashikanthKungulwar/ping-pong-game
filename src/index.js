// import "./styles.css";
document.getElementById("app").innerHTML = ``;
//declaration of all variables required globally
var ball = document.getElementById("ball");
var rod1 = document.getElementById("rod1");
var rod2 = document.getElementById("rod2");
window.addEventListener("keypress", keyHandler); //handling enter and movement of rods throug keyHandler function
var flag = false; //indecates the game is on or not
var i; //interval variable
var HDirection = "right"; //horizontal direction of ball
var Vdirection = "bottom"; //virtical direction of ball
setInitalState(); //to set the inital state of the rods and ball
var name; //to take input of the game player
var score = 0; //to store the game score

function keyHandler(event) {
  //for rods movement
  if (event.key == "a") {
    if (flag && rod1.offsetLeft > 100) {
      rod1.style.left = rod1.offsetLeft - 15 + "px";
      rod2.style.left = rod2.offsetLeft - 15 + "px";
    }
  } else if (flag && event.key == "d") {
    if (rod1.offsetLeft + rod1.offsetWidth < window.innerWidth + 100) {
      rod1.style.left = rod1.offsetLeft + 15 + "px";
      rod2.style.left = rod2.offsetLeft + 15 + "px";
    }
  }
  //for starting and restarting the game
  else if (event.key === "Enter") {
    if (flag) {
      if (window.confirm("do you want to Restart the game?")) {
        clearInterval(i);
        flag = false;
      }
    }
    if (!flag && window.confirm("do you want to start the game?")) {
      flag = true;
      name = window.prompt("enter your name here");
      if (localStorage.getItem("highScore") == null) {
        window.alert(
          "This is 1st game score high so that no one could catch you buddy! "
        );
      } else {
        window.alert(
          localStorage.getItem("name") +
            " scored the highest score of " +
            localStorage.getItem("highScore")
        );
      }
      i = setInterval(moveBall, 100);
      setInitalState();
    }
  } else {
  }
}
//moving the ball for current to durther position
function moveBall() {
  let ballRect = ball.getBoundingClientRect();
  let rod1Rect = rod1.getBoundingClientRect();
  let rod2Rect = rod2.getBoundingClientRect();
  if (ballRect.top <= rod1Rect.bottom) {
    if (ballRect.right < rod1Rect.left || ballRect.left > rod1Rect.right) {
      clearInterval(i);
      flag = false;
      if (
        localStorage.getItem("highScore") == null ||
        parseInt(localStorage.getItem("highScore")) < score
      ) {
        localStorage.setItem("name", name);
        localStorage.setItem("highScore", score);
        window.alert("Congratulations you scored the highest score " + score);
      } else {
        window.alert(
          "game over your score is " +
            score +
            " try to beat the high score of " +
            localStorage.getItem("highScore") +
            " next time"
        );
      }
      Vdirection = "bottom";
      setInitalState();
    }
    changeDirection("bottom");
  } else if (ballRect.bottom >= rod2Rect.top) {
    if (ballRect.right < rod2Rect.left || ballRect.left > rod2Rect.right) {
      clearInterval(i);
      flag = false;
      if (
        localStorage.getItem("highScore") == null ||
        parseInt(localStorage.getItem("highScore")) < score
      ) {
        localStorage.setItem("name", name);
        localStorage.setItem("highScore", score);
        window.alert("Congratulations you scored the highest score " + score);
      } else {
        window.alert(
          "game over your score is " +
            score +
            " try to beat the high score of " +
            localStorage.getItem("highScore") +
            " next time"
        );
      }
      Vdirection = "top";
      setInitalState();
    }
    changeDirection("top");
  } else if (ballRect.left <= 0) {
    changeDirection("right");
  } else if (ballRect.right >= window.innerWidth) {
    changeDirection("left");
  } else {
    continueMoving();
  }
}
//for changing the direction of the ball after impact with the borders of the page or rods
function changeDirection(direction) {
  if (direction == "right" || direction == "left") {
    HDirection = direction;
  } else {
    score += 100;
    Vdirection = direction;
  }
  continueMoving();
}
//changing the position of ball
function continueMoving() {
  if (HDirection == "right") {
    ball.style.left = ball.offsetLeft + 15 + "px";
  } else {
    ball.style.left = ball.offsetLeft - 15 + "px";
  }

  if (Vdirection == "top") {
    ball.style.top = ball.offsetTop - 15 + "px";
  } else {
    ball.style.top = ball.offsetTop + 15 + "px";
  }
}
// function to set inital state
function setInitalState() {
  ball.style.left = "50%";
  rod1.style.left = "50%";
  rod2.style.left = "50%";
  ball.style.transform = "translateX(-50%)";
  rod1.style.transform = "translateX(-50%)";
  rod2.style.transform = "translateX(-50%)";
  score = 0;
  if (Vdirection == "bottom") {
    ball.style.top =
      document.getElementById("rod1").getBoundingClientRect().bottom + "px";
  } else {
    ball.style.bottom =
      document.getElementById("rod2").getBoundingClientRect().top + "px";
  }
}
