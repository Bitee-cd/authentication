import React, {useCallback,useState} from 'react'
import {useDropzone} from 'react-dropzone'

function Other() {
    const [file, setFile] = useState(null)
    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0])
        console.log(acceptedFiles[0])
      }, [file])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
     <div {...getRootProps()} className="">
      <input {...getInputProps()}  accept="audio/*"/>
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
      {file &&<p>{file.name}</p>}
    </div>
  )
}
export default Other