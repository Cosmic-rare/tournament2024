import { Card } from "@mui/material"
import Head from "next/head"
import { useState, useEffect } from "react"

const resize = () => {
  const height = window.innerHeight
  const width = window.innerWidth
  return { height: height, width: width }
}

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const Documents = () => {
  const [innerSize, setInnerSize] = useState({ height: 0, width: 0 })
  const handleResize = () => {
    setInnerSize(resize())
  }
  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleResize)
  }, [])

  return (
    <div>
      <Head>
        <title>ルール：マリオカート 8DX</title>
      </Head>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>ルール：マリオカート 8DX</h2>
      </div>

      <div style={{ height: "100%" }}>
      <iframe src="https://drive.google.com/file/d/17EKIX3Mmg7_rO6E7ELh07NtGXTffixCA/preview" width="100%" style={{ height: `${innerSize.height - 160}px` }} allow="autoplay"></iframe>
      </div>
    </div>
  )
}

export default Documents