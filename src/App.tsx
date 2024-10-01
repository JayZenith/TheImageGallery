import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import { slides } from './data'

function App() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
    <button onClick={()=>setOpen(true)}>Open Box</button>

    <Lightbox
      slides={slides}
      open={open}
    
    />
    </>
  )
}

export default App
