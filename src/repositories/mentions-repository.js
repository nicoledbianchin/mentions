const mongoose = require('mongoose');
const Mentions = mongoose.model('Mentions');

exports.listMentions = async () => {
    const response = await Mentions.find({}, 'friend mention -_id');
    return response;
};

exports.createMention = async (data) => {
    const mention = new Mentions(data);
    await mention.save();
};