const dynamicRequire = (prop: string, path: string) => {
  const imported = require(path)
  return prop ? imported[prop] : imported.default
}

export const taskMap: Record<string, Function> = {
  harness: () => dynamicRequire('runHarness', './harness'),
}
