## 프로젝트 작업의도

타입스크립트 객체지향프로그래밍(OOP)를 적용해보는
실습 프로젝트 목적으로 작업하였습니다.

## 환경 변수 설정

컴파일러 옵션 설정

```json
// tsconfig
{
    "include": ["src"],
    "compilerOptions": {
        "outDir": "build",
        "esModuleInterop": true,
        "target": "ES6",
        "lib": ["ES6"],
        "strict": true,
        "module": "CommonJS"
    }
}
```

## 프로젝트 설명

타입스크립트 객체지향프로그래밍 기반으로 작업한 블록체인입니다.

### 블록체인이란?

블록체인은 데이터베이스 기반으로 일방향성을 갖으며 오로지 블록을 추가만 할 수 있다.
블록의 구성 요소는 크게 hash, prevHash, height, data로 이뤄져 있다.
이 중 hash는 chain 배열 형태로 이전 해쉬와 현재 해쉬의 요건이 맞아야만 block으로 쌓일 수 있다.

### TypeChain OOP

#### interface : BlockShape

```js
interface BlockShape {
    hash: string; // 일방향 함수
    prevHash: string;
    height: number;
    data: string;
}
```

#### class Block

-   hash는 "crpyto" module의 형태를 따름
-   hash 생성 프로퍼티 (블록 구성 요소)

```js
class Block implements BlockShape {
    public hash: string;
    constructor(
        public readonly prevHash: string,
        public readonly height: number,
        public readonly data: string,
    ) {
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    static calculateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash('sha256').update(toHash).digest('hex');
    }
}
```

#### class BlockChain

블록 연쇄 작용

-   기존 블록은 class level instance
-   method

1.  해쉬 값 얻기 : getPrevHash()
2.  블록 추가하기 : addBlock(data)
3.  블록 값 얻기 : getBlock(),

-   해킹 방지를 위해 readonly 속성으로 return

```js
class BlockChain {
    private blocks: Block[];
    constructor() {
        this.blocks = [];
    }

    private getPrevHash() {
        // 첫 해쉬가 없으면 아무것도 리턴 하지 않음
        //  해쉬가 존재한다면 블럭의 마지막 해쉬를 리턴
        if (this.blocks.length === 0) return '';
        return this.blocks[this.blocks.length - 1].hash;
    }

    public addBlock(data: string) {
        const newBlock = new Block(
            this.getPrevHash(),
            this.blocks.length + 1,
            data,
        );
        this.blocks.push(newBlock);
    }

    public getBlock(): readonly Block[] {
        // 체이닝을 배열로 getBlock을 얻게 되면 외부에서 chain 연결은 불가 하다.
        // 단, 여전히 외부에서 getBlock매서드를 접근할 수 있다. => 해결 방법 readonly
        return [...this.blocks];
    }
}
```

## 프로젝트 후기

이번 프로젝트를 통해 블록체인에 대한 기본적인 이론을 알게 되었고,
해당 이론을 바탕으로 객체지향프로그래밍 구현을 할 수 있는 좋은 경험이었습니다.

그리고, 자주 사용되진 않겠지만 타입스크립트의 환경변수 설정부터 .d.ts 모듈의 설정,
JSDOC까지 처음 알게되는 지식이 많았고, 배운 지식을 바탕으로 프로젝트에 적용할 수 있는 점이
정말 좋았다고 생각합니다.
