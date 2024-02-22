import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  IconButton,
} from "@mui/material"
import AccountCircle from '@mui/icons-material/AccountCircle'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

interface TopBarProps {
  innerHeight?: number
  innerWidth: number
}

const TopBar = (props: TopBarProps) => {
  return (
    <Box sx={{ position: 'sticky', top: 0, left: 0, right: 0, flexGrow: 1 }}>
      <AppBar position="static" color='warning'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            style={{position: 'absolute', height: 48, width: 48, top: 4, left: 4, margin: 0}}
          >
            {props.innerWidth <= 700 ? <AccountCircle /> : <ArrowBackIosNewIcon />}
          </IconButton>
          <Typography variant="h6" component="div" align='center' flexGrow={1}>
            tournament2024 
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar
