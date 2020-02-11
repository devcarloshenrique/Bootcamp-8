import jwt from 'jsonwebtoken';

/* Biblioteca padrão do node, resonsável por pegar uma, callback e transforma em uma function
 * que é possível utilizar async e await
 */
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // Nome do header que está sendo enviado via insominia
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
