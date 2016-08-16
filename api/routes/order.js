import express from 'express';
import config from '../config';
import path from 'path';

const router = express.Router();

const dummyData = {
  items: [
    {
      id: 'undertale',
      price: 500,
      title: 'Undertale',
      preview: '/undertale_view.png',
      fullView: '/undertale_sheet.png'
    },
    {
      id: 'undertale2',
      price: 500,
      title: 'Undertale',
      preview: '/undertale_view.png',
      fullView: '/undertale_sheet.png'
    },
    {
      id: 'undertale3',
      id: 2,
      price: 500,
      title: 'Undertale',
      preview: '/undertale_view.png',
      fullView: '/undertale_sheet.png'
    }
  ]
}

router.get('/available-items', function (req, res) {
  res.status(200).send(dummyData);
});

export default router;
