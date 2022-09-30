import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate, Link } from 'react-router-dom'


function Profile() {
  const auth = getAuth()
  // setting changeDetails to false means we DONT want to change anything, YET.
  const [ changeDetails, setChangeDetails ] = useState(false)
  const [ formData, setFormData ] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = () => {
    console.log(123)
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className='profile'>
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button 
          type='button' 
          className="logOut"
          onClick={onLogout}
        >
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails" onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input 
              type="text" 
              id="name" 
              value={name}
              className={!changeDetails ? 'profileName' : 'profileNameActive'} 
              disabled={!changeDetails}
              onChange={onChange}
            />
            <input 
              type="text" 
              id="email" 
              value={email}
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
              disabled={!changeDetails}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  ) 
}

export default Profile