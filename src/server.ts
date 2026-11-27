import express from 'express';
import helmet from 'helmet';
import routes from './routes';

const app = express();
const port = 3000;

app.use(helmet());
app.use(express.json());

app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
