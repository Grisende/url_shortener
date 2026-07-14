const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usersRepository = require("../repositories/users.repository");
const tokenService = require("../services/token.service");

async function login(req, res) {
  const { email, password } = req.body;
  const user = await usersRepository.findByEmail(email);
  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches)
    return res.status(401).json({ error: "Credenciais inválidas" });

  const accessToken = tokenService.generateAccessToken(user.id);
  const refreshToken = await tokenService.generateRefreshToken(user.id);

  res.json({ accessToken, refreshToken });
}

async function refresh(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'refreshToken é obrigatório' });

  const userId = await tokenService.verifyRefreshToken(refreshToken);
  if (!userId) return res.status(401).json({ error: 'Refresh token inválido ou expirado' });

  const accessToken = tokenService.generateAccessToken(userId);
  res.json({ accessToken });
}

async function logout(req, res) {
  const { refreshToken } = req.body;
  await tokenService.revokeRefreshToken(refreshToken);
  res.status(204).send();
}

module.exports = { login, refresh, logout };
