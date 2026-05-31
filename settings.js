/*==================================

    SANCHO DEV ZW 


================================*/

const fs = require('fs')
if (fs.existsSync('.env')) require('dotenv').config({ path: __dirname+'/.env' })

const settings = {

//====== DONT CHANGE =============//
  packname: process.env.packname || 'sanchotech',
  
  
  author: process.env.authour || 'sanchozw',
  
//======= BOT SETTINGS ============//

  SESSION_ID: process.env.SESSION_ID || '',
  

  botName: process.env.botName || "Anita Xmd",
  
  
  commandMode: process.env.commandMode || "private",
  
  
  timezone: process.env.timezone || "Africa/Harare",
  
  
  botOwner: process.env.botOwner || 'sanchotech',
  
  ownerNumber: process.env.ownerNumber || '263780325289',
  
  //======== ANTIEDIT SETTINGS ===========//
  antieditMode: process.env.antieditMode || "private", // "public" or "private"
  
  antieditEnabled: process.env.antieditEnabled || true, // true or false
  
  
  // Examples: '.' or ['.', '!', '#', '$']
  Prefix: process.env.Prefix ? (process.env.Prefix.includes(',') ? process.env.Prefix.split(',') : process.env.Prefix) : ['.', '!', '#', '$'],
  
  
  
  
//======== DONT CHANGE ===========//
  giphyApiKey: process.env.giphyApiKey || 'qnl7ssQChTdPjsKta2Ax2LMaGXz303tq',
  
  
  maxStoreMessages: process.env.maxStoreMessages || 20, 
  
  
  storeWriteInterval: process.env.storeWriteInterval || 10000,
  
  
  description: process.env.description || "ADVANCED W.A BOT DEVELOPED BY YOUNGBOY",
  
  version: process.env.version || "1.0.0",
  
};

module.exports = settings;