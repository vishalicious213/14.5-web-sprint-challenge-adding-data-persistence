
exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects_resources', tbl => {
        // create primary key called id
        tbl.increments();
        // project_id, resource_id
        tbl.integer('project_id').notNullable().references("id").inTable("project");
        tbl.integer('resource_id').notNullable().references("id").inTable("resource");
    })
};

exports.down = function(knex) {
    // drop the whole table
    return knex.schema.dropTableIfExists('projects_resources');
};
