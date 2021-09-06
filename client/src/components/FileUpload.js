import { Fragment } from 'react'

const FileUpload = () => {
  return (
    <Fragment>
      <form>
        <div className="custom-file">
          <label>Pilih Gambar</label>
          <input type="file" className='custom-file-input' id='customFile' accept="image/png, image/gif, image/jpeg, image/jpg"/>
          <label className='custom-file-label' htmlFor="customFile">Pilih Gambar</label>
        </div>
        <input type="submit" value="Upload" className='btn btn-primary btn-block mt-4'/>
      </form>
    </Fragment>
  )
}

export default FileUpload
