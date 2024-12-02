const readline = require('readline'); // Node.js에서 사용자 입력을 처리하기 위한 readline 모듈

// readline 인터페이스 생성
// - input: 표준 입력(키보드 입력)
// - output: 표준 출력(콘솔 출력)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 정수 1개를 무작위 생성하여 반환하는 함수
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 1~9 사이의 중복되지 않은 3개의 랜덤 숫자를 생성하는 함수
// - 컴퓨터가 사용할 정답 숫자 배열을 생성
function generateRandomNumbers() {
    const numbers = []; // 결과를 저장할 배열

    // 3가지 숫자가 생성되어야 하므로, numbers 배열의 길이가 3이 될때까지 무한 반복
    while (numbers.length < 3) { 

        // 무작위 정수 만들기
        const randomNum = getRandomInteger(1, 9);

        // 중복된 정수는 결과 배열에 포함되어서는 안된다
        // numbers 배열 내부에 생성된 randomNum가 이미 존재하는지 검증
        // randomNum과 동일한 값이 존재하지 않을 때만 randomNum을 배열로 넣어준다
        if (!numbers.includes(randomNum)) { 
            numbers.push(randomNum);
        }
    }
    return numbers; // 생성된 3개의 숫자 반환
}

// 컴퓨터 숫자와 사용자 입력 숫자를 비교하여 스트라이크와 볼을 계산하는 함수
// - computerNumbers: 컴퓨터가 생성한 숫자 배열
// - userNumbers: 사용자가 입력한 숫자 배열
// 위 2개 값을 인자로 받아서,
// 반환값: 스트라이크와 볼 개수를 포함한 객체({ strikes, balls })
function calculateResult(computerNumbers, userNumbers) {
    let strikes = 0; // 스트라이크 개수 (숫자와 위치가 모두 일치하는 경우)
    let balls = 0; // 볼 개수 (숫자는 있지만 위치가 다른 경우)

    // 사용자 숫자 배열을 순회하며 컴퓨터 숫자와 비교
    userNumbers.forEach((num, index) => {
        if (num === computerNumbers[index]) { // 숫자와 위치가 모두 일치하면 스트라이크
            strikes++;
        } 
        else if (computerNumbers.includes(num)) { // 숫자는 존재하지만 위치가 다르면 볼
            balls++;
        }
    });

    return { strikes, balls }; // 스트라이크와 볼 개수를 객체 형태로 반환
}

// 게임의 메인 로직을 실행하는 함수
// - 컴퓨터가 랜덤 숫자를 생성하고, 사용자 입력을 반복적으로 처리
function playGame() {
    const computerNumbers = generateRandomNumbers(); // 컴퓨터가 랜덤으로 3개의 숫자를 생성
    console.log('컴퓨터가 숫자를 뽑았습니다.');
    console.log(computerNumbers);

    // 게임 루프 함수: 사용자가 정답을 맞히거나 종료 명령을 내릴 때까지 반복
    const gameLoop = () => {
        // 사용자 입력을 기다림
        rl.question('숫자를 입력해주세요 (종료하려면 9 입력): ', (userInput) => {
            if (userInput === '9') { // 종료 명령인 9를 입력한 경우
                console.log('애플리케이션이 종료되었습니다.');
                rl.close(); // readline 인터페이스 닫기
                return; // 게임 루프 종료
            }

            // 사용자 입력을 숫자 배열로 변환
            // split을 이용해서 입력값을 나누어 배열에 삽입한다.
            // 그런데 입력값은 기본적으로 문자열, 따라서 Number 함수를 map 함수의 매개변수로 넣어,
            // 배열의 각 요소들을 숫자로 변환한 새로운 배열을 반환하도록 한다.
            // 사용자가 숫자에 해당되는 문자열을 입력하지 않았다? NaN값이 배열에 저장되게 된다.
            // 이는 아래 실행된 유효성 검사에서 활용된다.
            const userNumbers = userInput.split('').map(Number);

            // 입력값 유효성 검사
            // 입력한 숫자가 3개가 아님, 중복값을 입력함, 입력한 값에 숫자가 아닌 값이 있음, 입력한 값이 1이상 9이하가 아님.
            // Set 객체의 경우, 동일한 값을 추가했을 때 겹치는 값을 자동으로 삭제함.
            // 따라서 사용자 입력값을 Set 객체로 처리한 뒤, 전체 크기가 3이 아니라면 중복값을 입력해서 크기가 2 이하로 내려갔다는 뜻이 됨.
            if (
                userNumbers.length !== 3 ||
                new Set(userNumbers).size !== 3 ||
                userNumbers.some((num) => isNaN(num)) ||
                userNumbers.some((num) => num < 1 || num > 9)
            ) {
                console.log('잘못된 입력입니다. 1 ~ 9 사이의 서로 다른 세 숫자를 입력하세요.');
                gameLoop(); // 잘못된 입력 시 다시 질문
                return;
            }

            // 컴퓨터 숫자와 사용자 숫자를 비교하여 결과 계산
            const { strikes, balls } = calculateResult(computerNumbers, userNumbers);

            // 스트라이크와 볼이 모두 없는 경우
            if (strikes === 0 && balls === 0) { 
                console.log('아웃!'); // 아웃!
            } 
            // 스트라이크와 볼이 하나라도 존재한다면, 갯수를 출력
            else {
                console.log(`${balls}볼 ${strikes}스트라이크`);
            }

             // 3스트라이크! 정답을 모두 맞힌 경우
            if (strikes === 3) {
                console.log('3개의 숫자를 모두 맞히셨습니다.');
                console.log('-------게임 종료-------');

                // 게임 종료 후 다시 시작 여부를 묻기 위해 main 함수 호출 후 함수 종료
                main(); 
                return;
            }

            // 정답을 맞히지 못한 경우 다시 질문
            gameLoop(); 
        });
    };

    gameLoop(); // 게임 시작
}

// 애플리케이션의 메인 함수
// - 게임 시작 또는 종료 명령을 입력받아 처리
function main() {
    rl.question('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요: ', (command) => {
        if (command === '1') { // 1을 입력하면 새로운 게임 시작
            playGame();
        } 
        else if (command === '9') { // 9를 입력하면 애플리케이션 종료
            console.log('애플리케이션이 종료되었습니다.');
            rl.close(); // readline 인터페이스 닫기
        } 
        else { // 유효하지 않은 명령 처리
            console.log('잘못된 입력입니다. 1 또는 9를 입력하세요.');
            main(); // 잘못된 입력 시 다시 main 호출
        }
    });
}

// 애플리케이션 실행
main();

// 테스트에서 사용될 함수 내보내기
module.exports = {
    getRandomInteger,
    generateRandomNumbers,
    calculateResult,
};