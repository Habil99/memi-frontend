/**
 * Upload API Service
 */

import { apiClient } from './client'

class UploadService {
  async uploadSingle(file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.upload('/upload/single', formData)
  }

  async uploadMultiple(files: File[]): Promise<{ urls: string[] }> {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })
    return apiClient.upload<{ urls: string[] }>('/upload/multiple', formData)
  }
}

export const uploadService = new UploadService()

