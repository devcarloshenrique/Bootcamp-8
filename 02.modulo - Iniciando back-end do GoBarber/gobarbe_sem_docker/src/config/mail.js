export default {
  /**
   * Padrão utilizado SMTP, padrão de envio de email
   */
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  /**
   * Estamos utilizando SSL ou não
   */
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    /**
     * Remetente padrão
     */
    from: 'Equipe Gobarber <noreply@gobarber.com>',
  },
};
