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
    
