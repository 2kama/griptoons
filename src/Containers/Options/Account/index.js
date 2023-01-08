import React, { Fragment } from 'react'

//pages
import ChangePassword from './ChangePassword';
import ChangeUsername from './ChangeUsername';
import DeleteAccount from './DeleteAccount';
import BankAccount from './BankAccount'

//third party components





const Account = ({ user }) => {


    return(
        <Fragment>

            <ChangeUsername currentUsername={user.username} uid={user.uid} />

            <ChangePassword userEmail={user.email} />

            {user.role === "creator" && <BankAccount user={user} />}

            <DeleteAccount userEmail={user.email} uid={user.uid} />

        </Fragment>
    )
}




export default Account