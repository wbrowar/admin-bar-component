// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the compiled js files in the root of the package.
// It will not be included in the npm package.

import fs from 'fs'

function main() {
  console.log('START: Prepacking')

  console.log('Parsing `package.json` file')
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

  console.log('Removing packaged files')

  packageJson.packagedFiles.forEach((file) => {
    if (fs.existsSync(`./${file}`)) {
      console.log(`  Deleting ${'`' + file + '`'}`)
      fs.rmSync(`./${file}`)
    }
  })

  console.log('Removing `dist` directory')

  if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true })
  }

  console.log('END: Prepacking')
}

main()
