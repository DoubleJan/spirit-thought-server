import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // 配置静态资源根目录
  config.fileRoot = 'c://files/spirit-thought-server/assets';
  return config;
};
