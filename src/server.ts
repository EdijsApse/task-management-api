import express from 'express';
import helmet from 'helmet';

const app = express();
const port = 3000;

app.use(helmet());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Task Management API is running',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
