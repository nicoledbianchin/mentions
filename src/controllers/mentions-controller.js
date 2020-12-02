const mongoose = require('mongoose');
const Mentions = mongoose.model('Mentions');

exports.listMentions = async (requisition, response) => {
    try {
        const data = await Mentions.find({}, 'friend mention -_id');
        response.status(200).send(data);
    } catch (error) {
        response.status(500).send({message: 'Falha ao carregar as menções.'});
    }
};

exports.createMention = async (requisition, response) => {
    try {
        const mention = new Mentions({
            friend: requisition.body.friend,
            mention: requisition.body.mention
        });

        console.log(mention)

        await mention.save();

        response.status(201).send({message: 'Menção cadastrada com sucesso!'});
    } catch (e) {
        response.status(500).send({message: 'Falha ao cadastrar a menção.'});
    }
};