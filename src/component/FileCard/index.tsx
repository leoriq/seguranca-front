import { ApiFile } from '../../App'
import api, { baseURL } from '../../services/api'
import { decrypted } from '../../utils/cryptography'
import { urlToFile } from '../../utils/files'

interface FileCardProps {
  file: ApiFile
}
const fileRoutes = baseURL + '/files/'
export const FileCard = ({ file }: FileCardProps): JSX.Element => {
  async function handleDownload() {
    const fileEncrypted = await urlToFile(fileRoutes + file.path, file.name)
    const secret = prompt('Informe a senha')
    if (!secret) {
      return
    }
    const fileToDownload = await decrypted(fileEncrypted, secret)

    const aElement = document.createElement('a')
    aElement.setAttribute('download', file.name)
    const href = URL.createObjectURL(fileToDownload)
    aElement.href = href
    aElement.setAttribute('target', '_blank')
    aElement.click()

    URL.revokeObjectURL(href)
  }
  return (
    <div
      key={file.id}
      style={{
        border: '1px solid #c6c6c6',
        margin: '10px',
        padding: '6px',
        borderRadius: '8px',
      }}
    >
      <p>{file.name}</p>
      <button type="button" onClick={() => handleDownload()}>
        Download
      </button>
    </div>
  )
}
