import React, { useEffect, useState } from 'react'

import api from './services/api'

interface ApiFile {
  name: string
  url: string
  id: number
}

function App() {
  const [files, setFiles] = useState<ApiFile[]>([])
  const [fileToUpload, setFileToUpload] = useState<File | null>()

  useEffect(() => {
    api.get('/files').then((response) => {
      setFiles(response.data)
    })
  }, [])

  async function handleSubmit() {
    if (!fileToUpload) return
    var formData = new FormData()
    formData.append('file', fileToUpload)

    await api.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    window.location.reload()
  }

  return (
    <>
      <input
        type="file"
        onChange={(e) => setFileToUpload(e.target.files?.[0])}
      />
      <button onClick={handleSubmit}>Enviar</button>
      {files.map((file) => (
        <div key={file.id}>
          <p>{file.name}</p>
          <a href={file.url}>Download</a>
        </div>
      ))}
    </>
  )
}

export default App
