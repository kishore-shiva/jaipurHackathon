const jwt = require('jsonwebtoken');
const secretKey = require('../../secretKey');
const Block = require('./block');
const GIcertificateData = require('./GIcertificateData');
const fs = require('fs');
const path = require('path');

class blockChain{

    MFDCertificate = "";
    previousHash = "";

    //auto-increment and constant variables:
    CompanyID = 100;
    mfdLocation = 'Kanchepuram';
    mfdProductName = 'Silk Saree';
    sellerName = "annachi";
    sellerLocation = "indie shop, chennai";

    constructor(){
        const GI_certificateData = new GIcertificateData();
        let GICertificateBlockChain = GI_certificateData.blockChain;

        //inserting data in blockchain
        while(GICertificateBlockChain != ""){
            jwt.verify(GICertificateBlockChain, secretKey, (err, data) => {
                if(err){
                    GICertificateBlockChain = "";
                    console.log(err);
                }
                else{
                    GICertificateBlockChain = data.prevHash;
                    //generating new block here:
                    const payload = {
                        associationID: data.data.AssociationID,
                        CompanyID: this.CompanyID++,
                        mfdLocation: this.mfdLocation,
                        mfdProductName: this.mfdProductName,
                        sellerName: this.sellerName,
                        sellerLocation: this.sellerLocation,
                    }
                    this.insertData(payload);
                } 
            })
        }

        let JSONData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./blockChainDatabase.json")));
        JSONData.MFDCertificateHash = this.previousHash;
        fs.writeFileSync(path.resolve(__dirname, "./blockChainDatabase.json"), JSON.stringify(JSONData));

        this.displayBlockChain();
    }
        
    displayBlockChain(){
        console.log('----------displaying the MFD blockchain----------');
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