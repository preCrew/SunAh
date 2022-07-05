### ToDoList 배포
http://localhost:3000/

<b>skills</b>
+ Library: React
+ Language: TypeScript, Dart-Sass
+ TypeScript Version: 4.7.4
+ Sass Version: 1.53.0

### [제네릭]
+ 리액트의 컴포넌트를 만들때 자주 활용되는 특징이다
+ 특히, 한가지 타입보다 여러 가지 타입에서 동작하는 컴포넌트를 생성하는데 사용된다

#### 제네릭의 한 줄 정의와 예시
+ 제네릭이란 타입을 마치 함수의 파라미터처럼 사용하는 것을 의미한다
```js
function getText<T>(text: T): T {
  return text;
}
```
```
먼저 함수의 이름 바로 뒤에 <T> 라는 코드를 추가했습니다. 
그리고 함수의 인자와 반환 값에 모두 T 라는 타입을 추가합니다. 
이렇게 되면 함수를 호출할 때 넘긴 타입에 대해 타입스크립트가 추정할 수 있게 됩니다. 
따라서, 함수의 입력 값에 대한 타입과 출력 값에 대한 타입이 동일한지 검증할 수 있게 됩니다.
```
+ 위 함수는 제네릭 기본 문법이 적용된 형태이다
+ ```getText<string>('hi')``` 를 호출 했을 때 함수에서 제네릭이 어떻게 동작하는지 살펴보자
+ 먼저 함수에서 제네릭 타입이 <string>으로 된다

```js
 function getText<string>(text: T): T {
  return text;
}       
```
+ 그리고 나서 함수의 인자로 ```hi``` 라는 값을 아래와 같이 넘기게 되면

```js
function getText<string>(text: string): string {
  return text;
}        
```        
+ 위와 같은 코드가 처음의 기본제네릭 코드와 같은 의미를 가지게 된다
        
#### 제네릭을 사용하는 이유 
        
```js
function logText(text: any): any {
  return text;
}        
``` 
+ 위의 코드는 함수의 인자로 어떤 타입이 들어갔고 어떤 값이 반환되는지는 알 수가 없다
+ 왜냐하면 any라는 타입은 타입 검사를 하지 않기 때문
        
+ 이러한 문제점을 해결할 수 있는 것이 제네릭이다
```js
function logText<T>(text: T): T {
  return text;
}        
```        
+ 두가지 방법으로 호출할수 있다        
```js
// #1
const text = logText<string>("Hello Generic");
// #2
const text = logText("Hello Generic");
```                                

#### 제네릭 타입 변수
```js
function logText<T>(text: T): T {
  console.log(text.length); // Error: T doesn't have .length
  return text;
}        
```   
+ 위 코드가 오류를 발생시키는 이유는 text에 .length가 있다는 단서는 어디에도 없기 때문이다
+ 그래서 이런 경우에는 아래와 같이 제네릭에 타입을 줄 수가 있다

```js
function logText<T>(text: T[]): T[] {
  console.log(text.length); // 제네릭 타입이 배열이기 때문에 `length`를 허용합니다.
  return text;
}        
```        

혹은 더 명시적으로
아래와 같이 사용할수 있다        
        
```js
function logText<T>(text: Array<T>): Array<T> {
  console.log(text.length);
  return text;
}        
```        

```
함수에 [1,2,3]처럼 숫자로 이뤄진 배열을 받으면 반환 값으로 number를 돌려주는 것이죠.
이런 방식으로 제네릭을 사용하면 꽤 유연한 방식으로 함수의 타입을 정의해줄 수 있습니다.        
```        
#### 제네릭 타입

+ 제네릭 인터페이스에 대해 알아보자 아래의 두 코드는 같은 의미이다        

```js
function logText<T>(text: T): T {
  return text;
}
// #1
let str: <T>(text: T) => T = logText;
// #2
let str: {<T>(text: T): T} = logText;        
```     
+ 위와 같은 변형 방식으로 제네릭 인터페이스 코드를 다음과 같이 작성할 수 있습니다.
        
```js
interface GenericLogTextFn {
  <T>(text: T): T;
}
function logText<T>(text: T): T {
  return text;
}
let myString: GenericLogTextFn = logText; // Okay        
```  

또는         
        
```js
 interface GenericLogTextFn<T> {
  (text: T): T;
}
function logText<T>(text: T): T {
  return text;
}
let myString: GenericLogTextFn<string> = logText;       
```     

#### 제네릭 클래스
          
```js
class GenericMath<T> {
  pi: T;
  sum: (x: T, y: T) => T;
}

let math = new GenericMath<number>();
```       
```
제네릭 클래스를 선언할 때 클래스 이름 오른쪽에 <T>를 붙여줍니다.
그리고 해당 클래스로 인스턴스를 생성할 때 
타입에 어떤 값이 들어갈 지 지정하면 됩니다.
```       
```
조금 전에 살펴본 인터페이스처럼 
제네릭 클래스도 클래스 안에 정의된 속성들이 
정해진 타입으로 잘 동작하게 보장할 수 있습니다.          
```
          
#### 제네릭 제약 조건
잠시 이전 코드를 살펴보자
```js
function logText<T>(text: T): T {
  console.log(text.length); // Error: T doesn't have .length
  return text;
}          
```       
```
인자의 타입에 선언한 T는 아직 어떤 타입인지 구체적으로 정의하지 않았기 때문에 length 코드에서 오류가 납니다. 
이럴 때 만약 해당 타입을 정의하지 않고도 length 속성 정도는 허용하려면 아래와 같이 작성합니다.
```
```js
interface LengthWise {
  length: number;
}

function logText<T extends LengthWise>(text: T): T {
  console.log(text.length);
  return text;
}
```
+ 위와 같이 작성하게 되면 타입에 대한 강제는 아니지만 length에 대해 동작하는 인자만 넘겨받을 수 있게 된다 
          
```js
logText(10); // Error, 숫자 타입에는 `length`가 존재하지 않으므로 오류 발생
logText({ length: 0, value: 'hi' }); // `text.length` 코드는 객체의 속성 접근과 같이 동작하므로 오류 없음          
```          
#### 객체의 속성을 제약하는 방법
          
```js
function getProperty<T, O extends keyof T>(obj: T, key: O) {
  return obj[key];  
}
let obj = { a: 1, b: 2, c: 3 };

getProperty(obj, "a"); // okay
getProperty(obj, "z"); // error: "z"는 "a", "b", "c" 속성에 해당하지 않습니다.          
```          
제네릭을 선언할 때 <O extends keyof T> 부분에서<
첫 번째 인자로 받는 객체에 없는 속성들은 접근할 수 없게끔 제한하였다         
          
### [클래스 타입정의]

#### Accessor (접근자)

+ 아래 간단한 코드를 제시한다
+ 구성 목록은 다음과 같다


+ Class
  - field (변수 초기화)
  - get
  - set

```js
class Developer {
  private name: string;
  
  get name(): string {
    return this.name;
  }

  set name(newValue: string) {
    if (newValue && newValue.length > 5) {
      throw new Error('이름이 너무 깁니다');
    }
    this.name = newValue;
  }
}
const josh = new Developer();
josh.name = 'Josh Bolton'; // Error
josh.name = 'Josh';
```

#### Abstract Class (추상클래스)
+ 추상 클래스(Abstract Class)는 인터페이스와 비슷한 역할을 하면서도 조금 다른 특징을 갖는다
+ 추상 클래스는 특정 클래스의 상속 대상이 되는 클래스이며 좀 더 상위 레벨에서 속성, 메서드의 모양을 정의한다

```js
abstract class Developer {
  abstract coding(): void; // 'abstract'가 붙으면 상속 받은 클래스에서 무조건 구현해야 함
  drink(): void {
    console.log('drink sth');
  }
}

class FrontEndDeveloper extends Developer {
  coding(): void {
    // Developer 클래스를 상속 받은 클래스에서 무조건 정의해야 하는 메서드
    console.log('develop web');
  }
  design(): void {
    console.log('design web');
  }
}
const dev = new Developer(); // error: cannot create an instance of an abstract class
const josh = new FrontEndDeveloper();
josh.coding(); // develop web
josh.drink(); // drink sth
josh.design(); // design web
```

### [연산자를 이용한 타입정의]
#### 유니온 타입 (OR 논리연산이라 생각하면 편함)

+ 유니온 타입(Union Type)이란 자바스크립트의 OR 연산자(||)와 같이 A이거나 B이다 라는 의미의 타입이다.
+ 함수의 파라미터 text에는 문자열 타입이나 숫자 타입이 모두 올 수 있도록 만들수 있다

```js
function logText(text: string | number) {
  // ...
}
```

+ 아래의 경우는 any를 사용할경우 toFixe() 기능을 사용하지 못한다 (소수점 자릿수에 따라 자르는 기능)

```js
// any를 사용하는 경우
function getAge(age: any) {
  age.toFixed(); // 에러 발생, age의 타입이 any로 추론되기 때문에 숫자 관련된 API를 작성할 때 코드가 자동 완성되지 않는다.
  return age;
}
```
+ 유니온 타입을 사용하여 if문에 따라 toFixe()기능을 사용할지 하지 않을지 결정할수 있어 오류가 생기지 않는다
+ 
```js
// 유니온 타입을 사용하는 경우
function getAge(age: number | string) {
  if (typeof age === 'number') {
    age.toFixed(); // 정상 동작, age의 타입이 `number`로 추론되기 때문에 숫자 관련된 API를 쉽게 자동완성 할 수 있다.
    return age;
  }
  if (typeof age === 'string') {
    return age;
  }
  return new TypeError('age must be number or string');
}
```
#### Intersection Type (AND 논리연산이라 생각하면 편함)
+ 인터섹션 타입(Intersection Type)은 여러 타입을 모두 만족하는 하나의 타입을 의미함
+ interface 두개를 정의하고 하나의 변수에 합치는것을 말함

```js
interface Person {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: number;
}
type Capt = Person & Developer;
```
+ 결과적으로 Capt 라는 타입은 아래와 같은 구성을 가진다

```
{
  name: string;
  age: number;
  skill: string;
}
```

#### Union Type을 쓸 때 주의할 점
+ 아마 논리적으로 유니온 타입은 OR, 인터섹션은 AND라고 생각할텐데 인터페이스와 같은 타입을 다룰 때는 이와 같은 논리적 사고를 주의해야한다

```js
interface Person {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: string;
}
function introduce(someone: Person | Developer) {
  someone.name; // O 정상 동작
  someone.age; // X 타입 오류
  someone.skill; // X 타입 오류
}
```

+ 여기서 introduce() 함수의 파라미터인 somenone의 타입을 Person, Developer 둘중 하나로 정의되도록 만들었다
+ 유니온 타입은 A도 될 수 있고 B도 될 수 있는 타입이지라고 생각하면 파라미터의 타입이 Person도 되고 Developer도 될테니까 
+ 함수 안에서 당연히 이 인터페이스들이 제공하는 속성들인 age나 skill를 사용할 수 있겠지라고 생각할 수 있는데 이는 **오류를 발생시킨다**
+ 타입스크립트 관점에서는 introduce() 함수를 호출하는 시점에 Person 타입이 올지 Developer 타입이 올지 알 수가 없다
+ 때문에 어느 타입이 들어오든 간에 오류가 안 나는 방향으로 타입을 추론하게 된다

#### Intersection Type을 쓸 때 주의할 점

```js
const capt: Person = { name: 'capt', age: 100 };
introduce(capt); // 만약 `introduce` 함수 안에서 `someone.skill` 속성을 접근하고 있으면 함수에서 오류 발생

const tony: Developer = { name: 'tony', skill: 'iron making' };
introduce(tony); // 만약 `introduce` 함수 안에서 `someone.age` 속성을 접근하고 있으면 함수에서 오류 발생

function introduce(someone: Person | Developer) {
  console.log(someone.name); // O 정상 동작
}
```

+ 결과적으로 introduce() 함수 안에서는 별도의 타입 가드(Type Guard)를 이용하여 타입의 범위를 좁히지 않는 이상 
+ 기본적으로는 Person과 Developer 두 타입에 공통적으로 들어있는 속성인 name만 접근할 수 있다.

### [인터페이스]

+ 인터페이스를 쓰지 않았을 경우 ↓↓

        let person = { name: 'Capt', age: 28 };
        
        function logAge(personObj: { age: number }) {
            console.log(personObj.age); // 출력=28
        }
        logAge(person); // person객체를 전달


+ 매우 복잡스러움
+ 인터페이스를 쓰면 깔끔해진다

        // 인터페이스를 쓴 경우
        interface personAge {
            age: number;
        }

        function logAge(obj: personAge) {
            console.log(obj.age);
        }
        let person = { name: 'Capt', age: 28 };
        logAge(person); //
        

+ 타입 스크립트 인터페이스 특징
    - 인자로 받는 객체의 속성 개수와 인터페이스의 속성 개수를 일치시키지 않아도 된다
    - 인터페이스로 선언된 속성의 순서를 지키지 않아도 상관없다


### 인터페이스의 속성

<b>옵션속성</b>

+ 받는 경우는 속성의 개수를 일치시키지 않아도 된다고 했다
+ 하지만 보내는 경우(호출하는경우) 반드시 속성의 개수와 타입을 맞춰야 하는데
+ 옵션속성을 이용해서 특정 속성을 필수가 아니게 지정할수 있다
+ 속성의 끝에 ?를 붙이면 사용할수 있다

        // 옵션속성 사용
        interface CraftBeer {
            name: string;
            hop?: number;  
        }

         let myBeer = {
             name: 'Saporo'
         };
        function brewBeer(beer: CraftBeer) {
            console.log(beer.name); // Saporo
        }
        brewBeer(myBeer); //호출
        
#### 인터페이스의 타입체킹

+ 인터페이스에 정의되어있지 않은 속성을 사용하고 싶다면!

                interface CraftBeer {
                        brand?: string;
                }

                function brewBeer(beer: CraftBeer) {
                        // ..
                }

                let myBeer = { brandon: 'what' }';
                brewBeer(myBeer as CraftBeer);


+ 만약 의하지 않은 속성들을 추가로 사용하고 싶을 때는 아래의 방법을 사용한다

                interface CraftBeer {
                brand?: string;
                [propName: string]: any;
                }

#### 함수 타입

+ 인터페이스는 함수의 타입을 정의할 때에도 사용할 수 있다
+ 함수의 인자의 타입과 반환 값의 타입을 정의한다

                interface login {
                        (username: string, password: string): boolean;
                }
        
                let loginUser: login;
                        loginUser = function(id: string, pw: string) {
                        console.log('로그인 했습니다');
                        return true;
                }
                
#### 클래스 타입

+ 함수와 마찬가지로 클래스가 일정 조건을 만족하도록 타입 규칙을 정할 수 있다

                interface CraftBeer {
                         beerName: string;
                nameBeer(beer: string): void;
                }

                class myBeer implements CraftBeer {
                        beerName: string = 'Baby Guinness';
                        nameBeer(b: string) {
                this.beerName = b;
                }
                constructor() {}
                }
#### 인터페이스 확장

+ 타입스크립트에서는 여러 인터페이스를 상속받아 사용할 수 있다

        interface Person{
                name: String;
        }

        interface Developer extends Person, Drinker{
                skill: string;
        }

        interface Drinker {
                drink: string;
        }

        let fe = {} as Developer;
        fe.name = 'josh';
        fe.skill = 'typeScript';
        fe.drink = 'Beer';

        console.log("확인해볼게요: " + fe.drink);

#### 하이브리드 타입

+ 인터페이스 역시 여러 가지 타입을 조합하여 만들 수 있다
+ 아래는 함수 타입이면서 객체 타입을 정의할 수 있는 인터페이스를 정의하고 있다

                interface CraftBeer {
                        (beer: string): string;
                brand: string;
                brew(): void;
                }

                function myBeer(): CraftBeer {
                        let my = (function(beer: string) {}) as CraftBeer;
                         my.brand = 'Beer Kitchen';
                my.brew = function() {};
                return my;
                }

                let brewedBeer = myBeer();
                brewedBeer('My First Beer');
                brewedBeer.brand = 'Pangyo Craft';
                brewedBeer.brew();


---

### Type Script

타입스크립트로 변수나 함수와 같은 자바스크립트 코드에 타입을 정의할 수 있다
+ 사용방법
    -   변수명: 타입
    -   타입 표기(Type Annotation)라고 한다 

### [변수]


#### String
    let str: string = 'hi';
    
#### Number
    let num: number = 10;
#### Boolean
    let isLoggedIn: boolean = false;
#### Array
    let arr: number[] = [1,2,3];
    let arr: Array<number> = [1,2,3];
#### Tuple  
튜플은 배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식을 의미한다     
    
    let arr: [string, number] = ['hi', 10];
    
만약 정의하지 않은 타입, 인덱스로 접근할 경우 오류가 발생됨

    arr[1].concat('!'); // Error, 'number' does not have 'concat'
    arr[5] = 'hello'; // Error, Property '5' does not exist on type '[string, number]'.
    
#### Any
    모든 타입에서 허용된다
    
    let str: any = 'hi';
    let num: any = 10;
    let arr: any = ['a', 2, true];

#### Void
변수에는 undefined와 null만 할당하고, 함수에는 반환 값을 설정할수 없는 타입을 지정한다

    let unuseful: void = undefined;
      function notuse(): void {
      console.log('sth');
    }
    
### [함수]

---

크게 3가지 타입을 정의할 수 있다

+ 함수의 파라미터(매개변수)타입
+ 함수의 반환 타입
+ 함수의 구조 타입

기본 자바스크립트 코드 EX

    function sum(a, b) {
      return a + b;
    }
    
타입 스크립트를 적용한 이후

    function sum(a: number, b: number): number {
      return a + b; //함수의 반환 값에 타입 추가
    }

+ 함수의 반환 값에 타입을 정하지 않을 때는 void라도 사용한다

#### 함수의 인자
타입스크립트에서는 함수의 인자를 모두 필수 값으로 간주한다 <br>
따라서 함수의 매개변수를 설정하면 undefined 나 null 이라도 인자로 넘겨야하며 <br>
컴파일러에서 정의된 매개변수 값이 넘어왔는지 확인한다 <br>
정의된 매개변수값만 받을수 있고 추가로 인자를 받을수 없다

    function sum(a: number, b: number): number {
      return a + b;
    }
    sum(10, 20); // 30
    sum(10, 20, 30); // 에러, 지정된 매개변수값을 넘음
    sum(10); // 에러, 지정된 매개변수값 보다 적음

위의 얘기는 자바스크립트의 본래 특성과 반대된다<br>
하지만 매개변수의 갯수 만큼 인자를 넘기지 않아도 되는 특성을 이용하고 싶다면<br>
? 를 이용해서 아래와 같이 정의할 수 있다<br>

    function sum(a: number, b?: number): number {
      return a + b;
    }
    sum(10, 20); // 30
    sum(10, 20, 30); // error, too many parameters
    sum(10); // 10
    
함수에서 바로 매개변수를 초기화하여 사용하고 싶다면

    function sum(a: number, b = '100'): number {
     return a + b;
    } 
    sum(10, undefined); // 110
    sum(10); // 110
    
