import { requireAuth } from '@leitner/common';
import express , {Request, Response} from 'express'
import { Vocab } from '../models/vocab';

interface Query { 
    word : string
}

const router = express.Router();

router.get('/api/vocabs/get' , requireAuth , async (req: Request , res : Response)=>{
    const {word} = req.query as unknown as Query;
    console.log('this is word to search ', word);

    const existingUser = await Vocab.findOne({ word });
    console.log('this is esiting user ', existingUser);
    if(existingUser)
        res.status(200).send(existingUser);


} )

export {router as vocabGet};