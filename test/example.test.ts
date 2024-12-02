// 코드를 테스트할 주요 함수:

    // getRandomInteger(min, max)
    // generateRandomNumbers()
    // calculateResult(computerNumbers, userNumbers)

// 테스트 항목:

    // 랜덤 숫자 생성 범위 확인.
    // 중복 없는 3개의 숫자 배열 생성 확인.
    // calculateResult 함수의 스트라이크와 볼 계산 확인.

const { getRandomInteger, generateRandomNumbers, calculateResult } = require('../index.js');

describe('숫자 야구 게임 테스트', () => {

    // 1. getRandomInteger 함수 테스트
    describe('getRandomInteger 함수', () => {
        test('주어진 범위 내의 숫자를 반환해야 한다.', () => {
            const min = 1;
            const max = 9;
            for (let i = 0; i < 100; i++) {
                const result = getRandomInteger(min, max);
                expect(result).toBeGreaterThanOrEqual(min);
                expect(result).toBeLessThanOrEqual(max);
            }
        });
    });

    // 2. generateRandomNumbers 함수 테스트
    describe('generateRandomNumbers 함수', () => {
        test('1~9 범위의 중복되지 않은 숫자 3개를 반환해야 한다.', () => {
            const result = generateRandomNumbers();
            expect(result).toHaveLength(3); // 길이는 3이어야 함
            expect(new Set(result).size).toBe(3); // 중복된 숫자가 없어야 함
            result.forEach((num) => {
                expect(num).toBeGreaterThanOrEqual(1);
                expect(num).toBeLessThanOrEqual(9);
            });
        });

        test('100번 실행해도 중복된 숫자가 없어야 한다.', () => {
            for (let i = 0; i < 100; i++) {
                const result = generateRandomNumbers();
                expect(new Set(result).size).toBe(3);
            }
        });
    });

    // 3. calculateResult 함수 테스트
    describe('calculateResult 함수', () => {
        test('정확한 스트라이크와 볼을 계산해야 한다.', () => {
            const computerNumbers = [1, 2, 3];

            // 완전 일치 (3스트라이크)
            let result = calculateResult(computerNumbers, [1, 2, 3]);
            expect(result).toEqual({ strikes: 3, balls: 0 });

            // 일부 일치 (1스트라이크, 2볼)
            result = calculateResult(computerNumbers, [1, 3, 2]);
            expect(result).toEqual({ strikes: 1, balls: 2 });

            // 숫자만 일치하지만 위치는 모두 다른 경우 (3볼)
            result = calculateResult(computerNumbers, [3, 1, 2]);
            expect(result).toEqual({ strikes: 0, balls: 3 });

            // 완전 불일치 (낫싱)
            result = calculateResult(computerNumbers, [4, 5, 6]);
            expect(result).toEqual({ strikes: 0, balls: 0 });
        });
    });
    
});
    