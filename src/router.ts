import express, { Router } from 'express'
const router = express.Router();

class AppRouter{
    private static instance: Router;
   
    static getInstance(){
        if(!this.instance){
            this.instance = router;
        }
        return this.instance;
    }
}

export default AppRouter;