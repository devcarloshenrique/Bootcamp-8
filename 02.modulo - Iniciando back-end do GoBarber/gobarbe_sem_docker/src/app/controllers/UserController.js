import User from '../models/User';

class UserController {
  // Por enquanto esse metodo vai receber os dados via insomnia, mas logo logo por react native.
  async store(req, res) {
    // busca no banco de dados se tem um email igual ao cadastrado pelo usuario
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Poderia pegar dado por dado, porém no User.js é definido todos os dados que seram utilizados.
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
