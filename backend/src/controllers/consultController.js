const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const consults = await connection('consult').select('*');

        return response.json(consults);
    },
    async create(request, response){
        const {name, owner, species, breed, phone, email} = request.body;

        var dateNow = new Date();
        var date = dateNow.getFullYear() + '/' + (dateNow.getMonth() + 1) + '/' + dateNow.getDate();
        const attended = false;

        await connection('consult').insert({
            name,
            owner,
            species,
            breed,
            phone,
            email,
            date,
            attended
        });

        return response.json({name});
    },
    async update(request, response){
        const {id} = request.params;
        const { name, owner, species, breed, phone, email } = request.body;

        const idConsult = await connection('consult').where('id', id).select('id');

        if(!idConsult){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        await connection('consult').where('id', id).update('name', name).update('owner', owner).update('species', species).update('breed', breed).update('phone', phone).update('email', email);

        return response.status(204).send();
    },
    async delete(request, response){
        const {id} = request.params;

        const consultDelete = await connection('consult').where('id', id).select('*').first();

        if(!consultDelete){
            return response.status(401).json({error: 'Opetariont not permited.'});
        }

        await connection('consult').where('id', id).delete();

        return response.status(204).send();
    }
}