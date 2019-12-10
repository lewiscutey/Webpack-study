class SplitPlugin {
  constructor(options) {
		this.options = options;
  }
  
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("SplitPlugin", compilation => {
      compilation.hooks.optimizeDependenciesAdvanced.tap("SplitPlugin", modules => {
        debugger
        for (const module of modules) {
          if (module.reasons.length < 2) continue;
        
          const chunkName = module.resource.match(/\w+(?=\.)/ig)[0]
          const isHasChunk = compilation.chunks.every(chunk => chunk.name !== chunkName);
          if(!isHasChunk) continue;
          const newChunk = compilation.addChunk(chunkName);

          if (module.addChunk(newChunk)) {
            newChunk.addModule(module);
          }

          newChunk.entryModule = undefined;
        }
      })
    })
  }
}
module.exports = SplitPlugin