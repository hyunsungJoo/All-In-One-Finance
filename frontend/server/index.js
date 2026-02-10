const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
// load environment variables from server/.env
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch})=>fetch(...args));
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/upbit/accounts', async (req, res) => {
  const access = process.env.UPBIT_ACCESS_KEY;
  const secret = process.env.UPBIT_SECRET_KEY;
  if (!access || !secret) {
    return res.status(500).json({ error: 'Missing UPBIT keys on server environment.' });
  }

  const payload = {
    access_key: access,
    nonce: uuidv4(),
  };

  const token = jwt.sign(payload, secret);

  try {
    const r = await fetch('https://api.upbit.com/v1/accounts', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await r.json();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('Upbit proxy listening on http://localhost:3001'));
