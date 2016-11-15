import React from 'react'
import { styles } from 'refire-app'
import ReplyIcon from 'react-icons/lib/fa/mail-reply'

const ReplyButton = ({ user, locked, onClick, styles }) => {
  if (user && !locked) {
    return (
      <span onClick={onClick} title="Reply">
        <span className={styles.button}>
          <ReplyIcon size="20px" />
        </span>
      </span>
    )
  } else {
    return <span />
  }
}

const css = {
  button: {
    cursor: "pointer",
    color: "#555",
    display: "inline-block",
    verticalAlign: "top",
  },
}

export default styles(css, ReplyButton)
