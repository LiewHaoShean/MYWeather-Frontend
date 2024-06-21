import React from 'react';
import HomePage from '../homepage/homepage';
import ErrorMsg from '../global/erroMsg';


//limit the access of a role
const AdminRoute = ({children}) => {
    //get user from localStorage
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const isAdmin = user?.userFound?.isAdmin ? true : false;

    if(!isAdmin) {
        return <>
            <HomePage></HomePage>;
            <ErrorMsg message={'Access Denied. Admin Only!'}></ErrorMsg>
        </>;
    }
    return <>{children}</>;
}

export default AdminRoute;