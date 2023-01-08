import firebase from '../utils/Firebase'
import { IS_AUTHENTICATED } from '../Helpers/statics'


const auth = firebase.auth()
const db = firebase.firestore()


const login = (email, password) => auth.signInWithEmailAndPassword(email, password)


const register = (email, password) => auth.createUserWithEmailAndPassword(email, password)


const logout = () => auth.signOut().then(() => {
    window.location.reload()
})




const reauthenticateUser = (email, password) => {

    const user = firebase.auth().currentUser
    let credentials = firebase.auth.EmailAuthProvider.credential(email, password)
    return user.reauthenticateWithCredential(credentials)

}


const deleteUser = (userID, email, reason) => {

        db.doc(`deleteUser/${userID}`).set({
            reason,
            email,
            userID,
            workedOn : false
        })

        return auth.currentUser.delete()


}


const changePassword = ( newPassword ) => auth.currentUser.updatePassword(newPassword)


const sendResetPassword = email => auth.sendPasswordResetEmail(email)

const verifyEmail = () => {

    const user = firebase.auth().currentUser
    user.sendEmailVerification()

}


const authenticate = () => dispatch => {

    auth.onAuthStateChanged(user => {


        if(user) {

            let userData = {
                isAuthenticated : true,
                emailVerified : user.emailVerified
            }

            db.doc(`users/${user.uid}`).onSnapshot(doc => {

                userData = {
                    ...userData,
                    ...doc.data()
                }
    
                db.doc(`users/${user.uid}/private/info`).onSnapshot(docx => {
    
                    userData = {
                        ...userData,
                        ...docx.data()
                    }

                        dispatch({
                            type: IS_AUTHENTICATED,
                            payload : {
                                ...userData
                            }
                        })

                    

                })
            })

        }else {
            dispatch({
                type: IS_AUTHENTICATED,
                payload : {
                    isAuthenticated: false
                }
            })
        }

    })

}



const operations = {
    login,
    register,
    logout,
    authenticate,
    deleteUser,
    reauthenticateUser,
    sendResetPassword,
    changePassword,
    verifyEmail
}


export default operations