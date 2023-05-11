import User from "../models/User";

const emailUnique = async (email: string) => {
  if (!email) throw new Error("El email es necesariao.");
  const searchEmail = await User.findAll({ where: { email } });
  if (searchEmail.length !== 0) {
    throw new Error(`El email ${email} ya se encuentra en uso.`);
  }
};

export default emailUnique;
