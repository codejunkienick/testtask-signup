import mongoose, {Schema} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
// TODO: Remodel Account database
const Account = new Schema({
  username: {type: String, default: 'John Doe'},
  password: {type: String},
  displayName: {type: String},
  locale: String,
  avatar: String,
  social: {
    vk: {
      id: String,
      membership: {type: Schema.Types.ObjectId, ref: 'Membership'}
    },
    facebook: {
      id: String,
      membership: {type: Schema.Types.ObjectId, ref: 'Membership'}
    },
    instagram: {
      id: String,
      membership: {type: Schema.Types.ObjectId, ref: 'Membership'}
    },
    twitter: {
      id: String,
      membership: {type: Schema.Types.ObjectId, ref: 'Membership'}
    },
  },
});


Account.plugin(passportLocalMongoose);

export default mongoose.model('Account', Account);
