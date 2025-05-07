const { google } = require('googleapis');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const SCOPES = ['https://www.googleapis.com/auth/adwords'];

async function authenticate() {
  const oauth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const authClient = google.auth.fromAPIKey(process.env.DEVELOPER_TOKEN);
  google.options({ auth: oauth2Client });

  return oauth2Client;
}

module.exports = { authenticate };
