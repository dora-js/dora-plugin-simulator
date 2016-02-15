function mergeCfg(query, globalSimOpts) {
  const options = {
    prefix: 'antm',
    application: 'mobilesafari',
    device: 'iPhone-6',
    os: '9.2',
    appPath: '',
    downloadURL: '',
    scheme: 'http://127.0.0.1',
    verbose: false,
  };
  const finalOpts = { ...options, ...query, ...globalSimOpts };

  return finalOpts;
}

export default mergeCfg;
