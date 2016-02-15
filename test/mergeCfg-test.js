import mergeCfg from '../src/mergeCfg';
import expect from 'expect';

describe('mergeCfg', () => {
  it('merge with query', done => {
    const query = {
      scheme: 'http://m.alipay.com',
      verbose: true,
    };
    expect(mergeCfg(query)).toEqual({
      prefix: 'antm',
      application: 'mobilesafari',
      device: 'iPhone-6',
      os: '9.2',
      appPath: '',
      downloadURL: '',
      scheme: 'http://m.alipay.com',
      verbose: true,
    });
    done();
  });

  it('merge with query and global simOpts', done => {
    const query = {
      scheme: 'http://m.alipay.com',
      verbose: true,
    };
    const simOpts = {
      device: 'iPhone-5s',
      scheme: 'http://oo.xx.com',
    };
    expect(mergeCfg(query, simOpts)).toEqual({
      prefix: 'antm',
      application: 'mobilesafari',
      device: 'iPhone-5s',
      os: '9.2',
      appPath: '',
      downloadURL: '',
      scheme: 'http://oo.xx.com',
      verbose: true,
    });
    done();
  });
});
