exports.up = function(knex, Promise) {
    return knex.schema.createTable('post', t => {
        t.increments('post_id').primary();
        t.string('post_title').notNullable();
        t.timestamps(false, true);
        t.string('creator', 50);
        t.foreign('creator').references('user.username');
        t.boolean('show');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('post');
};
