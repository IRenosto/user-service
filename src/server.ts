import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import expressPromBundle from 'express-prom-bundle';
import swaggerUi from 'swagger-ui-express';
import redoc from 'redoc-express';

import { router } from './routes';
import { swaggerSpec } from './shared/middlewares';

const server = express();

const metricsMiddleware = expressPromBundle({
  includeMethod: true,
  includePath: true,
  customLabels: { project_name: 'User-Service', project_type: 'blog' },
  promClient: { collectDefaultMetrics: {} },
});

const redocOptions = {
  title: 'User Service',
  specUrl: '/api-json',
};

// Middlewares
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(metricsMiddleware);

// CORS headers (opcional, pois o pacote cors já faz isso)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({});
  }

  next();
});


server.get('/api-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use('/redoc', redoc(redocOptions));

// API routes
server.use('/', router);

export { server };
