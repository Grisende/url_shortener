const usersRepository = require("../repositories/users.repository");
const { redisClient } = require("../db/redis");

const CACHE_KEY_USERS = "users";
const CACHE_TTL_SECONDS = 120;

async function findAll(req, res) {
  const cachedUsers = await redisClient.get(CACHE_KEY_USERS);

  if (cachedUsers) {
    console.log("Returning cached users");
    return res.json(JSON.parse(cachedUsers));
  }

  console.log("Fetching users from database");
  const users = await usersRepository.findAll();
  await redisClient.set(CACHE_KEY_USERS, JSON.stringify(users), {
    EX: CACHE_TTL_SECONDS,
  });

  res.json(users);
}

async function findOne(req, res) {
  const user = await usersRepository.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json(user);
}

async function create(req, res) {
  const { name, email, password } = req.body;
  const user = await usersRepository.create({ name, email, password });
  await redisClient.del(CACHE_KEY_USERS);
  res.status(201).json(user);
}

async function destroy(req, res) {
  const deleted = await usersRepository.remove(req.params.id);
  if (!deleted)
    return res.status(404).json({ error: "Usuário não encontrado" });
  await redisClient.del(CACHE_KEY_USERS);
  res.status(204).send();
}

module.exports = { findAll, findOne, create, destroy };
