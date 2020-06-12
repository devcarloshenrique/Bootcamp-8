import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
  async index(req, res) {
    // Paginação
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      // Quantos registros seram pulados
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json({ appointments });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // verificando se o provider_id as provider é igual a true
    const CheckIsProvider = await User.findOne({
      where: {
        // Estou procurando um usuario pelo provider_id e filtrando para apenas os usuarios com provider == true
        id: provider_id,
        provider: true,
      },
    });

    if (!CheckIsProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointment with provider' });
    }

    /* ParseISO transforma essa date em objeto.date do javascript, este objeto pode ser usado dentro do
     * metodo startOfHour que vai aredondar as horas 18:35 == 18:00
     */
    const hourStart = startOfHour(parseISO(date));

    // Verificando se hourStart está antes de new Date()
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // Checando se tem horario disponivel
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not avaliable' });
    }

    // Criando Appointment
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    // Notificando prestador de serviços

    const user = await User.findByPk(req.userId);
    const formatteDate = format(
      hourStart,
      "'dia' dd 'de' MMM', ás' H:mm'h'  ",
      {
        locale: pt,
      }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formatteDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appoinment.",
      });
    }

    // Removendo duas horas do horario agendamo
    const dateWithSub = subHours(appointment.date, 2);

    // Se dateWithSub for antes do horario atual, é possível fazer o cancelamento do appoinment
    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance. ',
      });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
