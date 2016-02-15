import { type } from 'os';
import Simulator from 'node-isimulator';
import co from 'co';
import EventEmitter from 'events';
const eventEmitter = new EventEmitter();

import mergeCfg from './mergeCfg';

let lastOpts = {};
let simOpts = {};
let sim = {};

eventEmitter.on('initializationSimOpts', () => {
  if (type() === 'Darwin') {
    sim = new Simulator(lastOpts);
    co(sim.start(lastOpts.scheme));
  }
});

eventEmitter.on('changeSimOptsNeedReopen', () => {
  if (type() === 'Darwin') {
    co(sim.killAll());
  }
  eventEmitter.emit('initializationSimOpts');
});

eventEmitter.on('changeSimOptsDoNotNeedReopen', () => {
  if (type() === 'Darwin') {
    co(sim.start(lastOpts.scheme));
  }
});

export default {
  'server.before'() {
    const { query, get, set } = this;
    set('simulatorEmitter', eventEmitter);
    simOpts = get('_global_simOpts') || {};
    lastOpts = mergeCfg(query, simOpts);

    eventEmitter.emit('initializationSimOpts');

    const configManagerEmitter = get('configManagerEmitter');
    if (!configManagerEmitter) {
      return;
    }

    configManagerEmitter.on('_global_simOpts', () => {
      simOpts = get('_global_simOpts');
      const changeFinalOpts = mergeCfg(query, simOpts);
      if (changeFinalOpts.application !== lastOpts.application
        || changeFinalOpts.device !== lastOpts.device
        || changeFinalOpts.os !== lastOpts.os) {
        lastOpts = changeFinalOpts;
        eventEmitter.emit('changeSimOptsNeedReopen');
      } else if (changeFinalOpts.scheme !== lastOpts.scheme) {
        lastOpts = changeFinalOpts;
        eventEmitter.emit('changeSimOptsDoNotNeedReopen');
      }
    });
  },
};
