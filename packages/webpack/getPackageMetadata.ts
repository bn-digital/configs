import fs from 'fs'
import path from 'path'

export const getPackageMetadata: () => Package.Metadata | null = () => {
  const workingDir = fs.realpathSync(process.cwd())
  if (!fs.existsSync(path.join(workingDir, 'package.json'))) {
    console.warn(`No package.json detected in ${workingDir}`)
    return null
  }
  try {
    return JSON.parse(fs.readFileSync(path.join(workingDir, 'package.json'), 'utf-8'))
  } catch (e) {
    console.error(e)
    return null
  }
}
