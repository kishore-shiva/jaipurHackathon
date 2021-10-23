const express = require('express');
const router = express.Router();
const Seller = require('./models/seller');
const Buyer = require('./models/buyer');
const blockChain = require('../src/blockChain/MFDCertificateData');
const QRCode = require('./QRcode/qrgenerator');

router.get('/', async(req, res) => { 
    await Seller.deleteMany();
    res.send('deleted'); 
})

router.post('/sellerLogin', async(req, res) => {
    const Username = req.body.username;
    const Password = req.body.password;

    const seller = await Seller.findOne({username: Username, password: Password});
    if(seller == null){
        res.status(404).json({"message": "invalid username/password"});
    }
    if(seller){
        res.status(200).json({data: seller});
    }
});

router.post('/buyerLogin', async(req, res) => {
    const Username = req.body.username;
    const Password = req.body.password;

    const buyer = await Buyer.findOne({username: Username, password: Password});
    if(buyer == null){
        res.status(404).json({"message": "invalid username/password"});
    }
    if(buyer){
        res.status(200).json({data: buyer});
    }
});

router.post('/buyerSignup', async(req, res) => {
    const BuyerData = {
        username: req.body.username,
        password: req.body.password
    }
    console.log(BuyerData);

    try{
        const buyerData = new Buyer({
            username: req.body.username,
            password: req.body.password
        });
        await buyerData.save();

        res.status(202).json({"message" : "success!!!"});
    }
    catch(e){
        console.log(e);
        res.status(500).send("internal server error");
    }
})

router.post('/sellerSignup', async(req, res) => {
    SellerData = {
        username: req.body.username,
        password: req.body.password,
        companyName: req.body.companyName,
        companyID: req.body.companyID,
        ownername: req.body.ownername,
        mfdLocation: req.body.mfdLocation,
        associationID: req.body.associationID,
        officeAddress: req.body.officeAddress,
        typeOfGoods: req.body.typeOfGoods,
        companyEmail: req.body.companyEmail,
        goodReviews: req.body.good,
        badReviews: req.body.bad,
        trustablity: req.body.trustablity
    }

    try{
        await Seller.insertMany(SellerData);
        res.status(200).send("signup successfull");
    }
    catch(e){
        console.log(e);
        res.status(500).send("internal server error")
    }
})

router.post('/registerProduct', async(req, res) => {
    productInfo = { 
        "companyName": req.body.productName,
        "associationID": req.body.associationID,
        "officeAddress": req.body.officeAddress,
        "typeOfGoods": req.body.typeOfGoods,
        "companyEmail": req.body.companyEmail,
        "productName": req.body.productName,
        "productClass": req.body.productClass,    
        "mfdLocation": req.body.mfdLocation,
        "sellerName": req.body.sellerName,
        "sellerLocation": req.body.sellerLocation
    }
    const blockChainPayload = { 
        associationID: req.body.associationID,
        CompanyID: req.body.associationID,
        mfdLocation: req.body.mfdLocation,
        mfdProductName: req.body.productName,
        sellerName: req.body.sellerName,
        sellerLocation: req.body.sellerLocation,
    };
    const BlockChain = new blockChain();
    BlockChain.insertData(blockChainPayload);
    const QRData = JSON.stringify(blockChainPayload);
    QRCode(QRData).then(function(val){
        console.log('********QR code: ***************');
        console.log(val);
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<img src='+val+'>'));

    }).catch(function(err){
        console.log(err);
        res.status(500).send('internal server error');
    });
})

router.get('/generateqrcode', (req, res) =>{
    QRCode('thevdiya paya').then(function(val){
        console.log('********QR code: ***************');
        console.log(val);
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<img src='+val+'>'));

    }).catch(function(err){
        console.log(err);
    });

    

//     parse().then(function(val) {
//     console.log(val);
// }).catch(function(err) {
//     console.err(err);
// });
})

module.exports = router;