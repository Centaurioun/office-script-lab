import loglevel, { Logger } from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

export function initializeLoggers() {
  prefix.reg(loglevel);
}

const initializedLoggers: { [key: string]: Logger } = {};

export function getLogger(name: string): Logger {
  if (!initializedLoggers[name]) {
    const logger = loglevel.getLogger(name);
    logger.setLevel(
      process.env.NODE_ENV === 'production'
        ? loglevel.levels.WARN
        : loglevel.levels.TRACE,
    );
    prefix.apply(logger, {
      template: '%l (%n):',
      levelFormatter(level) {
        return level.toUpperCase();
      },
      nameFormatter(name) {
        return name || 'global';
      },
    });

    initializedLoggers[name] = logger;
  }

  return initializedLoggers[name];
}
