import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/test', (request, response) =>{
    return response.json({message: "Hello world!"})
});

app.listen(3333, () => {
    console.log('\x1b[1;4;96mServer started on port 3333!\x1b[0n')
});