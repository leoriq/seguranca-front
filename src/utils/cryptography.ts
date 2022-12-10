// crypto module
// const crypto = require('crypto')
// const CryptoJS = require('crypto-js')

import CryptoJS from 'crypto-js'
import { base64ToFile, fileToBase64 } from './files'

export const encrypt = async (data: File, secretKey: string): Promise<File> => {
  const hash256 = CryptoJS.SHA256(secretKey).toString()
  console.log('hash256 secretKey:', hash256)
  const toEncrypt = (await fileToBase64(data)) ?? ''
  if (typeof toEncrypt !== 'string') throw new Error('no string content')
  const encryptedData = CryptoJS.AES.encrypt(toEncrypt, hash256).toString()
  console.log('Encrypted message:', encryptedData)
  const { name, lastModified, type } = data
  return new File([encryptedData], name, { lastModified, type })
}

export const decrypted = async (
  data: File,
  secretKey: string
): Promise<File> => {
  const hash256 = CryptoJS.SHA256(secretKey).toString()
  console.log('hash256 secretKey:', hash256)
  const toDecrypt = await data.text()
  const decryptedData = CryptoJS.AES.decrypt(toDecrypt, hash256).toString(
    CryptoJS.enc.Utf8
  )
  console.log('Decrypted message:', decryptedData)
  return await base64ToFile(decryptedData, data.name)
}
