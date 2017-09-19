
exports.up = function(knex, Promise) {
  return knex.schema.createTable('postDetail', t => {
     t.increments('postDetail_id').primary();
     t.integer('post_id').unsigned();
     t.foreign('post_id').references('post.post_id');
     t.integer('sequence').notNullable();
     t.text('postDetail_text');
  });
};

exports.down = function(knex, Promise) {
  
};
