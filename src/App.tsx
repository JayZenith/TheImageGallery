import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import { slides } from './data'
import 'yet-another-react-lightbox/styles.css'
import { Captions, Download, Fullscreen } from 'yet-another-react-lightbox/plugins'
import Counter from "yet-another-react-lightbox/plugins/counter";
import 'yet-another-react-lightbox/plugins/captions.css'
import "yet-another-react-lightbox/plugins/counter.css";
import Images from './Images'


function App() {
  const [open, setOpen] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(-1)

  return (
    <>
    <header>
      <nav className='navbar'>
        <ul className='navbarList'> 
          <li><h2><a href="#">Home</a></h2></li>
        </ul>
      </nav>
    </header>
    {/*<button onClick={()=>setOpen(true)}>Open Box</button>*/}
    <Images data={slides} onClick={(curIdx)=>setIndex(curIdx)} />

    <div style={{ width: "100%", maxWidth: "900px", aspectRatio: "3 / 2" }}>
      <Lightbox
        plugins={[Captions, Counter, Download, Fullscreen]}
        
        counter ={{ container: {style: { top: "unset", bottom: 0 } }}}
        captions={{
          showToggle: true,
          descriptionTextAlign: 'center'
        }}
        carousel={{ padding: 64 }}
        
        slides={slides}
        //open={open}
        //close={()=>setOpen(false)}
        index={index}
        open={index >= 0}
        close={()=>setIndex(-1)}
      
      />
    </div>
    </>
  )
}

export default App
