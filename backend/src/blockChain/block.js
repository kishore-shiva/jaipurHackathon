const jwt = require('jsonwebtoken');
const secretKey = require('../../secretKey');

class Block {
    constructor(data, prevHash = "") {
        this.timestamp = Date.now();
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.computeHash()
    }
  
    computeHash() {
        let payload = {
            data: this.data,
            timestamp: this.timestamp,
            prevHash: this.prevHash
        };
        return jwt.sign(payload, secretKey, {
            expiresIn: '1y',
          });
    }

}

module.exports = Block;