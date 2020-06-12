import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    /**
     * Será criado uma fila para cada background jobs (trabalhos em segundo plano)
     */
    this.queues = {};

    this.init();
  }

  init() {
    /**
     * Pegando todos os jobs da aplicação e armazenando em this.queues
     */
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        /**
         * Armazenando a fila que possui a coneção com o banco não relacional
         */
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        /**
         * Responsável por processar e armazenar
         */
        handle,
      };
    });
  }

  /**
   * Resposável por colocar o novo trabalho da fila em background
   */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.process(handle);
    });
  }
}

export default new Queue();
