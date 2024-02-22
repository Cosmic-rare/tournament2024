import BottomNav from '@/components/BottomNav';
import TopBar from '@/components/TopBar';
import React, { useEffect, useState } from 'react';

const resize = () => {
  const height = window.innerHeight
  const width = window.innerWidth
  document.documentElement.style.setProperty('--100vh', `${height}px`)
  document.documentElement.style.setProperty('--100vw', `${width}px`)
  return { height: height, width: width }
}

const App = () => {
  const [innerSize, setInnerSize] = useState({ height: 0, width: 0 })
  const handleResize = () => {
    setInnerSize(resize())
  } 
  useEffect(() => { handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
  }, [])

  if (innerSize.width <= 700) {
    return (
      <div>
        <TopBar innerWidth={innerSize.width} />
        <div style={{ paddingBottom: 56 }}>
          {[...Array(100)].map((_, i) =>
            <p key={i} style={{ margin: 0, padding: 10 }}>content</p>
          )}
        </div>
        <BottomNav />
      </div>
    )
  } else {
    return (
      <div style={{ height: 'var(--100vh)', width: 'var(--100vw)', display: 'flex' }}>
        <div style={{ height: '100%', width: 300, overflowX: 'hidden' }}>
          {[...Array(40)].map((_, i) =>
            <p key={i} style={{ margin: 0, padding: 10 }}>sidebar</p>
          )}
        </div>
        <div style={{ height: '100%', width: '100%', overflowX: 'hidden' }}>
          <TopBar innerWidth={innerSize.width} />
          {[...Array(100)].map((_, i) =>
            <p key={i} style={{ margin: 0, padding: 10 }}>content</p>
          )}
        </div>
      </div>
    )
  }

};

export default App;
