import User from '../lib/definitions/user'; // Import your user model

async function findUserByEmail(email: string) {
  try {
    const user = await User.findOne({
      where: { email: email }
    });
    return user ? user : null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

export default findUserByEmail;
