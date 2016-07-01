import mergeCfg from '../src/mergeCfg';
import expect from 'expect.js';

describe('mergeCfg', () => {
  it('merge with query', done => {
    const query = {
      scheme: 'http://m.alipay.com',
    };
    expect(mergeCfg(query)).to.eql({
      application: 'mobilesafari',
      bundleId: '',
      device: 'iPhone 6',
      downloadURL: '',
      prefix: 'antm',
      scheme: 'http://m.alipay.com',
      sdk: '',
    });
    done();
  });

  it('merge with query and global simOpts', done => {
    const query = {
      scheme: 'http://m.alipay.com',
    };
    const simOpts = {
      device: 'iPhone 5s',
      scheme: 'http://oo.xx.com',
      verbose: true,
    };
    expect(mergeCfg(query, simOpts)).to.eql({
      application: 'mobilesafari',
      bundleId: '',
      device: 'iPhone 5s',
      downloadURL: '',
      prefix: 'antm',
      scheme: 'http://oo.xx.com',
      sdk: '',
      verbose: true,
    });
    done();
  });
});
