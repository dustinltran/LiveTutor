import React from 'react'
import { Link, styles } from 'refire-app'
import LockIcon from 'react-icons/lib/fa/lock'
import CommentsIcon from 'react-icons/lib/fa/comments'
import { fromNow } from '../utils'

const Thread = ({ threadKey, thread, boardId, styles }) => {
  if (!thread) return <div />
  const locked = thread.locked
    ? <LockIcon />
    : <span />

  return (
    <div className={styles.threadContainer} key={threadKey}>
      <Link to={`/board/${boardId}/${threadKey}`} className={styles.title}>
        {thread.title}
      </Link>
                 
            <img src={thread.user.image} className={styles.image} />
        
                  <Link to={`/profile/${thread.user.id}`} title={thread.user.displayName}className={styles.name}>
                  {thread.user.displayName} 
          </Link>

      <div className={styles.lastPost}>
            from {fromNow(thread.lastPostAt)} ago
        </div>


      <div className={styles.metaContainer}>
        <div className={styles.lockedContainer}>
          {locked}
        </div>

        <Link to={`/board/${boardId}/${threadKey}`} className={styles.commentsContainer}>
          <span className={styles.commentsCount}>
            {Object.keys(thread.posts).length - 1} Answers
          </span>
  <CommentsIcon />
        </Link>
      </div>
    </div>
  )
}

const css = {
  threadContainer: {
    position: "relative",
    padding: "15px 0",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    "&:last-child": {
      borderBottom: 0,
    },
  },
  title: {
    margin: "0",
    fontSize: 24,
    paddingRight: "100px",
    fontWeight: 500,
    display: "block",
  },
    name: {
    paddingLeft: "3px",
    margin: "0",
    fontSize: 12,
    fontWeight: 500,
    display: "inline-block",
  },
  image: {
    display: "none",
    "@media (min-width: 480px)": {
      display: "inline-block",
      width: "25px",
      height: "25px",
      borderRadius: "10px",
    },
  },
  lockedContainer: {
    display: "inline-block",
    verticalAlign: "middle",
    margin: "0 5px 0 0",
  },
  profileContainer: {
    display: "inline-block",
    position: "relative",
    verticalAlign: "middle",
  },
  metaContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: "13px 0",
  },
  commentsContainer: {
    display: "inline-block",
    minWidth: "40px",
    textAlign: "right",
    verticalAlign: "middle",
  },
  commentsCount: {
    fontSize: 20,
    display: "inline-block",
    margin: "0 5px 0 0",
  },
  lastPost: {
    paddingLeft: "3px",
    fontSize: 12,
    fontWeight: 500,
    display: "inline-block",
  },
}

export default styles(css, Thread)
