import React from 'react'
import { Card, Glyph } from 'elemental'
import { styles } from 'refire-app'
import { version } from '../../package.json'

const Footer = ({ styles }) => (
  <Card className={styles.container}>
    <a href="localhost:4000">
      <Glyph icon='mark-github' /> LiveTutor
    </a>
  </Card>
)

const css = {
  container: {
    textAlign: "center",
  },
}

export default styles(css, Footer)
