import { join } from 'path';
import { writeFileSync } from 'fs';
import expect from 'expect.js';
import dora from 'dora';
import { simUtil } from 'node-isimulator';

const oldCwd = process.cwd();
const fixtures = join(oldCwd, 'test/fixtures');

describe('index', () => {
  const simOpts = {
    sdk: '',
    udid: '',
  };
  before(async done => {
    try {
      simOpts.sdk = await simUtil.getLatestSDK();
      process.chdir(fixtures);
      dora({
        port: 12346,
        plugins: [
          'config-manager?path=./mobile.config.js|simOpts',
          '../../src/index',
        ],
        cwd: fixtures,
        verbose: true,
      }, done);
    } catch (e) {
      done(e);
    }
  });

  afterEach(async done => {
    try {
      await simUtil.killAllSimulators();
      await simUtil.deleteDevice(simOpts.udid);
      simOpts.udid = '';
      if (simOpts.rewrite) {
        writeFileSync(
          join(fixtures, './mobile.config.js'),
          "var simOpts = { prefix:'doraPlugin', scheme: 'http://m.baidu.com' }; " +
          'module.exports.simOpts = simOpts;',
          'utf-8'
        );
        simOpts.rewrite = false;
      }
      done();
    } catch (e) {
      done(e);
    }
  });

  it('should create a simulator named doraPluginSim--iPhone-6--${latestsdk}', async done => {
    try {
      const normalizeSDK = simOpts.sdk.replace(/\./, '-');
      const simName = `doraPluginsim--iPhone-6--${normalizeSDK}`;
      const sim = await simUtil.getUdidBySimName(simName);
      expect(sim).to.not.be.empty();
      simOpts.udid = sim[0];
      done();
    } catch (e) {
      done(e);
    }
  });

  it('change mobile.config.js should create doraPluginSim--iPhone-5s--${latestsdk}', done => {
    try {
      writeFileSync(
        join(fixtures, './mobile.config.js'),
        "var simOpts = { prefix:'doraPlugin', device: 'iPhone 5s' }; " +
        'module.exports.simOpts = simOpts;',
        'utf-8'
      );
      setTimeout(async () => {
        const normalizeSDK = simOpts.sdk.replace(/\./, '-');
        const simName = `doraPluginsim--iPhone-5s--${normalizeSDK}`;
        const sim = await simUtil.getUdidBySimName(simName);
        console.log(sim)
        expect(sim).to.not.be.empty();
        simOpts.udid = sim[0];
        simOpts.rewrite = true;
        done();
      }, 2000);
    } catch (e) {
      done(e);
    }
  });
});
