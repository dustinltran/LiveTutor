import React from 'react'
import { Link, styles } from 'refire-app'
import { Row, Col, Card } from 'elemental'
import ReactMarkdown from 'react-markdown'
import { fromNow } from '../utils'
import CodeBlock from '../App/CodeBlock'

import DeletePostButton from './DeletePostButton'
import QuoteButton from './QuoteButton'
import ReplyButton from './ReplyButton'

const Post = ({
  postKey,
  post,
  user,
  locked,
  isAdmin,
  deletePost,
  updateQuote,
  styles,
  theme,
}) => {

  if (!post) {
    return (
      <Row>
        <Col
          xs="0%"
          sm="1/8"
          lg="1/12"
        >
          <div className={styles.profileContainer}></div>
        </Col>
        <Col
          xs="100%"
          sm="7/8"
          lg="11/12"
        >
          <Card className={styles.container}>
            <div className={styles.naContainer}>
              Not available
            </div>
          </Card>
        </Col>
      </Row>
    )
  }

  return (
    <Row>
      <Col
        xs="0%"
        sm="1/8"
        lg="1/12"
      >
        <div className={styles.profileContainer}>
          <Link to={`/profile/${post.user.id}`}>
            <img src={post.user.image} className={styles.image} />
          </Link>
        </div>
      </Col>
      <Col
        xs="100%"
        sm="7/8"
        lg="11/12"
      >
        <Card className={styles.container}>
          <div className={styles.bodyContainer}>
            <ReactMarkdown
              className={styles.markdown}
              escapeHtml={true}
              source={post.body}
              renderers={
                {
                  ...ReactMarkdown.renderers,
                  ...{ CodeBlock },
                }
              }
            />
          </div>
          <div className={styles.bottomToolbar}>
            <div className={styles.mobileProfileContainer}>
              <Link to={`/profile/${post.user.id}`}>
                <img
                  src={post.user.image}
                  className={styles.mobileImage}
                />
              </Link>
            </div>
            <strong className={styles.nameContainer}>
              {post.user.displayName}
            </strong>

            <div className={styles.actionsContainer}>
              <div className={styles.postDate}>
                {fromNow(post.createdAt)}
              </div>
              <DeletePostButton
                user={user}
                isAdmin={isAdmin}
                onClick={() => deletePost(postKey, post)}
                styles={theme.DeletePostButton}
              />
              <QuoteButton
                user={user}
                locked={locked}
                onClick={() => updateQuote(post.body, postKey)}
                styles={theme.QuoteButton}
              />
              <ReplyButton
                user={user}
                locked={locked}
                onClick={() => updateQuote("", postKey)}
                styles={theme.ReplyButton}
              />
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

const css = {
  container: {},
  image: {
    display: "none",
    "@media (min-width: 480px)": {
      display: "inline-block",
      width: "40px",
      height: "40px",
      borderRadius: "20px",
      marginTop: "10px",
    },
  },
  mobileImage: {
    display: "inline-block",
    width: "30px",
    height: "30px",
    borderRadius: "15px",
    marginRight: "10px",
    "@media (min-width: 480px)": {
      display: "none",
    },
  },
  profileContainer: {
    position: "relative",
    textAlign: "center",
  },
  mobileProfileContainer: {
    position: "relative",
    textAlign: "left",
    display: "inline-block",
    marginTop: "10px",
    "@media (min-width: 480px)": {
      display: "none",
    },
  },
  bodyContainer: {
    margin: "0 0 10px 0",
  },
  naContainer: {
    color: "#ddd",
  },
  bottomToolbar: {
    position: "relative",
  },
  nameContainer: {
    display: "inline-block",
    verticalAlign: "middle",
    "@media (min-width: 480px)": {
      display: "block",
    },
  },
  actionsContainer: {
    display: "block",
    paddingTop: "10px",
    "@media (min-width: 480px)": {
      paddingTop: 0,
      position: "absolute",
      right: 0,
      top: 0,
    },
  },
  postDate: {
    display: "inline-block",
    verticalAlign: "top",
    paddingRight: "20px",
  },
  markdown: {
    "& > p": {
      margin: "10px 0 20px 0",
    },
  },
}

export default styles(css, Post)
