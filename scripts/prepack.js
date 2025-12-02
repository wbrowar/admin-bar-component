// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the compiled js files in the root of the package.
// It will not be included in the npm package.

import fs from 'fs'

function main() {
  console.log('START: Prepacking')

  console.log('Parsing `package.json` file')
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

  console.log('  Moving `dist` files to root')

  packageJson.packagedFiles.forEach((file) => {
    if (fs.existsSync(`./dist/${file}`)) {
      console.log(`Moving ${'`' + file + '`'} to root`)
      fs.copyFileSync(`./dist/${file}`, `./${file}`)
    } else {
      throw Error(`File does not exist`)
    }
  })

  console.log('END: Prepacking')
}

main()
