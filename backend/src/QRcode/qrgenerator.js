const qrcode = require('qrcode');

generateQRCode = async(text) => {
    try{
        const qrData = await qrcode.toDataURL(text)
        console.log(qrData);
        return JSON.stringify(qrData);
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = generateQRCode;