import User from '../models/userModel.js'

const generateUniqueIdentifier = () => Math.random().toString(36).substring(2, 6);

const generateUsername = async ( User, fullname ) => {
  console.log({fullname});
  const baseUsername = fullname.toLowerCase().replace(/ /g, '_');
  let username = `${baseUsername}_${generateUniqueIdentifier()}`;
  let usernameExists = await User.getUserByUsername( username );
  console.log({usernameExists});
  while (usernameExists !== 0) {
    username = `${baseUsername}_${generateUniqueIdentifier()}`;
    usernameExists = await User.getUserByUsername( username );
  }

  return username;
};

export default generateUsername;