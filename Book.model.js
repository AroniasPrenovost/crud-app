'sue strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema ({
	title: String,
	author: String,
	category: String
});

// export schema for use in other files 
module.exports = mongoose.model('Book', BookSchema);
