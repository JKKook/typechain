"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
/**
 * 블록체인은 데이터베이스로 이뤄져있으며, 일방향성을 갖으며 오로지 블록 추가만 가능
 * param {prevHash, height, data}
 * method {calculateHash(prevHash, height, data)} = hash
 * returns {crpyto.createHash(Version).update(value).digest(Version)}
 */
class Block {
    constructor(prevHash, height, data) {
        this.prevHash = prevHash;
        this.height = height;
        this.data = data;
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    static calculateHash(prevHash, height, data) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto_1.default.createHash('sha256').update(toHash).digest('hex');
    }
}
/**
 * BlockChain 클래스는 Block 클래스를 연결 시키는 역할
 * param {blocks} : Block class의 []
 * method getPrevHash() return : this.blocks[this.blocks.length -1].hash
 * method addBlock(data) : Block.block(getPrevHash, height + 1, data)
 */
class BlockChain {
    constructor() {
        this.blocks = [];
    }
    getPrevHash() {
        // 첫 해쉬가 없으면 아무것도 리턴 하지 않음
        //  해쉬가 존재한다면 블럭의 마지막 해쉬를 리턴
        if (this.blocks.length === 0)
            return '';
        return this.blocks[this.blocks.length - 1].hash;
    }
    addBlock(data) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock);
    }
    getBlock() {
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
