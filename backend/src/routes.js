const express = require('express');
const router = express.Router();
const Seller = require('./models/seller');
const Buyer = require('./models/buyer');

router.get('/', (req, res) => { 
    res.json();
})

router.post('/sellerLogin', async(req, res) => {
    const Username = req.body.username;
    const Password = req.body.password;

    const seller = await Seller.findOne({username: Username, password: Password});
    if(seller == null){
        res.status(404).send("invalid username/password");
    }
    if(seller){
        res.status(200).send("login successfull");
    }
});

router.post('/buyerLogin', async(req, res) => {
    const Username = req.body.username;
    const Password = req.body.password;

    const buyer = await Buyer.findOne({username: Username, password: Password});
    if(buyer == null){
        res.status(404).send("invalid username/password");
    }
    if(buyer){
        res.status(200).send("login successfull");
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
        nationalOrganizationID: req.body.nationalOrganizationID,
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


module.exports = router;