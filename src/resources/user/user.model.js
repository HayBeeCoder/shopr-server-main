import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      trim: true,
      unique: 'Email already exists',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      required: true,
      // unique : true,
      // trim: true
    },
    password: {
      type: String,
      validate: {
        validator: function (password) {
          //apply correct regexp to enable more secured password
          return password.length > 6;
        },
        message: props => `${props.value} is not a valid password!`
        // required: true
      },

    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)


UserSchema.pre(
  'save',
  function (next) {
    if (!this.isModified('password')) {
      next()
    }
    if (this.password < 6) console.log("Entered password's length must not be less than 6.")
    bcryptjs.hash(this.password, 8, (err, hash) => {
      if (err) {
        return next(err)
      }

      this.password = hash
      next()
    })
  })



UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

export const User = mongoose.model("user", UserSchema)