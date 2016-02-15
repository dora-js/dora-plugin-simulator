import { join } from 'path';
import { writeFileSync } from 'fs';

import sinon from 'sinon';
import expect from 'expect';
import dora from 'dora';

const oldCwd = process.cwd();
const fixtures = join(oldCwd, 'test/fixtures');
let simulatorEmitter = {};
const spyInitial = sinon.spy();
const spyReOpen = sinon.spy();
const spyJustOpen = sinon.spy();

describe('index', function sim() {
  this.timeout(25000);
  before(done => {
    process.chdir(fixtures);
    dora({
      port: 12346,
      plugins: [
        'config-manager?path=./mobile.config.js|simOpts',
        '../../src/index?{scheme:"http://127.0.0.1:12345"}',
        {
          'server.after': function after() {
            const { get } = this;
            simulatorEmitter = get('simulatorEmitter');
            simulatorEmitter.on('initializationSimOpts', spyInitial);
            simulatorEmitter.on('changeSimOptsNeedReopen', spyReOpen);
            simulatorEmitter.on('changeSimOptsDoNotNeedReopen', spyJustOpen);
          },
        },
      ],
      cwd: fixtures,
      verbose: true,
    });
    setTimeout(done, 15000);
  });

  after(done => {
    writeFileSync(
      join(fixtures, './mobile.config.js'),
      `var simOpts = { scheme: 'http://m.baidu.com' }; module.exports.simOpts = simOpts;`,
      'utf-8'
    );
    process.chdir(oldCwd);
    done();
  });

  it('changeSimOptsDoNotNeedReopen should called', done => {
    writeFileSync(
      join(fixtures, './mobile.config.js'),
      `var simOpts = { scheme: 'http://m.taobao.com' }; module.exports.simOpts = simOpts;`,
      'utf-8'
    );

    setTimeout(() => {
      expect(spyReOpen.called).toEqual(false);
      expect(spyJustOpen.called).toEqual(true);
      done();
    }, 10000);
  });

  it('changeSimOptsNeedReopen should called', done => {
    writeFileSync(
      join(fixtures, './mobile.config.js'),
      `var simOpts = { device: 'iPhone-5s', scheme: 'https://www.npmjs.com/package/dora-plugin-simulator' }; module.exports.simOpts = simOpts;`,
      'utf-8'
    );

    setTimeout(() => {
      expect(spyReOpen.called).toEqual(true);
      expect(spyInitial.called).toEqual(true);
      done();
    }, 15000);
  });
});
