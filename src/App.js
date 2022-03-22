import React from "react"
import FileUpload from "./FileUpload";
import styled from 'styled-components'

function App() {
  return (
    <Container>
      <FileUpload/>
    </Container>
  )
}

const Container = styled.div `
    max-width: 1170px;
    margin: 0 auto;
    padding: 5em 0;
`

export default App;
