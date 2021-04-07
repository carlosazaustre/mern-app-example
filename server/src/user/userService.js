import User from "./userModel";

export async function listUsers() {
  const users = await User.find();
  return users;
}

export async function listUniqueUser(username) {
  const user = await User.findOne(username);
  return user;
}

export async function saveUser(userData) {
  const { username } = userData;
  const user = new User({ username });
  const savedUser = await user.save();
  return savedUser;
}
