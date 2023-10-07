import { useDispatch, useSelector } from "react-redux"
import UserSignUpForm from "./UserSignUpForm"
import UserLogInForm from './UserLogInForm'
import styles from '../../styles/User.module.css'
import { formState } from "../../features/user/userSlice"
import { useEffect } from "react"

const UserForm = () => {
    const dispatch = useDispatch()
    const {showForm, formType} = useSelector(state => state.user)
    
    const handleClick = () => {
        dispatch(formState(false))
    }

    useEffect(() => {}, [formType])

    const form = (formType === 'signup') ? <UserSignUpForm/> : <UserLogInForm/>

    return showForm ? (
        <>
            <div className={styles.overlay} onClick={handleClick}></div>
            {showForm ? form : null}
        </>
    ) : null
}

export default UserForm