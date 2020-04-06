exports.up = function(knex) {
    return knex.schema.createTable('consult', function(table){
        table.increments('id').primary();
        table.string('name', 50).notNullable();
        table.string('owner', 255).notNullable();
        table.string('species', 100).notNullable();
        table.string('breed', 50).notNullable();
        table.string('phone', 11).notNullable();
        table.string('email', 100).notNullable();
        table.date('date').notNullable();
        table.boolean('attended').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('consult');
};
