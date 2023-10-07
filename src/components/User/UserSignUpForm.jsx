import { useState } from 'react'
import styles from '../../styles/User.module.css'
import { useDispatch } from 'react-redux' 
import { formState, createUser, changeFormType } from '../../features/user/userSlice'

const UserSignUpForm = () => {
    const dispatch = useDispatch()
    const [values, setValue] = useState({
        name: '',
        email: '',
        password: '',
        avatar: ''
    })

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

        dispatch(createUser(values));
        closeForm()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.close} onClick={closeForm}>
                <svg className='icon' >
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}/>
                </svg>
            </div>
            <div className={styles.title}>
                Sign Up
            </div>

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

                <div className={styles.link} onClick={() => {
                    dispatch(changeFormType('login'))
                }}>I already have an account</div>

                <button type='submit' className={styles.submit}>
                    Create an account
                </button>
            </form>
        </div>
    )
}

export default UserSignUpForm