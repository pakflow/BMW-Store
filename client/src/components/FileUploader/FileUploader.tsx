import React, { FC } from 'react'

interface FileUploaderProps {
  upload: (file: File) => Promise<string>
  value: string
  onChange: (url: string) => void
}

const FileUploader: FC<FileUploaderProps> = ({ upload, value, onChange }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      const file = files[0]
      const response = await upload(file)
      onChange(response)
    }
  }

  return (
    <div className="form-control w-full max-w-xs">
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default FileUploader
