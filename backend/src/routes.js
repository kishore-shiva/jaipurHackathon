const express = require('express');
const router = express.Router();
const Seller = require('./models/seller');
const Buyer = require('./models/buyer');
const blockChain = require('./blockChain/MFDCertificateData');
const QRCode = require('./QRcode/qrgenerator');
const app = express();

let verifiedProducts = [];

router.get('/', async(req, res) => { 
    const seller = await Seller.find();
    res.json(seller); 
})

router.post('/sellerLogin', async(req, res) => {
    const Username = req.body.username;
    const Password = req.body.password;

    const seller = await Seller.findOne({username: Username, password: Password});
    // if(seller == null){
    //     res.status(404).json({"message": "invalid username/password"});
    // }
    // if(seller){
    //     res.status(200).json({"message": seller});
    // }
    res.status(200).json({"message": seller});
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
    const QRData = 'companyID: '+blockChainPayload.associationID+'\nManufactured Location: '+blockChainPayload.mfdLocation+'\nManufactured product name:'+blockChainPayload.mfdProductName+'\nSeller company: '+blockChainPayload.sellerName+'\nSeller Location: '+blockChainPayload.sellerLocation;
    QRCode(QRData).then(function(val){
        console.log('********QR code: ***************');
        console.log(val);
        // res.set('Content-Type', 'text/html');
        // res.send(Buffer.from('<img src='+val+'>'));
        res.status(200).json({"data": val});

    }).catch(function(err){
        console.log(err);
        res.status(500).send('internal server error');
    });
})

router.get('/verfyqrcode/:productID', (req, res) => {
    const productID = req.params.productID;
    console.log(verifiedProducts);
    for(let i=0; i<verifiedProducts.length; i++){
        if(verifiedProducts[i].productID === productID){
            res.status(200).send('productID: '+verifiedProducts[i].productID+
            ' already been verified at '+verifiedProducts[i].timestamp);
            return;
    }
    }
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    const payload = {
        "productID" : productID,
        "timestamp" : timestamp
    }
    verifiedProducts.push(payload);
    res.status(200).send("Product Verified Successfully");
})

router.get('/generateqrcode/:productID', (req, res) =>{
    const productID = req.params.productID;
    const url = 'http://localhost:5000/verifyqrcode/'+productID;
    QRCode(url).then(function(val){
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

app.use(`/.netlify/functions/api`, router);

module.exports = router;
