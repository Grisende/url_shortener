const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const { redisClient } = require('../db/redis');

const loginLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000, // janela de 15 minutos
  max: 5, // no máximo 5 tentativas de login por IP nessa janela
  message: { error: 'Muitas tentativas de login. Tente novamente mais tarde.' },
  standardHeaders: true, // devolve headers RateLimit-* na resposta
  legacyHeaders: false,
});

module.exports = { loginLimiter };