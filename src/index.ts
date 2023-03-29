import crypto from 'crypto';

// 블록체인은 Database 기반으로 오로지 추가만 가능함
interface BlockShape {
    hash: string; // 일방향 함수
    prevHash: string;
    height: number;
    data: string;
}
// 블록들이 모여있는 체인
class Block implements BlockShape {
    public hash: string;
    constructor(
        public prevHash: string,
        public height: number,
        public data: string,
    ) {
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    static calculateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash('sha256').update(toHash).digest('hex');
    }
}
