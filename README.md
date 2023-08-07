## Express decorator
a module to build TypeScript application with Express decorators

## Install
```
npm i -S decorators-express
```

## How to use
### Import AppRouter instance in your file app.ts
``` ts
import express from 'express';
import { AppRouter } from 'decorators-express';
import './controllers/UserController';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(AppRouter.getInstance());

app.listen(PORT, ()=>{
console.log(`server is listening on ${PORT} port`);
})
```


### Declare a class and mark it with @controller('your path')
``` ts
import {NextFunction, Request, Response} from 'express';
import {Controller, Get, Res, Param, Post, Req, Patch, Delete, Guard, Use} from 'decorators-express';


@Controller('/user')
export class UserController {
    @Get('/')
    get(@Res() res: Response) {
        res.status(200).json([
            {name: 'john'},
            {name: 'walter'},
        ]);
    }

    @Post('new')
    @Guard(AuthGuard)
    @Use(ValidationMiddleware)
    createOne(@Res() res: Response) {
        res.status(201).json({name: 'john'});
    }

    @Patch(':name')
    updateOne(@Res() res: Response, @Param('name') name: string) {
        const users = [
            {name: 'john'},
            {name: 'walter'},
        ]

        const user = users.find(u => u.name === name)
        res.status(200).json(user);
    }

    @Delete(':name')
    deleteOne(@Res() res: Response, @Param('name') name: string) {
        const users = [
            {name: 'john'},
            {name: 'walter'},
        ]

        const user = users.find(u => u.name === name)
        const usersUpdated = users.filter(u => u.name !== name)
        res.status(200).json(user);
    }
}


function AuthGuard(req: Request, res: Response) {
    // some logic, like if is auth ....
    return true;
}


function ValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    // some logic, like body validation ....
    next()
}

```
### Don't forget to import all your class in your root file app.ts
``` ts
import './controllers/UserController';
```
Use @Controller to register express route for class.

Use @Get/@Delete/@Post/@Put/@Patch/@Head/@Options to register sub-route path on a method like:

```
@Get('all')
getUser(){
}
```
**All parameters that are injected as parameters on each method can be injected in any order of your choice**

Inject request parameters with @Param/@Query/@Body
For @Param/@Query you need to indicate the name or the propriety that you need like: 

```
getUser(@Param('id') id: string){
    res.status(200)
}
```

For Body this you indicate an array of proprieties that you need like: 

```
getUser(@Body(['name', 'phone']) body: {[key:string]: any} ){
    res.status(200)
}
```

This array of proprieties are optional, so if you need all the body you can do:

```
getUser(@Body() body: {[key:string]: any} ){
    res.status(200)
}
```

Inject Response From express with @Res
```
getUser(@Res res: Response){
    res.status(200)
}
```

Inject Request From express with @Req
```
getUser(@Req req: Request){
    const headers = req['headers']
}
```

Inject Next From express with @Next

```

getUser(@Next next: NextFunction){
    next()
}
```

### Middleware
To Inject middleware you need to use the @Use decorator and pass as argument a function that math to the type RequestHandler like:

```
@Controller('/user')
export class UserController {

    @Post('new')
    @Use(ValidationMiddleware)
    createOne(@Res() res: Response) {
        res.status(201).json({name: 'john'});
    }
}

function ValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    // some logic, like body validation ....
    next()
}
```

A middleware can be used on the entire controller like:

```
@Controller('/user')
@Use(ValidationMiddleware)
export class UserController {

    @Post('new')
    createOne(@Res() res: Response) {
        res.status(201).json({name: 'john'});
    }
}

function ValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    // some logic, like body validation ....
    next()
}
```
So in this case the middleware will be executed on each method of the controller the order of the execution will be global middleware before and unit middleware after.
You can also set multiple middlewares on the controller or per method like:
```
@Controller('/user')
export class UserController {

    @Post('new')
    @Use(Middleware1)
    @Use(Middleware2)
    @Use(Middleware3)
    createOne(@Res() res: Response) {
        res.status(201).json({name: 'john'});
    }
}

@Controller('/post')
@Use(Middleware1)
@Use(Middleware2)
@Use(Middleware3)
export class PostController {

    @Post('new')
    createOne(@Res() res: Response) {
        res.status(201).json({name: 'Sunday post'});
    }
}
```
The order of execution when you set multiple middleware is **from the top**.

### Guard
To Inject guard you need to use the @Guard decorator and pass as argument a function that math to the type (req: Request, res: Response)=> boolean like:

```
@Controller('/user')
export class UserController {

    @Post('new')
    @Guard(AuthGuard)
    createOne(@Res() res: Response) {
        res.status(201).json({name: 'john'});
    }
}

function AuthGuard(req: Request, res: Response) {
    // some logic, like if is auth ....
    return true;
}
```
If guard function return false **it will send status 403**

You can also use @Guard on the controller itself like:
```
@Controller('/user')
@Guard(AuthGuard)
export class UserController {

    @Post('new')
    createOne(@Res() res: Response) {
        res.status(201).json({name: 'john'});
    }
}
```
So in this case the guard will protect each method of the controller.


