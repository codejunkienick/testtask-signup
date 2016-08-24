import express from 'express';
import config from '../config';
import path from 'path';
import { Todo } from '../models';

const router = express.Router();

router.get('/', async function(req, res) {
  const response = await Todo.find().exec();
  res.json(response);
});

router.post('/add', async function(req, res) {
  const todo = new Todo({text: req.body.text}) 
  try {
    await todo.save();
    res.json({message: 'Todo created'});
  } catch (err) {
    console.log(err);
    res.status(500).send(err) 
  }
});

export default router;
