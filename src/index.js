import start from 'node-isimulator';
import isEqual from 'lodash.isequal';
import mergeCfg from './mergeCfg';

let lastOpts = {};
let simOpts = {};

export default {
  async 'server.before'() {
    const { query, get } = this;

    simOpts = get('_global_simOpts') || {};
    lastOpts = mergeCfg(query, simOpts);

    const configManagerEmitter = get('configManagerEmitter');
    if (!configManagerEmitter) {
      return;
    }

    configManagerEmitter.on('_global_simOpts', async () => {
      simOpts = get('_global_simOpts');
      const changeFinalOpts = mergeCfg(query, simOpts);
      if (!isEqual(lastOpts, changeFinalOpts)) {
        await start(changeFinalOpts);
      }
    });

    await start(lastOpts);
  },
};
