# Transaction Tracer
The transaction tracer app is a web based querying application. It's base code is written in .tsx (TypeScript React) and .ts (TypeScript) and its styling was done via SCSS.

## Requirments
In order to run the application in a test enviroment (or to build it for production) you will need to have a **NodeJS** version that is greater of equal to **18.13.0**.

## Instalation
  1) Navigate to a directory in which you would like to clone the project to
  2) Use the following command in CLI terminal in order to clone the repository:
  
    git clone 'https://github.com/DzoniTheNick/tracelabs_app.git
         
  3) Navigate to the newly created directory that should be named ***tracelabs_app***
  4) Use the following command in order to install all of the required packages:
  
    npm install
    
  5) After all of the necessary packages have been installed used the following command (in the same directory) in order to run the application in a development enviroment:
  
    npm start
    
  ### Notice
  If you are having trouble running the application please check if you have any other application running on port **3000**.
  
## Additional Notes
In order to query the data from the Ethereum mainnet the application uses the [Etherscan API](https://docs.etherscan.io) and the [Infura API](https://docs.infura.io/infura/networks/ethereum). 
