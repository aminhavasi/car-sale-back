const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        tokens: [
            {
                access: {
                    type: String,
                },
                token: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true }
);

userSchema.statics.findByCredentials = function (email, password) {
    let User = this;
    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

userSchema.methods.genAutn = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign(
        {
            _id: user._id.toHexString(),
            access,
        },
        process.env.SECRET_KEY
    );
    user.tokens.push({
        access,
        token,
    });

    return user.save().then(() => {
        return token;
    });
};

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
