import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [javascript, setJavascript] = useLocalStorage('javascript', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${javascript}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeOut)
  }, [html, javascript, css])

  return (
    <>
      <div className="pane top-pane">
        <Editor 
          language="xml" 
          displayName="HTML" 
          value={html} 
          onChange={setHtml}
        />
        <Editor 
          language="css" 
          displayName="CSS" 
          value={css} 
          onChange={setCss}
        />
        <Editor 
          language="javascript" 
          displayName="JS" 
          value={javascript} 
          onChange={setJavascript}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          className="iframe"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;
