exports.up = function(knex, Promise) {
    return knex.schema.createTable('comment', t => {
        t.increments('comment_id').primary();
        t.integer('commenter_id').unsigned();
        t.foreign('commenter_id').references('user.id');
        t.string('comment_text').notNullable();
        t.timestamps(false, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comment');
};
