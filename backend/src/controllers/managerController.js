const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const managers = await connection('manager').select('*');

        return response.json(managers);
    },
    async create(request, response) {
        const {name, email, passLast, registration, office} = request.body;
        
        const pass = crypto.createHmac('sha256', passLast).update('i love code').digest('hex');

        await connection('manager').insert({
            name, 
            email,
            pass,
            registration,
            office
        });

        return response.json({name});
    }
}