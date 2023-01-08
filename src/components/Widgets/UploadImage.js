import React, { Fragment, useState } from 'react'

//third party components
import { ProgressBar } from 'react-bootstrap'
import firebase from '../../utils/Firebase'

//media
import defaultSquare from '../../img/default-square.png'
import defaultRect from '../../img/default-rect.png'


const storage = firebase.storage().ref()
const db = firebase.firestore()


const UploadImage = ({ dataClass, defaultImage, getUploadError, fileDisplay, sizeLimit, fileDestination, updateDetails, fileType }) => {

   
    const [progress, setProgress] = useState(0)

 

    const onChange = () => {

        let file = document.querySelector(`#${fileDisplay}`).files[0]

        getUploadError(false, "no-error")

        if(fileType.indexOf(file.type) !== -1) {

            if(file.size <= sizeLimit) {

                 let metadata = {
                     contentType : file.type
                 }

                
                 let uploadTask = storage.child(`${fileDestination}.${file.type.split("/")[1]}`).put(file, metadata)

                 uploadTask.on('state_changed', snapshot => {

                    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

                 }, err => {
                    getUploadError(true, err.code)
                 }, () => {

                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {

                        getUploadError(false, "no-error")

                       db.doc(updateDetails.Location).update({
                           [updateDetails.Field] : downloadURL
                           
                       })
                       document.querySelector(`.${dataClass}`).style.backgroundImage = `url(${downloadURL})`
                    })

                 })


            }else {
                getUploadError(true, `Image should be no larger than ${sizeLimit / 1024}kb`)
            }

        }else {
            getUploadError(true, "Image must be a png or jpeg/jpg image")
        }
    }



    return(
        <Fragment>
            

                <div className={`gt-shadow ${dataClass} ${fileDisplay}`} style={{backgroundImage : defaultImage === "" ? `url(${fileDisplay === "largeImageUpload" ? defaultRect : defaultSquare})` : `url(${defaultImage})`}}>
                    <input type="file" className="glassFileUpload" id={fileDisplay} onChange={onChange} />
                </div>
                {progress === 0 || progress === 100 ? <></> : <ProgressBar animated variant="success" now={progress} />}
            
            
        </Fragment>
    )
}


export default UploadImage