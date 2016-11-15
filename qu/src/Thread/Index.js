import React, { Component } from 'react'
import { FirebaseWrite, bindings, routeActions } from 'refire-app'

import drop from 'lodash/array/drop'
import take from 'lodash/array/take'
import find from 'lodash/collection/find'

import { isUserAdmin } from '../utils'
import { deleteThread, toggleThreadLocked, deletePost } from '../updates'

import Thread from './Thread'

class Index extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      currentPage: 1,
      quote: null,
      postKey: null,
      deleteDialogVisible: false,
      lockDialogVisible: false,
      deletePostDialogVisible: false,
      deletePostKey: null,
    }
    // TODO: use some autobind plugin
    this.handlePageSelect = this.handlePageSelect.bind(this)
    this.updateQuote = this.updateQuote.bind(this)
    this.selectLastPage = this.selectLastPage.bind(this)
    this.deleteThread = this.deleteThread.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.toggleLocked = this.toggleLocked.bind(this)
    this.showDeleteDialog = this.showDeleteDialog.bind(this)
    this.hideDeleteDialog = this.hideDeleteDialog.bind(this)
    this.showLockDialog = this.showLockDialog.bind(this)
    this.hideLockDialog = this.hideLockDialog.bind(this)
    this.showDeletePostDialog = this.showDeletePostDialog.bind(this)
    this.hideDeletePostDialog = this.hideDeletePostDialog.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handlePageSelect(page) {
    window.scrollTo(0, 0)
    this.setState({ currentPage: page })
  }

  selectLastPage() {
    const { value: posts = [] } = this.props.threadPosts || {}
    const { value: settings = {} } = this.props.settings || {}
    const { THREAD_PAGE_SIZE } = settings
    const remainder = (posts.length + 1) % THREAD_PAGE_SIZE
    const pages = Math.floor((posts.length + 1) / THREAD_PAGE_SIZE)
    const lastPage = remainder === 0 ? pages : pages + 1
    this.handlePageSelect(lastPage)
  }

  updateQuote(quote, postKey) {
    this.setState({ quote, postKey })
  }

  hideDeleteDialog() {
    this.setState({ deleteDialogVisible: false })
  }

  showDeleteDialog() {
    this.setState({ deleteDialogVisible: true })
  }

  hideLockDialog() {
    this.setState({ lockDialogVisible: false })
  }

  showLockDialog() {
    this.setState({ lockDialogVisible: true })
  }

  showDeletePostDialog(postKey) {
    this.setState({
      deletePostDialogVisible: true,
      deletePostKey: postKey,
    })
  }

  hideDeletePostDialog() {
    this.setState({
      deletePostDialogVisible: false,
      deletePostKey: null,
    })
  }

  deleteThread() {
    const { submit, dispatch } = this.props
    const { key: threadKey, value: thread } = this.props.thread || {}
    submit(deleteThread({ threadKey, thread }))
    dispatch(routeActions.push(`/board/${thread.boardId}`))
  }

  deletePost() {
    const { value: posts = [] } = this.props.threadPosts || {}
    const post = find(posts, (threadPost) => {
      return threadPost.key === this.state.deletePostKey
    })
    this.props.submit(deletePost({ postKey: this.state.deletePostKey, post: post.value }))
    this.hideDeletePostDialog()
  }

  toggleLocked() {
    const { submit } = this.props
    const { key: threadKey, value: thread = {} } = this.props.thread || {}
    submit(toggleThreadLocked({ threadKey, thread }))
    this.hideLockDialog()
  }

  render() {
    const { key: threadKey, value: thread = {} } = this.props.thread || {}
    const { value: posts = [] } = this.props.threadPosts || {}
    const { value: settings = {} } = this.props.settings || {}
    const { authenticatedUser: user, theme } = this.props
    const { THREAD_PAGE_SIZE } = settings
    const isAdmin = isUserAdmin(this.props.adminUsers, this.props.authenticatedUser)
    const pagedPosts = take(drop(posts, (this.state.currentPage - 1) * THREAD_PAGE_SIZE), THREAD_PAGE_SIZE)
    // TODO: this is fugly, figure out something better
    const stateSetters = {
      hideDeleteDialog: this.hideDeleteDialog,
      deleteThread: this.deleteThread,
      hideLockDialog: this.hideLockDialog,
      toggleLocked: this.toggleLocked,
      hideDeletePostDialog: this.hideDeletePostDialog,
      deletePost: this.deletePost,
      handlePageSelect: this.handlePageSelect,
      showDeleteDialog: this.showDeleteDialog,
      showLockDialog: this.showLockDialog,
      showDeletePostDialog: this.showDeletePostDialog,
      updateQuote: this.updateQuote,
      selectLastPage: this.selectLastPage,
    }

    return (
      <Thread
        threadKey={threadKey}
        thread={thread}
        posts={posts}
        settings={settings}
        user={user}
        isAdmin={isAdmin}
        pagedPosts={pagedPosts}
        state={this.state}
        stateSetters={stateSetters}
        styles={theme.Thread.Thread}
        theme={theme.Thread}
      />
    )
  }
}

export default FirebaseWrite({ method: "update" })(
    bindings(
      ["thread", "threadPosts", "adminUsers", "settings"],
      ["authenticatedUser"]
    )(Index)
)
