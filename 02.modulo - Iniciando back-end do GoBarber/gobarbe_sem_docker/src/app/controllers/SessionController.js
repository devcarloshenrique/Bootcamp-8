import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // isValid é assíncrono, será feita uma verificação dos campos de acordo com o schema definido
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    // Buscando no banco se existe um usuario com este email
    const user = await User.findOne({ where: { email } });

    // Verificando se o email não existe
    if (!user) {
      return res.status(401).json({ error: 'User not found ' });
    }

    // Verificando se a senha não é correta
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      /* o primeiro parametro da função sing(), é o payload que é um objeto
       * o segundo parametro deve ser um hash aleatorio(eu codifico esse texto no md5online), token == gobarber
       */
      token: jwt.sign({ id }, authConfig.secret, {
        // Este terceiro parametro é responsável por determinar o tempo de expiração do token
        expiresIn: authConfig.expireIn,
      }),
    });
  }
}

export default new SessionController();
