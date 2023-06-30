import { ListItemButton, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { notification } from 'antd';
import axios from 'axios';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { useSession, signOut, getSession } from "next-auth/react"
import { useEffect, useState } from 'react';

const drawerWidth = 260

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "primary.lighter",
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const SideBarItem = ({ drawerOpen, id, gread, title, setPage, onClose, sex }: { drawerOpen: boolean, id: string, gread: number, title: string, setPage: Function, onClose: () => void, sex: string }) => {
  const isSelected = false
  const level = 1
  const theme = useTheme()
  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main'

  return (
    <ListItemButton
      onClick={() => {setPage(id); onClose()}}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen && {
          '&:hover': {
            bgcolor: 'primary.lighter'
          },
          '&.Mui-selected': {
            bgcolor: 'primary.lighter',
            borderRight: `2px solid ${theme.palette.primary.main}`,
            color: iconSelectedColor,
            '&:hover': {
              color: iconSelectedColor,
              bgcolor: 'primary.lighter'
            }
          }
        }),
        ...(!drawerOpen && {
          '&:hover': {
            bgcolor: 'transparent'
          },
          '&.Mui-selected': {
            '&:hover': {
              bgcolor: 'transparent'
            },
            bgcolor: 'transparent'
          }
        })
      }}
    >
      <ListItemText
        primary={
          <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
            {sex === "male" ? "男" : sex === "female" ? "女" : ""}{title + " (" + gread + "年)"}
          </Typography>
        }
      />

    </ListItemButton>
  )
};

interface dataType {
  data1: Array<any>
  data2: Array<any>
  data3: Array<any>
}

const SideBar = ({ drawerOpen, page, setPage, onClose }: { drawerOpen: boolean, page: null | string, setPage: Function, onClose: () => void }) => {
  const { data: session } = useSession()
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState<dataType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/get`);
        setData(res.data)
        
      } catch (err) {
        api.error({ message: 'Failed to get new data', description: 'だめですごめんなさい', duration: 10, placement: "bottomRight" });
      }
    };

    fetchData()
  }, []);
  
  if (!data) {
    return <></>
  }

  return (
    <>
      {contextHolder}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>1年</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data.data1.map((val, index) => {
            return (
              <SideBarItem setPage={setPage} sex={val.sex} drawerOpen={drawerOpen} id={val.id} gread={val.gread} title={val.title} key={index} onClose={onClose} />
            )
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>2年</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {data.data2.map((val, index) => {
            return (
              <SideBarItem setPage={setPage} sex={val.sex} drawerOpen={drawerOpen} id={val.id} gread={val.gread} title={val.title} key={index} onClose={onClose} />
            )
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>3年</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {data.data3.map((val, index) => {
            return (
              <SideBarItem setPage={setPage} sex={val.sex} drawerOpen={drawerOpen} id={val.id} gread={val.gread} title={val.title} key={index} onClose={onClose} />
            )
          })}
        </AccordionDetails>
      </Accordion>
      {session ? 
      <><p style={{fontSize: 8}}>{JSON.stringify(session)}</p>
      <button onClick={() => signOut()}>Sign out</button>
      </>
      : null }
    </>
  )
}

export default SideBar;
