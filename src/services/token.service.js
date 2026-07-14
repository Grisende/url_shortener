const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { redisClient } = require('../db/redis');

const REFRESH_TTL_SECONDS = 60 * 60 * 24 * 7; // 1 semana

function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
}

async function generateRefreshToken(userId) {
  const refreshToken = crypto.randomBytes(40).toString('hex'); 
  await redisClient.set(`refresh:${refreshToken}`, userId, { EX: REFRESH_TTL_SECONDS });
  return refreshToken;
}

async function verifyRefreshToken(refreshToken) {
  const userId = await redisClient.get(`refresh:${refreshToken}`);
  return userId; 
}

async function revokeRefreshToken(refreshToken) {
  await redisClient.del(`refresh:${refreshToken}`);
}

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken, revokeRefreshToken };