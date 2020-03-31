import jwt from 'jsonwebtoken';

/* biblioteca padrão do node, promisify pega uma função de callback e transforma em
 * um formato que possa ser usado async e await
 */
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    /* o promisify vai promissificar a callback jwt.verify, que vai retornar outra função, logo
     * pode ser colocado () em seguida.
     */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    /* Já que eu fiz a verificação qual quer rota que vim depois do middleware authMiddleware
     * vai ter acesso ao id
     */

    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
