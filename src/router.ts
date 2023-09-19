import type { Router } from 'express';
import express from 'express';
const router = express.Router();

export class AppRouter {
  private static instance: Router;
   
  static getInstance() {
    if (!this.instance) {
      this.instance = router;
    }
    
    return this.instance;
  }
}
