import { defineConfig } from 'dumi';
const pkg = require('./package.json');

export default defineConfig({
  title: `yap-lib v${pkg.version}`,
  favicon: 'https://shitu-query-nj.su.bcebos.com/2021-06-15/14/a92049bc9252f9d9?authorization=bce-auth-v1%2F7e22d8caf5af46cc9310f1e3021709f3%2F2021-06-15T06%3A27%3A47Z%2F300%2Fhost%2F11e1800ebe3cfa6f22ab9b48a8131e9b0c3732bcbf771f5e870dae4b7f31f7fb',
  logo: 'https://shitu-query-nj.su.bcebos.com/2021-06-15/14/a92049bc9252f9d9?authorization=bce-auth-v1%2F7e22d8caf5af46cc9310f1e3021709f3%2F2021-06-15T06%3A27%3A47Z%2F300%2Fhost%2F11e1800ebe3cfa6f22ab9b48a8131e9b0c3732bcbf771f5e870dae4b7f31f7fb',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
});
