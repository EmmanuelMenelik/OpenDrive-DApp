
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded.');

    try {
        const fs = require('fs');
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('file', fs.createReadStream(file.path));

        const metadata = JSON.stringify({ name: file.originalname });
        formData.append('pinataMetadata', metadata);

        const options = JSON.stringify({ cidVersion: 1 });
        formData.append('pinataOptions', options);

        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            maxContentLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'pinata_api_key': process.env.PINATA_API_KEY,
                'pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY
            }
        });

        res.json({
            success: true,
            ipfsHash: response.data.IpfsHash
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Upload to IPFS failed.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
