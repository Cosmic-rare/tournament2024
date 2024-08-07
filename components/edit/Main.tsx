import React, { useState } from "react"
import _ from "lodash"
import { Modal } from "antd"
import { Button } from "@mui/material"
import PointEditModal from "@/components/edit/pointEditModal"
import ClassEditModal from "@/components/edit/classEditModa"
import { gameType } from "@/util/type"
import { APIget, APIpost } from "@/util/api"
import { useTokenStore } from "@/util/store"
import EditTournament from "@/components/edit/Tournament"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/router"
import PointModal from "@/components/top/pointModal"

const Main = ({ data, eAPI }: any) => {
  const [isModalOpen1, setIsModalOpen1] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClassEditModalOpen, setIsClassEditModalOpen] = useState(false)
  const [isPointModalOpen, setIsPointModalOpen] = useState(false)
  const [editPoint, setEditPoint] = useState(0)
  const [pointPos, setPointPos] = useState<null | number>(null)
  const [editClassPosition, setEditClassPosition] = useState(0)
  const [editClass, setEditClass] = useState(0)
  const [d, sD] = useState<any>(data)
  const [isLoading, setIsLoading] = useState(false)
  const [editGame, setEditGame] = useState<gameType | {}>({})
  const token = useTokenStore((s) => s.token)
  const updateToken = useTokenStore((s) => s.setToken)
  const router = useRouter()

  const showModal = () => {
    setIsModalOpen1(true)
  }

  const handleCancel = () => {
    setIsModalOpen1(false)
  }

  const handleOnOpenModal = (p: number) => {
    try {
      // @ts-ignore
      switch (jwtDecode(token).roleType) {
        case "ADMIN":
          setEditPoint(p)
          setEditGame(d[`p_${p}`])
          setIsModalOpen(true)
          break
        case "USER":
          router.push(`/record/${d.id}/${p}`)
          break
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onClassEditModalOpen = (p: number, d: number) => {
    setEditClassPosition(p)
    setEditClass(d)
    setIsClassEditModalOpen(true)
  }

  const onUpdate2 = async (p: number, c: number) => {
    setIsLoading(true)

    await APIpost(
      "edit/2",
      { targetPosition: p, insertNumber: c, id: d.id, token: token },
      () => eAPI("Faild to update"),
      async () => {
        const res = await APIget(
          `get/match/${data.id}`,
          () => eAPI("Faild to get new data"),
          () => { }
        )
        sD(res)
        setIsLoading(false)
        setIsClassEditModalOpen(false)
      },
      () => { updateToken("") }
    )
  }

  // validation実装せなあかんなぁ....
  const onUpdate = async (game: gameType, p: number, isReset: boolean) => {
    let roleType
    try {
      // @ts-ignore
      roleType = jwtDecode(token).roleType
    } catch (e) { console.log(e) }

    setIsLoading(true)

    await APIpost(
      "edit/3",
      { d: game, id: d.id, p: p, token: token },
      () => eAPI("Faild to update"),
      async () => {
        const res = await APIget(
          `get/match/${data.id}`,
          () => eAPI("Faild to get new data"),
          () => { }
        )
        sD(res)
        setIsLoading(false)
        setIsModalOpen(false)
      },
      () => { updateToken("") }
    )
  }

  return (
    <>
      {
        d ? <>
          <PointEditModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isLoading={isLoading}
            onUpdate={onUpdate}
            editPoint={editPoint}
            // @ts-ignore
            game={editGame}
            setGame={setEditGame}
            event={d.event}
            p={editPoint}
            title={d.title}
          />
          <ClassEditModal
            isModalOpen={isClassEditModalOpen}
            setIsModalOpen={setIsClassEditModalOpen}
            isLoading={isLoading}
            onUpdate={onUpdate2}
            editPoint={editClassPosition}
            gread={d.gread}
            defaultClass={editClass}
          />
          <PointModal 
        isModalOpen={isPointModalOpen}
        setIsModalOpen={setIsPointModalOpen} 
        data={data[`p_${pointPos}`]}
        event={data.event}
      />
        </> : null
      }
      <div style={{ width: "100%", maxWidth: "50%", paddingLeft: 4, paddingRight: 4 }}>
        <Button variant="contained" onClick={showModal} sx={{ width: "100%", height: 54, borderRadius: "50rem" }} style={{ textTransform: "none", backgroundColor: data.sex === "male" ? "#448aff" : data.sex === "female" ? "#ff5252" : "#8BC34A" }}>
          {/* {d.sex === "male" ? "男" : d.sex === "female" ? "女" : ""} */}
          {d.title}
        </Button>
        <Modal
          // title={`${d.sex === "male" ? "男" : d.sex === "female" ? "女" : ""}${d.title} (${d.gread}年)`}
          title={`${d.title} (${d.gread}年)`}
          open={isModalOpen1}
          onCancel={handleCancel}
          width={30 * 15 + 24 * 2}
          footer={[]}
        >
          <div style={{ height: `320px`, overflowX: "scroll", position: "relative" }}>
            <div style={{ width: `${30 * 15}px`, height: `320px`, overflowY: "hidden", position: "relative" }}>
              <EditTournament data={d} onModalOpen={handleOnOpenModal} onClassEditModalOpen={onClassEditModalOpen} token={token} openModal={(p: number) => { setIsPointModalOpen(true); setPointPos(p) }} />
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Main