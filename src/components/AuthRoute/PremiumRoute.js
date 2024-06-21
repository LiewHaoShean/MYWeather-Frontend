import React from 'react';
import HomePage from '../homepage/homepage';
import ErrorMsg from '../global/erroMsg';
import Package from '../subscription/package';


//limit the access of a role
const PremiumRoute = ({children}) => {
    //get user from localStorage
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const isPremium = user?.userFound?.idPremium ? true : false;

    if(!isPremium) {
        return <>
            <Package></Package>
            <ErrorMsg message={'Access Denied. Premium User Only!'}></ErrorMsg>
        </>;
    }
    return <>{children}</>;
}

export default PremiumRoute;