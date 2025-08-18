import { Document,model, Schema } from 'mongoose';

export type IUser = Document & {
  username: string;
  password: string;
  profilePicture?: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, minlength: [3, 'Username should be at least 3 characters long'] },
  password: { type: String, required: true, minlength: [5, 'Password should be at least 5 characters long'] },
  profilePicture: { type: String }
});

userSchema.index({ username: 1 }, {
  collation: {
    locale: 'en',
    strength: 2
  }
});

const User = model<IUser>('User', userSchema);

export default User;