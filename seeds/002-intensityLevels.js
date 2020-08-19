
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('intensityLevels').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('intensityLevels').insert([
        {name: 'Beginner'},
        {name: 'Intermediate'},
        {name: 'Advanced'},
        
      ]);
    });
};
