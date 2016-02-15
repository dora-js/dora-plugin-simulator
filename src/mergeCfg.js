function mergeCfg(query, globalSimOpts) {
  const options = {
    prefix: 'antm',
    application: 'mobilesafari',
    device: 'iPhone-6',
    os: '9.2',
    appPath: '',
    downloadURL: '',
    scheme: '',
    verbose: true,
  };
  const finalOpts = { ...options, ...query, ...globalSimOpts };

  return finalOpts;
}

export default mergeCfg;
