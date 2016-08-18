import express from 'express';
import config from '../config';
import path from 'path';
import { Todo } from '../models';

const router = express.Router();

router.get('/', async function(req, res) {
  const response = await Todo.find().exec();
  res.status(200).send(response);
});

router.post('/add', async function(req, res) {
  const todo = new Todo({text: req.body.text}) 
  try {
    await todo.save();
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err) 
  }
});

export default router;
