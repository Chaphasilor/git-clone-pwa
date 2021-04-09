export async function cloneGithubRepo(repoUrl) {

  let userRepoString = repoUrl.replace(`http://github.com/`, ``).replace(`https://github.com/`, ``).split(`/`).splice(0, 2).join(`/`)

  console.log(`userRepoString:`, userRepoString)

  // const apiResponse = await fetch(`https://api.github.com/repos/${userRepoString}/contents/`)

  // const rootDirRaw = await apiResponse.json()

  return await fetchGithubRepoRecursive({}, userRepoString.split(`/`)[1], `https://api.github.com/repos/${userRepoString}/contents/`)


}

export async function fetchGithubRepoRecursive(dirObject, currentDirName, currentDirUrl) {

  const apiResponse = await fetch(currentDirUrl)
  const dirRaw = await apiResponse.json()

  dirObject.name = currentDirName

  // console.log(`currentDirName:`, currentDirName)
  // console.log(`currentDirUrl:`, currentDirUrl)

  dirObject.files = dirRaw.filter(x => x.type === `file`).map(file => {
    return {
      name: file.name,
      url: file.download_url,
    }
  })

  let dirs = dirRaw.filter(x => x.type === `dir`)
  dirObject.directories = []

  for (const dir of dirs) {
    dirObject.directories.push(await fetchGithubRepoRecursive({}, dir.name, dir.url))
  }

  // console.log(`dirObject:`, dirObject)
  return dirObject

}