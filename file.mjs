export class File {

  constructor(parentDir, fileName) {

    //TODO type checks
    // if (!(parentDir instanceof FileSystemDirectoryHandle)) {
    //   throw new Error(`Argument 'parentDir' has to be of type 'FileSystemDirectoryHandle'! Received type`, typeof parentDir)
    // }

    this.parentDir = parentDir
    this.fileName = fileName

    return this.init()

  }

  async init() {
    this.handle = await this.parentDir.handle.getFileHandle(this.fileName, {
      create: true,
    })
    return this
  }

  get name() {
    return this.handle.name
  }

  async _write({
    type,
    source
  }) {

    const writable = await this.handle.createWritable()
    
    switch (type.toLowerCase()) {
      case `text`:

        await writable.write(source)
        await writable.close()

        break;
      case `url`:
        
        const res = await fetch(source)
        await res.body.pipeTo(writable) // closes automatically
      
        break;
    
      default: // unknown type
        throw new Error(`Unknown type!`)
        break;
    }
    
  }

  async writeText(text) {
    return this._write({
      type: `text`,
      source: text,
    })
  }

  async writeUrl(url) {
    
    try {
      new URL(url.toString())
    } catch (err) {
      throw new Error(`Invalid URL! ('${url}')`, err)
    }
    
    return this._write({
      type: `url`,
      source: url.toString(),
    })
    
  }

  async delete() {
    await this.parentDir.handle.removeEntry(this.name)
  }

}