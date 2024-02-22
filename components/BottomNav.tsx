import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material"
import ArchiveIcon from '@mui/icons-material/Archive'

const BottomNav = () => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={null}
        onChange={(_, newValue) => {
          console.log(newValue)
        }}
        showLabels={true}
        style={{ backgroundColor: '#ed6c02' }}
        sx={{ height: 56 }}
      >
        <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
      </BottomNavigation>
    </Paper>
  )
}


export default BottomNav
