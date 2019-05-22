import { exec } from '../exec'

export default function BuildUMD() {
  console.log('Building: '.cyan + 'umd module'.green)

  return exec(`npm run build-umd`)
    .then(() => exec(`npm run build-umd:min`))
    .then(() => console.log('Built: '.cyan + 'umd module'.green))
}
