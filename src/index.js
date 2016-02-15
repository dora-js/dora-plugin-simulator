import Simulator from 'node-isimulator';
import co from 'co';
import EventEmitter from 'events';
const eventEmitter = new EventEmitter();

import mergeCfg from './mergeCfg';

let lastOpts = {};
let simOpts = {};
let sim = {};

eventEmitter.on('initializationSimOpts', () => {
  sim = new Simulator(lastOpts);
  co(sim.start(lastOpts.scheme));
});

eventEmitter.on('changeSimOptsNeedReopen', () => {
  co(sim.killAll());
  eventEmitter.emit('initializationSimOpts');
});

eventEmitter.on('changeSimOptsDoNotNeedReopen', () => {
  co(sim.start(lastOpts.scheme));
});

export default {
  'server.before'() {
    const { query, get, set } = this;
    console.log('0. ', query);
    simOpts = get('_global_simOpts');
    const configManagerEmitter = get('configManagerEmitter');
    set('simulatorEmitter', eventEmitter);

    lastOpts = mergeCfg(query, simOpts);

    eventEmitter.emit('initializationSimOpts');

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
