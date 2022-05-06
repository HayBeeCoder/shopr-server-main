import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: 'Email already exists',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      required: true,
      // unique : true,
      // trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true
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
  async function (next) {
    if (!this.isModified('password')) {
      next()
    }
    if (this.password < 6) console.log("Entered password's length must not be less than 6.")
    try {
      const hashedPassword = await bcryptjs.hash(this.password, 8)
      this.password = hashedPassword;

    } catch (err) {
      return next(err)
    }

    next()
  })



UserSchema.methods = {
  comparePassword: async function (candidatePassword) {



    // console.log(this.password)
    // console.log(candidatePassword)
    const comparison = await bcryptjs.compare( candidatePassword , this.password)
  
    return comparison
    // console.log(comparison)
  }

}




export const User = mongoose.model("user", UserSchema)