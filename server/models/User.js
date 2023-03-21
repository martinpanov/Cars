const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [3, 'Username should be at least 3 characters long'] },
    password: { type: String, required: true, minlength: [5, 'Password should be at least 5 characters long'] }
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;