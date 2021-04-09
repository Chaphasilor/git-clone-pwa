export class Directory {

  constructor(parentDir, dirName) {

    //TODO type checks
    // if (!(parentDir instanceof FileSystemDirectoryHandle)) {
    //   throw new Error(`Argument 'parentDir' has to be of type 'FileSystemDirectoryHandle'! Received type`, typeof parentDir)
    // }

    this.parentDir = parentDir
    this.dirName = dirName

    if (parentDir !== null) {
      return this.init()
    }

  }

  async init() {
    this.handle = await this.parentDir.handle.getDirectoryHandle(this.dirName, {
      create: true,
    })
    return this
  }

  get name() {
    return this.handle.name
  }

  async getEntries() {

    const entries = []
    for await (const entry of this.handle.values()) {
      entries.push(entry);
    }
    return entries
    
  }

  async delete() {

    if (this.parentDir === null) {
      throw new Error(`You can't delete the root directory!`)
    }
    
    await this.parentDir.handle.removeEntry(this.name, {
      recursive: true,
    })

  }
  
}

export class RootDirectory extends Directory {

  //TODO automatically ask for write permissions
  constructor(writeAccess) {

    super(null, `ROOT`)
    
    this.writeAccess = writeAccess

    return this.init()
    
  }

  async init() {

    this.handle = await window.showDirectoryPicker()
    return this

  }
  
}
