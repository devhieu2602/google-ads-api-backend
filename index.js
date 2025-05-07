const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const { authenticate } = require('./googleAds');

const app = express();
app.use(bodyParser.json());

app.post('/create-account', async (req, res) => {
  const { managerId, accountName, currency, timeZone } = req.body;

  try {
    const result = await createGoogleAdsAccount(managerId, accountName, currency, timeZone);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

async function createGoogleAdsAccount(managerId, accountName, currency, timeZone) {
  const authClient = await authenticate();
  const googleAds = google.ads('v19');
  const customer = {
    descriptiveName: accountName,
    currencyCode: currency,
    timeZone: timeZone,
  };

  const response = await googleAds.customers.create({
    auth: authClient,
    requestBody: customer,
    managerCustomerId: managerId,
  });

  return response.data;
}

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
