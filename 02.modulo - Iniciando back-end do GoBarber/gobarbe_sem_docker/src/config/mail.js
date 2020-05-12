export default {
  /**
   * Padrão utilizado SMTP, padrão de envio de email
   */
  host: 'smtp.mailtrap.io',
  port: '2525',
  /**
   * Estamos utilizando SSL ou não
   */
  secure: false,
  auth: {
    user: '33ab6431a0b24d',
    pass: '44cdd31202384b',
  },
  default: {
    /**
     * Remetente padrão
     */
    from: 'Equipe Gobarber <noreply@gobarber.com>',
  },
};
