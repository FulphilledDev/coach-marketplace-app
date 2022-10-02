import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import OAuth from '../components/OAuth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
  const [ showPassword, setShowPassword ] = useState(false)
  const [ formData, setFormData ] = useState({ 
    name: '',
    email: '', 
    password: ''
  })
  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      // get auth value from getAuth
      const auth = getAuth()

      // then register the user with 'createUser....' that returns a promise we are putting into userCredential
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // grab user info from userCredential (need this for db)
      const user = userCredential.user

      // updating displayName
      updateProfile(auth.currentUser, {
        displayName: name
      })

      // (add this after registering user functionality) create new function to NOT change formData State
      const formDataCopy = { ...formData}
      // --> (and this) to keep the password from getting submitted to the database (removing it from the object formData)
      delete formDataCopy.password
      // --> (and this) add timestamp property to copy of formData (upon submission)
      formDataCopy.timestamp = serverTimestamp()
      // --> (yes, this too) setting a doc in DB under users with user variable (line 38), with ALL form data
      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      // then redirect to home page
      navigate('/')
    } catch (error) {
      toast.error('Whoops! Something Went Wrong.')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Welcome Back!
          </p>
        </header>

        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            className="nameInput" 
            placeholder="Name" 
            // REMEMBER: id value MUST be same as the state (the value value --> value={name})
            id="name" 
            value={name} 
            onChange={onChange} 
          />
          <input 
            type="email" 
            className="emailInput" 
            placeholder="Email" 
            id="email" 
            value={email} 
            onChange={onChange} 
          />

          <div className="passwordInputDiv">
            <input 
              type={showPassword ? 'text' : 'password'} 
              className='passwordInput' 
              placeholder='Password' 
              id='password' 
              value={password} 
              onChange={onChange} 
            />

            <img 
              src={visibilityIcon} 
              alt="show password" 
              className="showPassword" 
              onClick={() =>
                setShowPassword((prevState) => !prevState)
              }
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password?
          </Link>

          <div className="signUpBar">
            <p className="signUpText">
              Sign Up
            </p>
            <button className="signUpButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <OAuth />

        <Link 
          to='/sign-in'
          className='registerLink'>
            Sign In Instead
        </Link>

      </div>
    </>
  )
}

export default SignUp