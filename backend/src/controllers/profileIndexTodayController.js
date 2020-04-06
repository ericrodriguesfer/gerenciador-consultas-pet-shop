const connection = require('../database/connection');

module.exports = {
    async indexToday(request, response) {
        var dateNow = new Date();
        const consultsToday = await connection('consult').where('date', dateNow.getFullYear() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getDate());

        return response.json(consultsToday);
    }
}