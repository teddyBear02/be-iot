// src/express.d.ts
import { Server } from 'socket.io';
import  express from 'express';

declare global {
  namespace Express {
    export interface Request {
      io?: Server ; // hoặc có thể là Server | undefined nếu không đảm bảo luôn có
    }
  }
}
