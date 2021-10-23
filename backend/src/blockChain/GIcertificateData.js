const jwt = require('jsonwebtoken');
const secretKey = require('../../secretKey');
const Block = require('./block');
const fs = require('fs');
const path = require('path');

class blockChain{

    blockChain = "";
    previousHash = "";

    initialGICertificateData = [
        {
            GINumber:100,
            CertificateNumber: 400,
            issueDate: '22-10-2021',
            productClass: '40',
            AssociationID: '50'
        },
        {
            GINumber: 101,
            CertificateNumber: 401,
            issueDate: '22-10-2021',
            productClass: '41',
            AssociationID: '51'
        },
        {
            GINumber: 102,
            CertificateNumber: 401,
            issueDate: '22-10-2021',
            productClass: '42',
            AssociationID: '52'
        },
        {
            GINumber: 103,
            CertificateNumber: 402,
            issueDate: '22-10-2021',
            productClass: '43',
            AssociationID: '53'
        },
        {
            GINumber: 104,
            CertificateNumber: 403,
            issueDate: '22-10-2021',
            productClass: '44',
            AssociationID: '54'
        }
    ];

    //constructing the intial blockChain with some intial values:
    constructor(){
        for(const i in this.initialGICertificateData){
            let a = new Block(this.initialGICertificateData[i], this.previousHash);
            this.previousHash = a.hash;
            this.blockChain = this.previousHash;
        }

        const new_payload = {
            GINumber: 105,
            CertificateNumber: 404,
            issueDate: '22-10-2021',
            productClass: '45',
            AssociationID: '55'
        }
        this.insertData(new_payload);

        let JSONData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./blockChainDatabase.json")));
        JSONData.GICertificateHash = this.previousHash;
        fs.writeFileSync(path.resolve(__dirname, "./blockChainDatabase.json"), JSON.stringify(JSONData));

        this.displayBlockChain();
    }
        
    displayBlockChain(){
        console.log('displaying the blockchain');
        console.log('previous hash: '+this.previousHash);
        while(this.previousHash != ""){
            jwt.verify(this.previousHash, secretKey, (err, data) => {
                if(err){
                    this.previousHash = "";
                    console.log(err);
                }
                else{
                    console.log(data);
                    this.previousHash = data.prevHash;
                }
            })
        }
    }

    insertData(payload){
        let a = new Block(payload, this.previousHash);
        this.previousHash = a.hash;
        this.blockChain = this.previousHash;

    }

    getData(){
        //FIXME: get array of objects without the hash values
    }
}

module.exports = blockChain;    

// //crypto implementation (trial):
// //Checking the crypto module
// const crypto = require('crypto');
// const algorithm = 'aes-256-cbc'; //Using AES encryption
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

// //Encrypting text
// function encrypt(text) {
//    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//    let encrypted = cipher.update(text);
//    encrypted = Buffer.concat([encrypted, cipher.final()]);
//    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }

// // Decrypting text
// function decrypt(text) {
//    let iv = Buffer.from(text.iv, 'hex');
//    let encryptedText = Buffer.from(text.encryptedData, 'hex');
//    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
//    let decrypted = decipher.update(encryptedText);
//    decrypted = Buffer.concat([decrypted, decipher.final()]);
//    return decrypted.toString();
// }

// // Text send to encrypt function
// var hw = encrypt("Welcome to Tutorials Point...")
// console.log('encrypted data : ',hw);
// console.log(decrypt({
//     iv: '83d0705959da6a3456612ef7f4eda140',
//     encryptedData: 'c845683d8630c7c002ae27c99867adc3b85b057aae116ce49fc19d7566e91113'
//   }))