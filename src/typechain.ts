import crypto from 'crypto';

// 블록의 구성 요소
interface BlockShape {
    hash: string; // 일방향 함수
    prevHash: string;
    height: number;
    data: string;
}
/**
 * 블록체인은 데이터베이스로 이뤄져있으며, 일방향성을 갖으며 오로지 블록 추가만 가능
 * param {prevHash, height, data}
 * method {calculateHash(prevHash, height, data)} = hash
 * returns {crpyto.createHash(Version).update(value).digest(Version)}
 */
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

/**
 * BlockChain 클래스는 Block 클래스를 연결 시키는 역할
 * param {blocks} : Block class의 []
 * method getPrevHash() return : this.blocks[this.blocks.length -1].hash
 * method addBlock(data) : Block.block(getPrevHash, height + 1, data)
 */

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

const blockChain = new BlockChain();
blockChain.addBlock('First one');
blockChain.addBlock('Second one');
blockChain.addBlock('Third one');
blockChain.addBlock('Fourth one');

// 해킹 위험이 존재 한다.
// readonly로 인해 외부에서 접근 불가능하다.
// blockChain.getBlock().push(new Block('bit', 123, 'HACKKKKKKKKED!!!'));

console.log(blockChain.getBlock());
