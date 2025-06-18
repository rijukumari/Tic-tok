 const boxes = document.querySelectorAll(".box");
      const gameInfo = document.querySelector(".game-info");
      const newGameBtn = document.querySelector(".btn");

      let currentPlayer;
      let gameGrid;

      const winningPosition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      function initGame() {
        currentPlayer = "X";
        gameGrid = ["", "", "", "", "", "", "", "", ""];
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
        newGameBtn.classList.remove("active");

        boxes.forEach((box, index) => {
          box.innerText = "";
          box.style.pointerEvents = "auto";
          box.classList.remove("win");
        });
      }

      function swapTurn() {
        currentPlayer = currentPlayer === "X" ? "0" : "X";
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
      }

      function checkGameOver() {
        let answer = "";

        winningPosition.forEach((position) => {
          if (
            gameGrid[position[0]] !== "" &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[1]] === gameGrid[position[2]]
          ) {
            answer = gameGrid[position[0]];
            boxes.forEach((box) => {
              box.style.pointerEvents = "none";
            });
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
          }
        });

        if (answer !== "") {
          gameInfo.innerText = `Winner Player - ${answer}`;
          newGameBtn.classList.add("active");
          return;
        }

        if (!gameGrid.includes("")) {
          gameInfo.innerText = "Game Tied!";
          newGameBtn.classList.add("active");
        }
      }

      function handleClick(index) {
        if (gameGrid[index] === "") {
          boxes[index].innerText = currentPlayer;
          gameGrid[index] = currentPlayer;
          boxes[index].style.pointerEvents = "none";
          checkGameOver();
          if (gameInfo.innerText.includes("Winner") || gameInfo.innerText === "Game Tied!") return;
          swapTurn();
        }
      }

      boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
          handleClick(index);
        });
      });

      newGameBtn.addEventListener("click", initGame);

      // Start game for the first time
      initGame();