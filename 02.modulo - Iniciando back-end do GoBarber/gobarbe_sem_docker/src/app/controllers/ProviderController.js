import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: {
        provider: true,
      },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      // Incluindo na busca os dados da tabela file,
      include: [
        {
          model: File,
          // Esta sendo chamado as: avatar, pois foi definido em User.associate
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
