const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response){
        const {email, passLast} = request.body;

        const pass = crypto.createHmac('sha256', passLast).update('i love code').digest('hex');

        const manager = await connection('manager').where('email', email).where('pass', pass).select('id', 'name', 'registration', 'office').first();

        if(!manager){
            return response.status(400).json({error: 'No manager found with this EMAIL and PASS'});
        }

        return response.json(manager);
    }
}