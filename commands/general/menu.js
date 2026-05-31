/**
 * Menu Command - Display all available commands
 */

const config = require('../../config');
const { Vcard } = require('../../lib/Sancho');
const { loadCommands } = require('../../utils/commandLoader');

module.exports = {
  name: 'menu',
  aliases: ['help', 'commands'],
  category: 'general',
  description: 'Show all available commands',
  usage: '.menu',
  
  async execute(sock, msg, args, extra) {
    try {
      const commands = loadCommands();
      const categories = {};
      
      // Group commands by category
      commands.forEach((cmd, name) => {
        if (cmd.name === name) { // Only count main command names, not aliases
          if (!categories[cmd.category]) {
            categories[cmd.category] = [];
          }
          categories[cmd.category].push(cmd);
        }
      });
      
      const ownerNames = Array.isArray(config.ownerName) ? config.ownerName : [config.ownerName];
      const displayOwner = ownerNames[0] || config.ownerName || 'Bot Owner';
      
      let menuText = `━━〔 *${config.botName}* 〕━━┈⊷
┃◈╭─────────────·๏\n\n`;
      menuText += `┃◈┃•👋 Hello @${extra.sender.split('@')[0]}!\n\n`;
      menuText += `┃◈┃•⚡ Prefix: ${config.prefix}\n`;
      menuText += `┃◈┃•📦 Total Commands: ${commands.size}\n`;
      menuText += `┃◈┃•👑 Owner: ${displayOwner}\n\n`
      menuText += `┃◈└───────────┈⊷
╰──────────────┈⊷`;
      
      // General Commands
      if (categories.general) {
        menuText += `╭─────────────────\n`;
        menuText += `┃  ᗰᗩIᑎ ᗰEᑎᑌ\n`;
        menuText +=
`╰─────────────────\n`;
        categories.general.forEach(cmd => {
          menuText += `│ ✰ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // AI Commands
      if (categories.ai) {
        menuText += `╭────────────────\n`;
        menuText += `┃  ᗩI ᗰEᑎᑌ\n`;
        menuText += `╰─────────────────\n`;
        categories.ai.forEach(cmd => {
          menuText += `│ ✰ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Group Commands
      if (categories.group) {
        menuText += `╭────────────────\n`;
        menuText += `┃  GᖇOᑌᑭ ᗰEᑎᑌ\n`;
        menuText += `╰────────────────\n`;
        categories.group.forEach(cmd => {
          menuText += `│ ✰ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Admin Commands
      if (categories.admin) {
        menuText += `╭────────────────\n`;
        menuText += `┃  ᗩᗪᗰIᑎ ᗰEᑎᑌ\n`;
        menuText += `╰─────────────────\n`;
        categories.admin.forEach(cmd => {
          menuText += `│ ✰ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Owner Commands
      if (categories.owner) {
        menuText += `╭────────────────\n`;
        menuText += `┃  OᗯᑎEᖇ ᗰEᑎᑌ\n`;
        menuText += `╰─────────────────\n`;
        categories.owner.forEach(cmd => {
          menuText += `│ ✰ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Media Commands
      if (categories.media) {
        menuText += `╭────────────────\n`;
        menuText += `┃ ᗪOᗯᑎᒪOᗩᗪ ᗰEᑎᑌ\n`;
        menuText += `╰─────────────────\n`;
        categories.media.forEach(cmd => {
          menuText += `│ ✰ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Fun Commands
      if (categories.fun) {
        menuText += `╭────────────────\n`;
        menuText += `┃  ᖴᑌᑎ ᗰEᑎᑌ\n`;
        menuText += `╰─────────────────\n`;
        categories.fun.forEach(cmd => {
          menuText += `│ ✰ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Utility Commands
      if (categories.utility) {
        menuText += `╭────────────────\n`;
        menuText += `┃  ᑌTIᒪITY ᗰEᑎᑌ\n`;
        menuText += `╰─────────────────\n`;
        categories.utility.forEach(cmd => {
          menuText += `│ ✰ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }

       // Anime Commands
       if (categories.anime) {
        menuText += `╭────────────────\n`;
        menuText += `┃ ᗩᑎIᗰE ᗰEᑎᑌ\n`;
        menuText += `╰─────────────────\n`;
        categories.anime.forEach(cmd => {
          menuText += `│ ✰ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }

       // Textmaker Commands
       if (categories.utility) {
        menuText += `╭────────────────\n`;
        menuText += `┃ ᒪOGO ᗰEᑎᑌ (TE᙭T)\n`;
        menuText += `╰─────────────────\n`;
        categories.textmaker.forEach(cmd => {
          menuText += `│ ✰ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      menuText += `╰━━━━━━━━━━━━━━━━━\n\n`;
      menuText += `> *DEVELOPED BY SANCHO-DEV*\n`;
      
      // Send menu with image
      const fs = require('fs');
      const path = require('path');
      const imagePath = path.join(__dirname, '../../utils/anita.jpg');
      
      if (fs.existsSync(imagePath)) {
        // Send image with newsletter forwarding context
        const imageBuffer = fs.readFileSync(imagePath);
        await sock.sendMessage(extra.from, {
          image: imageBuffer,
          caption: menuText,
          mentions: [extra.sender],
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: config.newsletterJid || '120363419109099577@newsletter',
              newsletterName: config.botName,
              serverMessageId: -1
            }
          }
        }, { quoted: Vcard });
      } else {
        await sock.sendMessage(extra.from, {
          text: menuText,
          mentions: [extra.sender]
        }, { quoted: msg });
      }
      
    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};
