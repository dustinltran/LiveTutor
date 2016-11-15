const buttonStyles = {
  background: "#000",
  border: "1px solid #333",
  color: "#fff",
  textShadow: "none",
  "&:hover": {
    background: "#333",
    border: "1px solid #555",
    color: "#fff",
  },
}

const linkStyles = {
  color: "#fff",
  "&:hover, &:active, &:focus": {
    color: "#fff",
  },
}

const dialogStyles = {
  container: {
    "& .Modal-content": {
      backgroundColor: "#333",
    },
  },
  modal: {
    background: "#333",
    color: "#999",
  },
}

export default {
  App: {
    App: {
      ":global": {
        body: {
          background: "#000",
        },
      },
    },
    Footer: {
      container: {
        background: "#333",
        color: "#999",
      },
    },
    TopBar: {
      topBarContainer: {
        background: "#000",
      },
      link: linkStyles,
    },
    AuthenticationButton: {
      button: buttonStyles,
    },
    SettingsButton: {
      button: buttonStyles,
    },
    UserSettings: {
      ...dialogStyles,
    },
  },
  Categories: {
    Categories: {
      category: {
        background: "#333",
      },
      header: {
        color: "#999",
      },
    },
    Boards: {
      link: linkStyles,
    },
  },
  Board: {
    Board: {
      container: {
        background: "#333",
      },
      header: {
        color: "#999",
      },
    },
    BoardSettings: {
      ...dialogStyles,
    },
    Thread: {
      title: linkStyles,
      threadContainer: {
        color: "#fff",
      },
    },
    SettingsButton: {
      button: buttonStyles,
    },
    NewThreadButton: {
      button: buttonStyles,
    },
    PostNewThread: {
      container: {
        background: "#333",
      },
      displayName: {
        color: "#fff",
      },
    },
    PreviewFields: {
      topicPreview: {
        color: "#fff",
      },
      textPreview: {
        color: "#fff",
      },
    },
    TextFields: {
      topic: {
        background: "#333",
        color: "#fff",
      },
      text: {
        background: "#333",
        color: "#fff",
      },
    },
  },
  Profile: {
    Profile: {
      container: {
        background: "#333",
        color: "#fff",
      },
      header: {
        color: "#999",
      },
    },
    ThreadsStarted: {
      threadLink: linkStyles,
    },
  },
  Thread: {
    Thread: {
      container: {
        background: "#333",
      },
      header: {
        color: "#999",
      },
      lockContainer: {
        color: "#fff",
      },
    },
    ReplyToThread: {
      container: {
        background: "#333",
      },
      displayName: {
        color: "#fff",
      },
    },
    PreviewFields: {
      textPreview: {
        color: "#fff",
      },
    },
    TextFields: {
      text: {
        background: "#333",
        color: "#fff",
      },
    },
    Post: {
      container: {
        background: "#444",
      },
      bodyContainer: {
        color: "#fff",
      },
      nameContainer: {
        color: "#fff",
      },
      postDate: {
        color: "#fff",
      },
    },
    DeletePostButton: {
      button: {
        color: "#fff",
      },
    },
    ReplyButton: {
      button: {
        color: "#fff",
      },
    },
    QuoteButton: {
      button: {
        color: "#fff",
      },
    },
    DeletePostDialog: {
      ...dialogStyles,
    },
    DeleteDialog: {
      ...dialogStyles,
    },
    LockDialog: {
      ...dialogStyles,
    },
  },
}
