const c = require("colors");
const config = require("../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ActivityType, ComponentType } = require('discord.js');

module.exports = {
  name: 'ready',
  async execute(client, interaction) {
    console.log(c.green('Sistema de ticket iniciado.'))
    const channelTicket = client.channels.cache.get(config.ticketChannel);

    let a = "`"

    async function sendTicketMSG() {
      const embed = new EmbedBuilder()
        .setColor(config.colorOther)
        .setAuthor({
          name: 'CENTRAL DE ATENDIMENTO',
          iconURL: client.user.avatarURL()
        })
        .setDescription(`Seja bem-vindo à área de suporte ao jogador, para iniciar o seu atendimento com a nossa equipe administrativa, clique na barra abaixo, selecione uma categoria, direcione-se ao canal criado e descreva detalhadamente uma mensagem compatível com a sua necessidade de suporte.\n\nPrezamos pela qualidade de atendimento e o bom suporte ao jogador, portanto, todo o registro de nossos tickets são devidamente armazenados e enviado ao usuário na finalização dele. Pedimos para que você colabore conosco e não fique abrindo tickets desnecessariamente.`)
        .setImage(`${config.ticketIcon}`)
        .setFooter({
          text: config.footerText,
          iconURL: client.user.avatarURL()
        })

      const row = new ActionRowBuilder()
        .addComponents(new SelectMenuBuilder()
          .setCustomId('category')
          .setPlaceholder('Selecione uma categoria')
          .addOptions([{
              label: 'Dúvidas',
              value: 'Dúvidas gerais',
              description: 'Questões relacionadas ao servidor.',
              emoji: '❓',
            },
            {
              label: 'Denúncias',
              value: 'Denúncias',
              description: 'Denuncie um usuário.',
              emoji: '🛠️'
            },
            {
              label: 'Revisões de punições',
              value: 'Revisões de punições',
              description: 'Recorra a um apelo de alguma punição.',
              emoji: '⛔',
            },
            {
              label: 'Relatório de bugs',
              value: 'Relatório de bugs',
              description: 'Reporte erros e falhas de nossos sistemas.',
              emoji: '⚙️',
            },
            {
              label: 'Suporte financeiro',
              value: 'Financeiro',
              description: 'Adquira produtos ou resolva pendências financeiras.',
              emoji: '💸',
            },
            {
              label: 'Solicitar keys',
              value: 'Solicitação de keys',
              description: 'Solicite uma key VIP de confirmação de facção.',
              emoji: '🎥',
            },
            {
              label: 'Outros assuntos',
              value: 'Outros assuntos',
              description: 'Resolva alguma pendência não relacionada a outra categoria.',
              emoji: '🔍',
            },
          ]),
        );

        channelTicket.send({
          embeds: [embed],
          components: [row]
        })
      }

    const toDelete = 10000;

    async function fetchMore(channel, limit) {
      if (!channel) {
        throw new Error(`Canal esperado, tem ${typeof channel}.`);
      }
      if (limit <= 100) {
        return channel.messages.fetch({
          limit
        });
      }

      let collection = [];
      let lastId = null;
      let options = {};
      let remaining = limit;

      while (remaining > 0) {
        options.limit = remaining > 100 ? 100 : remaining;
        remaining = remaining > 100 ? remaining - 100 : 0;

        if (lastId) {
          options.before = lastId;
        }

        let messages = await channel.messages.fetch(options);

        if (!messages.last()) {
          break;
        }

        collection = collection.concat(messages);
        lastId = messages.last().id;
      }
      collection.remaining = remaining;

      return collection;
    }

    const list = await fetchMore(channelTicket, toDelete);

    let i = 1;

    list.forEach(underList => {
      underList.forEach(msg => {
        i++;
        if (i < toDelete) {
          setTimeout(function () {
            msg.delete()
          }, 1000 * i)
        }
      })
    })

    setTimeout(() => {
      sendTicketMSG()
    }, i);

    client.user.setActivity(`o ${config.displayIP}`, {
		type: ActivityType.Streaming,
		url: 'https://www.twitch.tv/pixzinlives',
	});
  },
};