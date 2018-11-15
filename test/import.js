export default (type) => {
  switch (type) {
    case "amd":
      return require('../amd/index').default;
    case "cjs":
      return require('../cjs/index').default;
    case "commonjs":
      return require('../commonjs/index').default;
    case "es":
      return require('../es/index').default;
    case "systemjs":
      return require('../systemjs/index').default;
    case "umd":
      return require('../umd/index').default;
    default:
      return require('../src/index').default;
  }
}