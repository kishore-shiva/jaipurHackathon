const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const MFDBlockChain = require('./src/blockChain/MFDCertificateData');
var cors = require('cors')

const app = express();
const db = 'mongodb+srv://kishore:xW6caZdGwJDQ7Vr@cluster0.vlhn5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`[INFO] Server started on PORT ${PORT}`)); 
