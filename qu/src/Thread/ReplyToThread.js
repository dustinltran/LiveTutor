import React, { Component } from 'react'
import { Button, Card, Form } from 'elemental'
import { FirebaseWrite, styles } from 'refire-app'
import PlusIcon from 'react-icons/lib/fa/plus'
import { replaceEmojis, quote } from '../utils'
import { replyToThread } from '../updates'

import PreviewButton from '../App/PreviewButton'
import PreviewFields from './PreviewFields'
import TextFields from './TextFields'

class ReplyToThread extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      text: "",
      previewEnabled: false,
    }
    this.submit = this.submit.bind(this)
    this.updateField = this.updateField.bind(this)
    this.togglePreview = this.togglePreview.bind(this)
    this.textInputRef = this.textInputRef.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quote !== this.props.quote) {
      this.setState({
        text: quote(replaceEmojis(`${nextProps.quote}`)),
      }, () => {
        if (this.textInput) {
          this.textInput.scrollTop = this.textInput.scrollHeight
          this.textInput.focus()
        }
      })
    }
  }

  submit(event) {
    event.preventDefault()
    const { user, threadKey, selectLastPage, submit, postKey: replyToId } = this.props

    const update = replyToThread({
      threadKey,
      text: this.state.text,
      replyToId,
      user,
    })

    submit(update)
    selectLastPage()
    this.setState({ text: "" })
  }

  updateField(field) {
    return (event) => {
      event.preventDefault()
      this.setState({ [field]: replaceEmojis(event.target.value) })
    }
  }

  togglePreview() {
    this.setState({ previewEnabled: !this.state.previewEnabled })
  }

  textInputRef(input) {
    this.textInput = input
  }

  render() {
    const { user, locked, styles, theme } = this.props
    const submitEnabled = !!this.state.text
    if (!user || locked) return <div />
    return (
      <Card className={styles.container}>
        <div className={styles.userProfile}>
          <img
            className={styles.profileImage}
            src={user.profileImageURL}
          />
          <strong className={styles.displayName}>
            {user.displayName}
          </strong>
        </div>
        <Form>
          <TextFields
            preview={this.state.previewEnabled}
            text={this.state.text}
            updateText={this.updateField("text")}
            inputRef={this.textInputRef}
            styles={theme.TextFields}
          />
          <PreviewFields
            preview={this.state.previewEnabled}
            text={this.state.text}
            styles={theme.PreviewFields}
          />
          <Button
            disabled={!submitEnabled}
            type="success"
            onClick={this.submit}
          >
            <PlusIcon className={styles.plusIcon} /> Reply to thread
          </Button>
          <PreviewButton
            enabled={this.state.previewEnabled}
            togglePreview={this.togglePreview}
          />
        </Form>
      </Card>
    )
  }
}

const css = {
  container: {},
  displayName: {},
  userProfile: {
    margin: "0 0 10px 0",
  },
  profileImage: {
    borderRadius: "20px",
    height: "40px",
    width: "40px",
    margin: "0 10px 0 0",
  },
  plusIcon: {
    marginRight: "10px",
  },
}

export default styles(
  css,
  FirebaseWrite({ method: "update" })(ReplyToThread)
)
