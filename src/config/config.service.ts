import { Logger } from '@nestjs/common';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private logger = new Logger(ConfigService.name);

  constructor() {}

  public get(key: string) {
    return process.env[key];
  }

  public getDiscordToken() {
    return this.get('DISCORD_BOT_TOKEN');
  }

  public sendTestInsults() {
    return this.get('SEND_TEST_INSULTS');
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  // private validateInput(envConfig: EnvConfig): EnvConfig {
  //   const envVarsSchema: Joi.ObjectSchema = Joi.object({
  //     NODE_ENV: Joi.string()
  //       .valid(['development', 'production', 'test', 'provision'])
  //       .default('development'),
  //     DISCORD_BOT_TOKEN: Joi.string().required(),
  //     SEND_TEST_INSULTS: Joi.boolean().default(false),
  //   });

  //   const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);

  //   if (error) {
  //     throw new Error(`Config validation error: ${error.message}`);
  //   }

  //   return validatedEnvConfig;
  // }
}
