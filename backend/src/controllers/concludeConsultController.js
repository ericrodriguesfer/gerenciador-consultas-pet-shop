const connection = require('../database/connection');

module.exports = {
    async conclude(request, response) {
        const { id } = request.params;

        const consultConclude = await connection('consult').where('id', id).select('attended').first();

        if (consultConclude == true) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        await connection('consult').where('id', id).update('attended', true);

        return response.status(204).send();
    }
}