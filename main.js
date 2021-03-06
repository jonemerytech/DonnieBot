const Discord = require('discord.js');
const client = new Discord.Client();

client.login('bot token here');

client.on('message', async (message) => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === '/join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();

      client.on('guildMemberSpeaking', (user, status) => {
        if (user.user.username === 'Username here' && status.bitfield >= 1) {
          const dispatcher = connection.play('sound file here');

          dispatcher.resume();
        } else {
          const dispatcher = connection.play('sound file here');
          dispatcher.pause();
        }
      });
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});
