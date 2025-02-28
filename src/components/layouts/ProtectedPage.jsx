import React, { useState, useEffect } from 'react'
import CUser from './../../utils/helpers/CUser';
import axios from 'axios'
import { Redirect } from 'react-router';
import URL from './../../utils/helpers/URL';

export default function ProtectedPage({ children }) {
    const [authv, setAuthV] = useState(undefined)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const ckLog = async () => {
            try {
                const ck = await axios.get('ao/is-loggedin')
                //give true or false
                if (!ck.data) {
                    //so clear the localStorage
                    CUser.logOut()
                    setAuthV(false)
                } else {
                    if (CUser.getCurrentuser() && CUser.getCurrentuser() !== undefined) {
                        setAuthV(true)
                    } else {
                        CUser.logOut()
                        setAuthV(false)
                    }
                    // if (CUser.getCurrentuser() === undefined) {

                    // } else {

                    // }

                }
                setLoading(false)

            } catch (e) {
                //so clear the localStorage
                CUser.logOut()
                console.log(e.message);
                setAuthV(false)
                setLoading(false)
            }
        }
        ckLog()
    }, [loading])


    if (!loading && loading === false) {
        if (authv === true) {
            return (
                <>
                    {children}
                </>
            )
        } else {
            return <Redirect to={URL.SIGN_IN}></Redirect>
        }
    } else {
        return (<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="loader"></div>
        </div>)
    }
}
