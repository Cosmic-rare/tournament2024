import { useState, useEffect } from "react"
import { APIget } from "@/util/api"
import { Card, Checkbox } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import getClass from "@/util/cl"
import Head from "next/head"
import { places } from "./schedule/[targetGrade]/[targetClass]"

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const Index = () => {
  const [match1, setMatch1] = useState([])
  const [match2, setMatch2] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await APIget(`match/now`, () => { }, () => { })
      setMatch1(res)
    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      let res = await APIget(`match/soon`, () => { }, () => { })
      res.sort((a: any, b: any) => a.data[`p_${a.game}`].scheduledAt - b.data[`p_${b.game}`].scheduledAt)
      setMatch2(res)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Head>
        <title>スポーツ大会2024公式</title>
      </Head>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>スポーツ大会2024</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          {/* <h3>開催まで{Math.ceil((new Date(2024, 6, 16).valueOf() - Date.now()) / 1000 / 60 / 60 / 24)}日</h3> */}
          <h3>晴雨日程Bで開催済</h3>
          <p>おつかれさまでした!!</p>
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <ul style={{ paddingLeft: 20 }}>
            <li>
              生徒会では機械,プログラミング,オーディオ機材を弄れる79期生を募集しています
            </li>
            <li>
            アプリやデータの<a href="https://docs.google.com/forms/d/e/1FAIpQLSe8LzNwL_zPftBPcKGbGB_F70-q4U-B4k1sbI0RZqFvwhCpSw/viewform?usp=sf_link">不具合を報告</a>
            </li>
          </ul>
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h3>開催中の競技</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 0 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">種目</TableCell>
                  <TableCell align="center">学年</TableCell>
                  <TableCell align="center">対戦クラス</TableCell>
                  <TableCell align="center">場所</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {match1.map((m: any) => (
                  <TableRow
                    key={m.id}
                  >
                    <TableCell align="center">
                      {m.data.title}
                    </TableCell>
                    <TableCell align="center">
                      {m.data.gread}
                    </TableCell>
                    <TableCell align="center">
                      {getClass(m.data, m.data.event)[m.game - 1][0]}, {getClass(m.data, m.data.event)[m.game - 1][1]}
                    </TableCell>
                    <TableCell align="center">
                      {/* @ts-ignore */}
                      {m.data[`p_${m.game}`].place ? places[m.data[`p_${m.game}`].place] : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h3>開催が近い競技</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 0 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">種目</TableCell>
                  <TableCell align="center">学年</TableCell>
                  <TableCell align="center">対戦クラス</TableCell>
                  <TableCell align="center">開始時刻</TableCell>
                  <TableCell align="center">場所</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {match2.map((m: any) => (
                  <TableRow
                    key={m.id}
                  >
                    <TableCell align="center">
                      {m.data.title}
                    </TableCell>
                    <TableCell align="center">
                      {m.data.gread}
                    </TableCell>
                    <TableCell align="center">
                      {
                        getClass(m.data, m.data.event)[m.game - 1][0] && getClass(m.data, m.data.event)[m.game - 1][1] ?
                          `${getClass(m.data, m.data.event)[m.game - 1][0]}, ${getClass(m.data, m.data.event)[m.game - 1][1]}`
                          : "-"
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        m.data[`p_${m.game}`].scheduledAt ?
                          new Date(m.data[`p_${m.game}`].scheduledAt).toLocaleString('en-us', { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })
                          : "-"
                      }
                    </TableCell>
                    <TableCell align="center">
                      {/* @ts-ignore */}
                      {m.data[`p_${m.game}`].place ? places[m.data[`p_${m.game}`].place] : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </div>
  )
}

export default Index