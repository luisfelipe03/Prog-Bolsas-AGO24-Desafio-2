import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Define o diretório dos logs
const logDirectory = path.join(__dirname, '../../logs');

// Verifica se o diretório de logs existe, se não, cria
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Cria o logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ 
      filename: path.join(logDirectory, 'error.log'), // Usa a variável para o caminho do log de erros
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: path.join(logDirectory, 'combined.log') // Usa a variável para o caminho do log combinado
    }),
  ],
});

export default logger;

