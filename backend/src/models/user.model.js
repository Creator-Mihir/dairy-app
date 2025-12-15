import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // 👇 THIS IS THE MISSING PIECE
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // By default, new users are NOT admins
    },
  },
  {
    timestamps: true,
  }
);

// Method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Middleware to hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return ; // <--- Added 'return' to stop execution here
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  ;
});

const User = mongoose.model("User", userSchema);

export default User;