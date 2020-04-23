import multer from 'multer';
// biblioteca padrão do node, utilizada para gerar caracteres aleatorios
import crypto from 'crypto';
/* extname retorna a extenção de um arquivo enviado
 * resolve é para percorrer um caminho dentro da minha aplicação
 */
import { extname, resolve } from 'path';

export default {
  // Como o multer vai guardar o arquivo
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tpm', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        // a cb recebe como primeiro parametro um erro
        if (err) return cb(err);
        /* Caso eu não queira que der erro eu passo como primeiro parametro null
         * ao colocar, 'hex' eu estou transformando 16 bits de conteudo aleatorio em uma string hexadecimal
         */
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
