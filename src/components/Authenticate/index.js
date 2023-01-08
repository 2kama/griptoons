import React, { Fragment, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

//custom party component
import authApi from '../../api/auth'

//third party component


const Authenticate = ({ inside, strict }) => {

    
    const dispatch = useDispatch()
    

    useEffect(() => {
        
        dispatch(authApi.authenticate())


    }, [dispatch])

    const { isLoading, isAuthenticate } = useSelector(state => ({
        isLoading : state.user.isLoading,
        isAuthenticate : state.user.isAuthenticated
    }), shallowEqual)

    

     return (
        <Fragment>
          
            {
                !isLoading && (inside ? ( isAuthenticate ? <></> : (strict ? <Redirect to="/" /> : <></>) ) : (isAuthenticate ? <Redirect to="/" /> : <></>))
            }
        </Fragment>
     )


}



export default Authenticate