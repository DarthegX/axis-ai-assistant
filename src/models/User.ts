import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  discogs: {
    accessToken: String,
    accessTokenSecret: String,
    oauthTokenSecret: String
  },
  spotify: {
    accessToken: String,
    refreshToken: String,
    expiresAt: Number,
  }
}, { timestamps: true });

const User = models.User || model('User', UserSchema);
export default User;