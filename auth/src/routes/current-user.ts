import { currentUser, requireAuth } from '@leitner/common';
import express from 'express';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  console.log('this is jwt ', req.session?.jwt);
  res.send({user : req.currentUser || null})
});

export { router as currentUserRouter };
