import React from 'react'
import { FirebaseOAuth, FirebaseLogout, styles } from 'refire-app'
import { Button } from 'elemental'

const AuthenticationButton = ({ user, styles }) => {
  if (user) {
    return (
      <FirebaseLogout>
        <Button className={styles.button}>Logout</Button>
      </FirebaseLogout>
    )
  } else {
    return (
      <FirebaseOAuth provider="google" flow="popup">
        <Button className={styles.button}>Login with Google</Button>
      </FirebaseOAuth>
    )
  }
}

const css = {
  button: {

  },
}

export default styles(css, AuthenticationButton)
