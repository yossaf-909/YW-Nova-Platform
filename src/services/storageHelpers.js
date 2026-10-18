import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { isConfigured, storage } from '../lib/firebase'

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function uploadAsset(file, folder) {
  if (!file) {
    return null
  }

  if (!isConfigured || !storage) {
    return {
      url: await readFileAsDataUrl(file),
      fileName: file.name,
    }
  }

  const assetRef = ref(storage, `${folder}/${Date.now()}-${file.name}`)
  await uploadBytes(assetRef, file)
  const downloadUrl = await getDownloadURL(assetRef)

  return {
    url: downloadUrl,
    fileName: file.name,
  }
}
