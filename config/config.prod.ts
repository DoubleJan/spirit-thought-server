import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // config.fileRoot = 'c://files/spirit-thought-server/assets';
  return config;
};
