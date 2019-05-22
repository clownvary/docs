import { exec } from '../exec'

export default function BuildES() {
  console.log('Building: '.cyan + 'es module'.green)

  return exec('npm run build-es')
    .then(() => console.log('Built: '.cyan + 'es module'.green))
}
