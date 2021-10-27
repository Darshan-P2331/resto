# Resto. food ordering website

### For live demo [click here](https://resto-webapp.herokuapp.com/)

 Technologies used:
 * [MongoDB](https://www.mongodb.com/)
 * [Express.js](https://expressjs.com/)
 * [React.js](https://reactjs.org/)
 * [Node.js](https://nodejs.org/)

 ## Getting started

 ### Installation

 ```bash
# Install dependencies
npm install-all
 ```

 Set environment variables
 ```bash
 CLIENT_URL=http://localhost:3000
 MONGO_URL=mongodb://localhost/"PORT"
 # Authentication
 ACTIVATION_TOKEN_SECRET="ACTIVATION_TOKEN_SECRET"
 ACCESS_TOKEN_SECRET="ACCESS_TOKEN_SECRET"
 REFRESH_TOKEN_SECRET="REFRESH_TOKEN_SECRET"
 # Cloudinary
 CLOUD_NAME="CLOUD_NAME"
 CLOUD_API_KEY="CLOUD_API_KEY"
 CLOUD_API_SECRET="CLOUD_API_SECRET"
 # googleapis OAuth2
 MAILING_SERVICE_CLIENT_ID="MAILING_SERVICE_CLIENT_ID"
 MAILING_SERVICE_CLIENT_SECRET="MAILING_SERVICE_CLIENT_SECRET"
 MAILING_SERVICE_REFRESH_TOKEN="MAILING_SERVICE_REFRESH_TOKEN"
 SENDER_EMAIL_ADDRESS="SENDER_EMAIL_ADDRESS"
 ```

 ### Running

 To start the development server, run

 ```bash
 npm run dev
 ```

 ### Additional Tools for testing
 * [Postman](https://www.postman.com)