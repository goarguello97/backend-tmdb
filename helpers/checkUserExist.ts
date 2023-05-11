import User from "../models/User";

const checkUserExist= async (id: string) => {
  if (!id) throw new Error("El id es necesario.");
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("No existe el ususario solicitado.");
  }
};

export default checkUserExist;
