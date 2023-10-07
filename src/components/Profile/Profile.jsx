import { useDispatch, useSelector } from 'react-redux'
import styles from '../../styles/Profile.module.css'
import { useEffect, useState } from 'react'
import { formState, updateUser } from '../../features/user/userSlice'

const Profile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const [values, setValue] = useState({
        name: '',
        email: '',
        password: '',
        avatar: ''
    })

    useEffect(() => {
        setValue(currentUser)
    }, [])

    const handleChange = ({target: {value, name}}) => {
        setValue({...values, [name]: value})
    }


    const closeForm = () => {
        dispatch(formState(false))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isNotEmpty = Object.values(values).every(val => val)

        if(!isNotEmpty  ) return;    

        dispatch(updateUser(values));
        closeForm()
    }
    return (
        <section className={styles.profile}>
            {!currentUser ? <span>You need to login</span> : (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.group}>
                        <input type='email' name='email' placeholder='Your email' value={values.email} autoComplete='off' onChange={handleChange} required/>
                    </div>
                    <div className={styles.group}>
                        <input type='name' name='name' placeholder='Your name' value={values.name} autoComplete='off' onChange={handleChange} required/>
                    </div>
                    <div className={styles.group}>
                        <input type='password' name='password' placeholder='Your password' value={values.password} autoComplete='off' onChange={handleChange} required/>
                    </div>
                    <div className={styles.group}>
                        <input type='avatar' name='avatar' placeholder='Your avatar' value={values.avatar} autoComplete='off' onChange={handleChange} required/>
                    </div>

                    

                    <button type='submit' className={styles.submit}>
                        Save the changes
                    </button>
                </form>
            )}
        </section>
    )
}

export default Profile