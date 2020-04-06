const connection = require('../database/connection');

module.exports = {
    async indexConclude(request, response) {
        const consultConclude = await connection('consult').where('attended', true).select('*');

        return response.json(consultConclude);
    }
}