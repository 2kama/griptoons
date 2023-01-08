import React, { Fragment, useState } from 'react'

//third party components
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//custom components
import readApi from '../../api/read'
import { shrinkNumber } from '../../Helpers/functions'

let subStatus = null



const SubscribeButton = ({ comic, user, subscribeData, full }) => {
    

    const[subscribed, setSubscribed] = useState(user.isAuthenticated ? user.subscription[`${comic.id}`] ? true : false : null)
    const[subscribers, setSubscribers] = useState(subscribeData)


    const updateSub = async (add) => {

        if(add === subStatus) {

        }else {

            subStatus = add
            const requestID = uuidv4()

            try {

                await readApi.updateSub(comic.id, comic.createdBy, user.uid, requestID)
                add ? setSubscribed(true) : setSubscribed(false)
                add ? setSubscribers(subscribers + 1) : setSubscribers(subscribers - 1)
                
            } catch (err) {
                
            }
        

        } 
       
    
    }



    return(
        <Fragment>
            {
                full && <span><FontAwesomeIcon icon="user-plus" /> {shrinkNumber(subscribers)}</span>
            }
            {
                user.isAuthenticated && user.uid !== comic.createdBy && (
                    <button className={`eventButton ${subscribed ? "btn-danger" : "btn-outline-danger"}`} onClick={e => updateSub(!subscribed)}>{subscribed ? "Subscribed" : "+ Subscribe"}</button> 
                )
            }
            

        </Fragment>
    )
}


export default SubscribeButton