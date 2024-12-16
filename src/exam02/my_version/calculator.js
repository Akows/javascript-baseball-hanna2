// 입력받은 수식을 평가하여 결과를 계산하는 함수
function evaluateExpression(expression) {
    // Step 1: 공백 제거
    // 입력된 문자열에서 모든 공백 문자를 제거합니다.
    expression = expression.replace(/\s+/g, '');

    // Helper 함수: 두 숫자와 연산자를 받아 계산 수행
    const operate = (a, b, operator) => {
        a = parseFloat(a); // 숫자로 변환
        b = parseFloat(b); // 숫자로 변환
        switch (operator) {
            case '+': return a + b; // 덧셈
            case '-': return a - b; // 뺄셈
            case 'x': return a * b; // 곱셈
            case '/': return a / b; // 나눗셈
            default: throw new Error(`유효하지 않은 연산자가 감지되었습니다. :: ${operator}`); // 잘못된 연산자 처리
        }
    };

    // Step 2: 곱셈 및 나눗셈 처리
    // 우선순위가 높은 연산부터 처리
    const processHighPriority = (tokens) => {
        const stack = []; // 계산 결과를 저장할 스택
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token === 'x' || token === '/') {
                // 곱셈 또는 나눗셈 연산
                const prev = stack.pop(); // 스택에서 이전 숫자를 꺼냄
                const next = tokens[++i]; // 다음 숫자를 가져옴
                stack.push(operate(prev, next, token)); // 계산 결과를 스택에 추가
            } else {
                // 숫자인 경우 스택에 추가
                stack.push(token);
            }
        }
        return stack; // 처리된 토큰 반환
    };

    // Step 3: 덧셈 및 뺄셈 처리
    const processLowPriority = (tokens) => {
        let result = parseFloat(tokens[0]); // 첫 번째 숫자를 결과로 초기화
        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i]; // 연산자
            const next = parseFloat(tokens[i + 1]); // 다음 숫자
            result = operate(result, next, operator); // 연산 수행
        }
        return result; // 최종 계산 결과 반환
    };

    // Step 4: 수식을 토큰(숫자와 연산자)으로 나누기
    const tokens = expression.split(/(\+|-|x|\/)/);

    // Step 5: 1순위 연산 처리 (곱셈, 나눗셈)
    const highPriorityProcessed = processHighPriority(tokens);

    // Step 6: 2순위 연산 처리 (덧셈, 뺄셈)
    return processLowPriority(highPriorityProcessed);
}

// UI와 키보드 입력을 처리하는 코드
const historyDisplay = document.getElementById('history'); // 계산 기록 표시 영역
const resultDisplay = document.getElementById('result'); // 계산 결과 표시 영역
const buttons = document.querySelectorAll('.btn'); // 모든 버튼 요소 선택
let currentInput = ''; // 현재 입력된 수식 저장

// 입력값 변환 함수
// 사용자 입력(키보드 또는 버튼 클릭)을 내부적으로 사용하는 기호로 변환
function normalizeInput(value) {
    if (value === '*') return 'x'; // 곱셈
    if (value === '×') return 'x'; // 곱셈 (버튼에서 입력되는 기호)
    if (value === '/') return '/'; // 나눗셈
    if (value === '÷') return '/'; // 나눗셈 (버튼에서 입력되는 기호)
    return value; // 숫자 및 다른 연산자는 그대로 반환
}

// 초기화 함수
// 계산기 로딩 시 또는 "AC" 버튼 클릭 시 호출
function initializeCalculator() {
    currentInput = ''; // 입력값 초기화
    historyDisplay.innerText = ''; // 계산 기록 초기화
    resultDisplay.innerText = '0'; // 결과 표시 초기화
}

// 입력 처리 함수
// 키보드 또는 버튼 입력을 처리하는 로직
function handleInput(value, id = null) {
    const normalizedValue = normalizeInput(value); // 입력값 변환

    if (id === 'clear') {
        // "AC" 버튼 클릭 시 초기화
        initializeCalculator();
    } else if (id === 'backspace') {
        // "Backspace" 버튼 클릭 시 마지막 입력 제거
        currentInput = currentInput.slice(0, -1); // 마지막 문자 제거
        resultDisplay.innerText = currentInput || '0'; // 결과 갱신
    } else if (id === 'equals' || value === '=') {
        // "=" 버튼 클릭 또는 Enter 키 입력 시 계산 수행
        if (!currentInput.trim()) {
            resultDisplay.innerText = '0'; // 입력값이 없으면 0 출력
            return;
        }
        
        try {
            const result = evaluateExpression(currentInput); // 수식 계산
            historyDisplay.innerText = currentInput; // 계산 기록 표시
            resultDisplay.innerText = result; // 결과 표시
            currentInput = ''; // 계산 후 입력값 초기화
        } catch (error) {
            resultDisplay.innerText = 'Error'; // 오류 발생 시 "Error" 표시
        }
    } else {
        // 숫자 및 연산자 입력 처리
        currentInput += normalizedValue; // 입력값을 추가
        resultDisplay.innerText = currentInput; // 결과 갱신
    }
}

// 버튼 클릭 이벤트 추가
buttons.forEach((button) => {
    button.addEventListener('click', () => handleInput(button.innerText, button.id));
});

// 키보드 입력 이벤트 추가
document.addEventListener('keydown', (event) => {
    const key = event.key; // 눌린 키

    if (!isNaN(key) || key === '.') {
        // 숫자 또는 소수점 입력
        handleInput(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        // 연산자 입력
        const symbol = key === '*' ? '×' : key === '/' ? '÷' : key;
        handleInput(symbol);
    } else if (key === 'Enter') {
        // Enter 키 입력
        handleInput('=', 'equals');
    } else if (key === 'Backspace') {
        // Backspace 키 입력
        handleInput('', 'backspace');
    } else if (key === 'Escape') {
        // Esc 키 입력
        handleInput('', 'clear');
    }
});

// 초기화 함수 호출 (페이지 로드 시 초기화)
initializeCalculator();
