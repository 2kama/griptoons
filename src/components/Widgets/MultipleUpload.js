import React, { Fragment, useState } from 'react'

//third party components
import firebase from '../../utils/Firebase'
// import dragDrop from 'drag-drop'
import { v4 as uuidv4 } from 'uuid';
import { Modal, ProgressBar, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const storage = firebase.storage().ref()





const MultipleUpload = ({ fileArray, updateArray, fileDestination, fileType, sizeLimit, inputID, inputText }) => {


    const [progress, setProgress] = useState([])
    const [show, toggleShow] = useState(false)

    
    let myArray = fileArray

    const upLoading = (file, index) => {

        let tempProgress = progress

        if(fileType.indexOf(file.type) !== -1) {

            if(file.size <= sizeLimit) {

                let metadata = {
                    contentType : file.type
                }

                const newImageName = `${uuidv4()}.${file.type.split("/")[1]}`

                let uploadTask = storage.child(`${fileDestination}/${newImageName}`).put(file, metadata)

                 uploadTask.on('state_changed', snapshot => {


                    tempProgress[index] = {
                        msg : `${file.name} is Uploading`,
                        type : 'primary',
                        progress : (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    }
                    setProgress(tempProgress)

                 }, err => {
                     
                    tempProgress[index] = {
                        msg : `${file.name} : ${err.code}`,
                        type : 'danger',
                        progress : 0
                    }
                    setProgress(tempProgress)

                 }, () => {

                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {

                        tempProgress[index] = {
                            msg : `${file.name} uploaded Successfully`,
                            type : 'success',
                            progress : 100
                        }
                        setProgress(tempProgress)

                       myArray.push({"url" : downloadURL, "imageName" : newImageName})
                       updateArray(myArray)
                       
                    })

                 })

            }else {
                
                tempProgress[index] = {
                    msg : `${file.name} is larger than ${sizeLimit / 1024}`,
                    type : 'danger',
                    progress : 0
                }
                setProgress(tempProgress)
            }

        }else {
            tempProgress[index] = {
                msg : `${file.name} is not an acceptable image file`,
                type : 'danger',
                progress : 0
            }
            setProgress(tempProgress)
        }


    }




    const filesAdded = () => {
        let files = document.querySelector(`#${inputID}`).files
        setProgress([])
        toggleShow(true)
        
        for(let i=0; i<files.length; i++) {
            upLoading(files[i], i)
        }
        
    }
    


    return(
        <Fragment>
           

            <Modal show={show} onHide={e => toggleShow(!show)} size="md">

            

                <Modal.Body>
                    <div className="formBox gt-shadow">

                    <Modal.Header closeButton>
                        <Modal.Title>Progress...</Modal.Title>
                    </Modal.Header>

                        {progress.length >= 1 && progress.map((prog, idx) => 
                            <div key={idx} >
                                <Alert className="mb-0" variant={prog.type}>
                                    {prog.msg}
                                </Alert>
                                <ProgressBar className="mb-4" animated variant="primary" now={prog.progress} />
                            </div>)}

                    </div>
                </Modal.Body>
            </Modal>

         

            <div className="pageUpload gt-shadow">
                <div className="multiHolder">
                <FontAwesomeIcon icon="cloud-upload-alt" />
                <span>{inputText}</span>
                </div>
                
                <input type="file" id={inputID} className="glassFileUpload" multiple onChange={filesAdded}/>
            </div>

          
            
        </Fragment>
    )
}




export default MultipleUpload