import { pickCompNum, compareNum, printGameStatus } from "./gameFunctions.js";
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/** 사용자에게 특정 값을 받아서 게임 시작 혹은 종료하는 함수 */
function gameStart() {
  let compNum = [];

  rl.question(
    "게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요: \n",
    (command) => {
      if (command === "1") {
        compNum = pickCompNum();
        console.log("컴퓨터가 숫자를 뽑았습니다.");

        const gameLoop = () => {
          rl.question("숫자를 입력해주세요: ", (userNum) => {
            const result = userNum.split("").map(Number);

            if (result.length !== 3 || result.some((number) => isNaN(number))) {
              console.log(
                "잘못된 입력입니다. 1부터 9 사이의 숫자 3가지를 입력해주세요."
              );
              gameLoop();
              return;
            }

            const { strikes, balls } = compareNum(compNum, result);

            printGameStatus(strikes, balls);
            if (strikes === 3) {
              console.log("3개의 숫자를 모두 맞히셨습니다.");
              console.log("-------게임 종료-------");
              gameStart();
              return;
            }
            gameLoop();
          });
        };

        gameLoop();
      } else if (command === "9") {
        console.log("애플리케이션이 종료되었습니다.");
        rl.close();
      } else {
        console.log("잘못된 입력입니다. 1 또는 9를 입력하세요.");
        gameStart();

        return;
      }
    }
  );
}

gameStart();