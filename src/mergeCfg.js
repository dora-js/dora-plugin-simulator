function mergeCfg(query, globalSimOpts) {
  const options = {
    application: 'mobilesafari',
    bundleId: '',
    device: 'iPhone 6',
    downloadURL: '',
    prefix: 'antm',
    scheme: 'http://127.0.0.1',
    sdk: '',
  };
  const finalOpts = { ...options, ...query, ...globalSimOpts };

  return finalOpts;
}

export default mergeCfg;
