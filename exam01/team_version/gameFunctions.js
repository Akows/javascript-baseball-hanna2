/** 컴퓨터가 생각하는 3자리 랜덤 숫자 생성 */
export function pickCompNum() {
  const numbers = [];

  while (numbers.length < 3) {
    const randomNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1;

    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  return numbers;
}

/** 스트라이크와 볼을 계산하는 함수 */
export function compareNum(compNum, userNum) {
  let strikes = 0;
  let balls = 0;

  userNum.forEach((num, idx) => {
    if (num === compNum[idx]) {
      strikes++;
    } else if (compNum.includes(num)) {
      balls++;
    }
  });

  return { strikes, balls };
}

/** 스트라이크, 볼, 낫싱 개수를 프린트하는 함수 */
export function printGameStatus(strikes, balls) {
  if (strikes && balls) {
    console.log(`${strikes} 스트라이크 ${balls} 볼`);
  } else if (strikes) {
    console.log(`${strikes} 스트라이크`);
  } else if (balls) {
    console.log(`${balls}볼`);
  } else {
    console.log("낫싱!");
  }
}