import React, { useEffect, useState } from 'react'
import { FileCard } from './component/FileCard'

import api from './services/api'
import { decrypted, encrypt } from './utils/cryptography'

export interface ApiFile {
  url: string
  id: number
  name: string
  path: string
  updatedAt: string
  createdAt: string
}

function App() {
  const [files, setFiles] = useState<ApiFile[]>([])
  const [fileToUpload, setFileToUpload] = useState<File | null>()
  const [secret, setSecret] = useState('')

  useEffect(() => {
    api.get('/files').then((response) => {
      setFiles(response.data)
    })
  }, [])

  async function handleSubmit() {
    if (!fileToUpload) return
    var formData = new FormData()
    try {
      const encryptedFile = await encrypt(fileToUpload, secret)
      formData.append('file', encryptedFile)

      const newFile: { data: ApiFile } = await api.post('/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setFiles([...files, newFile.data])
    } catch (error) {}
  }

  return (
    <>
      <div style={{ margin: '10px', padding: '6px' }}>
        <input
          type="file"
          onChange={(e) => setFileToUpload(e.target.files?.[0])}
        />
        <input
          type="text"
          placeholder="senha"
          onChange={(e) => setSecret(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </>
  )
}

export default App
