const connection = require('../database/connection');

module.exports = {
    async indexNoConclude(request, response) {
        var dateNow = new Date();
        const consultNoConclude = await connection('consult').where('date', dateNow.getFullYear() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getDate()).where('attended', false).select('*');

        return response.json(consultNoConclude);
    }
}