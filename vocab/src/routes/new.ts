import express, { Request, Response } from 'express';
import { requireAuth,BadRequestError } from '@leitner/common';


import { Vocab } from '../models/vocab';

const router = express.Router();

router.post(
  '/api/vocabs/new',
  requireAuth,
  async (req: Request, res: Response) => {

    const { word, translation,example, voice } = req.body;
    console.log('adding new word ', req.body);
    let vocab = await Vocab.findOne({ word });

    if (vocab) 
      vocab = Object.assign(vocab , req.body);
    else
       vocab = Vocab.build({ word, translation,example , voice});
       
    await vocab?.save();  

    res.status(201).send(vocab);
  }
);

export { router as vocabNewRouter };
