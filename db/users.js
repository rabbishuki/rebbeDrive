var records = [
    { id: 1,
      username: 'RabbiDrive',
      password: 'RabbiDrive',
      displayName: 'RabbiDrive',
      prof:"103919532909545283389",
      emails: [ { value: 'RabbiDrive@gmail.com' } ] }
];

exports.findByProfile = function(id, cb) {
  records.forEach(function(record) {
    if (record.prof === id) {
         cb(null, record);
      } else {
        cb(new Error('User ' + id + ' does not exist'));
      }
    })
};

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}