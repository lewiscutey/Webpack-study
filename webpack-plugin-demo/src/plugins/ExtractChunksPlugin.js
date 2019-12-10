/*
 * Copyright (C) 2017, hapjs.org. All rights reserved.
 */

const pluginName = 'ExtractChunksPlugin'

class ExtractChunksPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap(pluginName, compilation => {
      compilation.hooks.optimizeDependenciesAdvanced.tap(pluginName, modules => {
        for (const module of modules) {
          if (module.reasons.length < 2) continue

          const chunkName = module.resource.match(/\w+(?=\.)/gi)[0]
          const isHasChunk = compilation.chunks.every(chunk => chunk.name !== chunkName)
          if (!isHasChunk) continue

          const newChunk = compilation.addChunk(chunkName)
          if (module.addChunk(newChunk)) {
            newChunk.addModule(module)
          }
          newChunk.entryModule = undefined
          newChunk.isExtractChunk = true
        }
      })

      compilation.hooks.beforeModuleAssets.tap(pluginName, () => {
        
      })

      compilation.hooks.additionalAssets.tap(pluginName, () => {

      })

    })
  }
}
module.exports = ExtractChunksPlugin