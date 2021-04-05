import User from "./userModel";

export async function getUsers() {
  const users = await User.find().sort("-createdAt").exec();
  return users;
}

export async function getUser(username) {
  const user = await User.findOne(username).exec();
  return user;
}

export async function saveUser(user) {
  const { username, email } = await User.create(user);
  return { username, email };
}
