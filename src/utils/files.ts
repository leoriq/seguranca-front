export const fileToBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      console.log('reader.result', reader.result, typeof reader.result)
      return resolve(reader.result)
    }
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })

export const base64ToFile = async (
  base64Data: string,
  name: string
): Promise<File> => {
  const response = await fetch(base64Data)
  const data = await response.blob()
  const type = response.headers.get('content-type')
  if (type) {
    return new File([data], name, { type })
  }
  return new File([data], name)
}

export const urlToFile = async (url: string, name: string): Promise<File> => {
  const response = await fetch(url)
  const data = await response.blob()
  const type = response.headers.get('content-type')
  if (type) {
    return new File([data], name, { type })
  }
  return new File([data], name)
}
