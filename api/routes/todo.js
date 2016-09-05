import express from 'express';
import config from '../config';
import path from 'path';
import { Todo } from '../models';

const router = express.Router();

router.get('/', async function(req, res) {
  res.json(await Todo.find().exec());
});

router.post('/add', async function(req, res) {
  const todo = new Todo({text: req.body.text}) 
  try {
    await todo.save();
    res.json({message: 'Todo created'});
  } catch (err) {
    res.status(500).send(err) 
  }
});

router.post('/remove', async function(req, res) {
  const todo = new Todo({text: req.body.text}) 
  try {
    await Todo.remove({_id: req.body.id});
    res.json(await Todo.find().exec());
  } catch (err) {
    res.status(500).send(err) 
  }
});

export default router;
