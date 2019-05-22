import { exec } from '../exec'

export default function BuildCommonJs() {
  console.log('Building: '.cyan + 'cjs module'.green)

  return exec('npm run build-cjs')
    .then(() => console.log('Built: '.cyan + 'cjs module'.green))
}
