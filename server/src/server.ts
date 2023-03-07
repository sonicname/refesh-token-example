import express, { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

config();

const PORT = process.env.PORT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const REFESH_TOKEN_PRIVATE_KEY = process.env.REFESH_TOKEN_PRIVATE_KEY;
const REFESH_TOKEN_PUBLIC_KEY = process.env.REFESH_TOKEN_PUBLIC_KEY;

const USERNAME = 'phamanhduc';
const PASSWORD = 'helloworld';

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface ILoginValue {
  username: string;
  password: string;
}

app.post('/login', (req: Request, res: Response) => {
  const { password, username } = req.body as ILoginValue;

  if (username != USERNAME || password != PASSWORD)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'wrong username or password!',
    });

  const token = jwt.sign(
    { username, password },
    Buffer.from(PRIVATE_KEY as string, 'base64').toString('ascii'),
    {
      expiresIn: '20s',
      algorithm: 'RS256',
    },
  );

  const refeshToken = jwt.sign(
    { username },
    Buffer.from(REFESH_TOKEN_PRIVATE_KEY as string, 'base64').toString('ascii'),
    {
      expiresIn: '5m',
      algorithm: 'RS256',
    },
  );

  return res.json({
    message: 'Login success',
    token,
    refeshToken,
  });
});

interface IRefeshTokenBody {
  refeshToken: string;
}

app.post('/refesh-token', (req: Request, res: Response) => {
  const { refeshToken } = req.body as IRefeshTokenBody;
  if (!refeshToken) return res.status(StatusCodes.UNAUTHORIZED);

  const token = jwt.sign(
    { username: USERNAME, password: PASSWORD },
    Buffer.from(PRIVATE_KEY as string, 'base64').toString('ascii'),
    {
      expiresIn: '20s',
      algorithm: 'RS256',
    },
  );

  return res.json({
    message: 'refeshed',
    token,
  });
});

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Error('Authentication invalid');
  }
  const token = authHeader && authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(
      token,
      Buffer.from(PUBLIC_KEY as string, 'base64').toString('ascii'),
    );

    res.locals.user = payload;

    next();
  } catch (error) {
    throw error;
  }
};

app.get('/private', authMiddleware, (req: Request, res: Response) => {
  console.log(res.locals.user);

  return res.json({
    messag: 'private',
  });
});

app.get('/', (req: Request, res: Response) => {
  return res.json({
    message: 'Hello world',
  });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
