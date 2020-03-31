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

  async update(req, res) {
    const { email, oldPassword } = req.body;

    // o req.userId é passado por meio do token e definido no middlewares/auth.js
    const user = await User.findByPk(req.userId);

    // verificando se o email é igual ao email do banco
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
    }

    // Se oldPassword for true, chama a função que verifica se oldPassword == Password_hash(db)
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // Atualizando os dados do banco de acordo com os dados do req.body
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
