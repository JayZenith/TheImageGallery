import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import { slides } from './data'
import 'yet-another-react-lightbox/styles.css'
import { Captions } from 'yet-another-react-lightbox/plugins'
import 'yet-another-react-lightbox/plugins/captions.css'


function App() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
    <button onClick={()=>setOpen(true)}>Open Box</button>

    <Lightbox
      plugins={[Captions]}
      slides={slides}
      open={open}
      close={()=>setOpen(false)}
    
    />
    </>
  )
}

export default App
