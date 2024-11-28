# 2024년 11월 20일 과제

## 과제 내용

**`아주 간단한 숫자야구게임을 만들어보기`**

## 과제 수행 기간

### `12월 1일(일요일)까지`

## 과제 수행 방법

**`쉐어 코딩을 통해 공동으로 구현`**

**`각 팀별로 과제를 하나씩 구현`**

**3팀 : 김유라 / 김채은 / 이유승**

**`AI 사용 금지`**

- 과제 내용을 넣기만 해도 완성된 코드를 바로 뽑아주기 때문에, 제대로 된 학습이 이루어지지 않는다..

**`쉐어 코딩의 목적`** 

- 서로의 코드를 공개하는 것에 익숙해지기 위함
- 코드와 나를 동일시하지 말자
- 서로 중요하게 생각하게 부분을 공유하는 것 (지식 공유)
- 내 코드를 남에게 설명하는 능력과 남의 코드를 이해하는 능력 키우기

**`쉐어 코딩시 주의점`**

- 동료들을 무시하고 혼자 앞서나가지 말기.
- 서로 배려해주기.
    
    **협동에서는 무엇을 하지 말아야 하는가? [안티 페어 프로그래밍 패턴](https://news.hada.io/topic?id=6142) 참조.**

## 과제 제출 방법

**`repository를 fork하고 원본repository에 PR을 열어주세요`**

[**과제 제출 Git Repo**](https://github.com/weggle-plus/javascript-baseball)

## 과제 요구 사항

```jsx
- 1부터 9까지 서로 다른 수로 이루어진 3자리의 수를 맞추는 게임입니다.
- 컴퓨터와 싸우는 게임으로 실제 나와 같이 게임을 할수 있도록 한다.
```

```
- 게임 시작
    - **1**을 입력하면 게임을 시작합니다.
    - **9**를 입력하면 애플리케이션을 종료합니다.
- 게임을 시작하면 1~9 서로 다른 임의의 수 3개를 선택합니다. 게임 플레이어는 컴퓨터가 생각하고 있는 3개의 숫자를 입력하고, 컴퓨터는 입력한 숫자에 대한 결과를 출력해야 합니다.
- 번호를 입력 한 뒤에 힌트에 대한 정의
    - 스트라이크: 이전에 뽑은 숫자에서 위치와 실제 숫자와 같은 경우
    - 볼: 이전에 뽑은 숫자에서 위치는 다르지만 숫자가 존재하는 경우
    - 낫싱: 이전에 뽑은 숫자에서 아예 존재하지 않은 경우
- 애플리케이션을 종료하는 값(9)를 입력하지 전까지 게임을 계속 진행할 수 있다.
```

## 출력 예시

```
게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.
1
```

```
컴퓨터가 숫자를 뽑았습니다.
```

```
숫자를 입력해주세요: 123
1볼 1스트라이크
숫자를 입력해주세요: 145
1볼
숫자를 입력해주세요: 671
2볼
숫자를 입력해주세요: 216
1스트라이크
숫자를 입력해주세요: 713
3스트라이크
```

```
3개의 숫자를 모두 맞히셨습니다.
-------게임 종료-------
```

```
게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.
9
```

```
애플리케이션이 종료되었습니다.
```