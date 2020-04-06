const connection = require('../database/connection');

module.exports = {
    async indexUpdate(request, response) {
        const { id } = request.params;

        const dataConsult = await connection('consult').where('id', id).select('name', 'owner', 'species', 'breed', 'phone', 'email');

        return response.json(dataConsult);
    }
}