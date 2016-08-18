import mongoose, {Schema} from 'mongoose';
const Todo = new Schema({
  text: {type: String},
  done: {type: Boolean}
});

export default mongoose.model('Todo', Todo);
