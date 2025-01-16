import { Solver } from '2captcha';
import { FastifyBaseLogger } from 'fastify';
import { env } from '../env';

export class CaptchaService {
  private solver: Solver;
  private logger: FastifyBaseLogger;

  constructor(logger: FastifyBaseLogger) {
    this.logger = logger;
    if (!env.CAPTCHA_API_KEY) {
      throw new Error('CAPTCHA_API_KEY is required for CaptchaService');
    }
    this.solver = new Solver(env.CAPTCHA_API_KEY);
  }

  async solveRecaptchaV2(siteKey: string, url: string): Promise<string> {
    try {
      this.logger.info(`Solving reCAPTCHA v2 for ${url}`);
      const result = await this.solver.recaptcha(siteKey, url);
      this.logger.info('reCAPTCHA solved successfully');
      return result.data;
    } catch (error) {
      this.logger.error('Failed to solve reCAPTCHA:', error);
      throw error;
    }
  }

  async solveRecaptchaV3(siteKey: string, url: string, action: string): Promise<string> {
    try {
      this.logger.info(`Solving reCAPTCHA v3 for ${url}`);
      // 使用 recaptcha 方法，添加额外的 v3 参数
      const result = await this.solver.recaptcha(siteKey, url, {
        version: 'v3',
        action: action
      });
      this.logger.info('reCAPTCHA v3 solved successfully');
      return result.data;
    } catch (error) {
      this.logger.error('Failed to solve reCAPTCHA v3:', error);
      throw error;
    }
  }

  async solveHCaptcha(siteKey: string, url: string): Promise<string> {
    try {
      this.logger.info(`Solving hCaptcha for ${url}`);
      const result = await this.solver.hcaptcha(siteKey, url);
      this.logger.info('hCaptcha solved successfully');
      return result.data;
    } catch (error) {
      this.logger.error('Failed to solve hCaptcha:', error);
      throw error;
    }
  }
}
