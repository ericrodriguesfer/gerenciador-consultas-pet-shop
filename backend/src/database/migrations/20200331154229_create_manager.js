exports.up = function(knex) {
    return knex.schema.createTable('manager', function(table){
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.string('pass', 255).notNullable();
        table.string('registration', 8).notNullable();
        table.string('office', 50).notNullable();
    });
};

exports.down = function(knex) {
 return knex.schema.dropTable('manager');
};
