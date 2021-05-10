
<h1 align="Center"><a href="https://housechat.herokuapp.com/">HouseChat</a></h1>
<h3 align="Center"> Knowledge Sharing Platform 🚀 Explore technical topics </h3>
<h4 align="Center">community platform to find and contribute answers to technical challenges</h4>


## Tech Stack 📋

  1. `next.js`
  2. `react.js`
  3. `Apollo`
  4. `graphql`
  5. `mongodb`
  6. `express.js`

## How to run locally
  
  1. Create a file called dev.js in following path `server/config/`
  2. Copy below code and paste it in dev.js
      
      <code>
        module.exports = {
            mongoURI: 'Your mongo uri',
            SESSION_SECRET: 'You can add you session secret'
        }
      </code>
  
  3. Copy below code and paste it in `next.config.js`
      
      <code>module.exports = {
        env: {
            BASE_URL: 'http://localhost:3000/graphql'
        }
      }</code>
      
  4. Before starting, Run the below command it will populate sample data in your mongodb.
      
     `npm run populateDB`
  
  5. Finally run `npm run dev` command. 


# App Info

<h3>Author</h3>

<h4>Sujith Gunasekaran</h3>

<h3>Version</h3>

<h4>1.0.0</h4>


