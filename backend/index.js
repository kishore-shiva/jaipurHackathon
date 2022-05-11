const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const MFDBlockChain = require('./src/blockChain/MFDCertificateData');
var cors = require('cors')
const QRCode = require('./src/QRcode/qrgenerator');

const app = express();
const db = 'mongodb+srv://kishore:kishore@medanalysis.i0tbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(cors())

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', routes);

//intializing the blockChain
const blockChain = new MFDBlockChain();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`[INFO] Server started on PORT ${PORT}`)); 

// module.exports = blockChain;