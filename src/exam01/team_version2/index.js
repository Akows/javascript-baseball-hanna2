import { pickCompNum, compareNum, printComparedResult } from "./gameFunctions.js";
import { createInterface } from "readline";
import { MAX_DIGITS, START_COMMAND, END_COMMAND, MIN_VALUE, MAX_VALUE } from "./constants.js";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/** 사용자에게 특정 값을 받아서 게임 시작 혹은 종료하는 함수 */
function gameStart() {
  let compNum = [];
  
  rl.question(
    `게임을 새로 시작하려면 ${START_COMMAND}, 종료하려면 ${END_COMMAND}를 입력하세요: \n`,
    (command) => {
      if (command === START_COMMAND) {
        compNum = pickCompNum();
        console.log("컴퓨터가 숫자를 뽑았습니다.");
        askForNumbers();

      } else if (command === END_COMMAND) {
        console.log("애플리케이션이 종료되었습니다.");
        rl.close();
      } else {
        console.log(`잘못된 입력입니다. ${START_COMMAND} 또는 ${END_COMMAND}를 입력하세요.`);
      }
    }
  );
}

function askForNumbers(){
  rl.question("숫자를 입력해주세요: ", (userNum) => {
    const userNumbers = userNum.split("").map(Number);

    if (userNumbers.length !== 3 || userNumbers.some((number) => isNaN(number))) {
      console.log(
        `잘못된 입력입니다. ${MIN_VALUE}부터 ${MAX_VALUE} 사이의 숫자 3가지를 입력해주세요.`
      );
    }

    const { strikes, balls } = compareNum(compNum, userNumbers);

    printComparedResult(strikes, balls);
    if (strikes === MAX_DIGITS) {
      console.log(`${MAX_DIGITS}개의 숫자를 모두 맞히셨습니다.`);
      console.log("-------게임 종료-------");
      rl.close();
    }
  });
}

gameStart();
