// plugins/menu.js
const { cmd } = require("../command");

cmd(
  {
    pattern: "menu",
    alias: ["help", "commands"],
    desc: "Swipeable command menu",
    category: "info",
    react: "⚡",
    filename: __filename
  },
  async (client, mek, m, { prefix }) => {

    const commands = global.commands || [];
    const grouped = {};

    // Group commands by category
    for (const c of commands) {
      if (!c.pattern) continue;
      const cat = c.category || "other";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(c.pattern);
    }

    const cards = Object.keys(grouped).map(cat => {
      return {
        header: {
          title: `📂 ${cat.toUpperCase()}`
        },
        body: {
          text: grouped[cat]
            .map(cmd => `➤ ${prefix}${cmd}`)
            .join("\n")
        },
        footer: {
          text: "⚡ SUHO-MD V2 • LORD SUNG"
        }
      };
    });

    const message = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "⚡ SUHO-MD V2",
              subtitle: "Swipe left ➡️ to view all commands",
              hasMediaAttachment: false
            },
            body: {
              text: "🔥 Swipe through categories\n👑 Created by LORD SUNG"
            },
            footer: {
              text: "Power • Speed • Stability"
            },
            carouselMessage: {
              cards
            }
          }
        }
      }
    };

    await client.relayMessage(
      mek.key.remoteJid,
      message,
      { messageId: mek.key.id }
    );
  }
);
