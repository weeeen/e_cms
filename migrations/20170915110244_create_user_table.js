
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', t => {
      t.increments('id').primary();
      t.string('username', 50).notNullable();
      t.string('password').notNullable();
      t.integer('level').notNullable();
      t.timestamps(false, true);
      t.unique('username');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
