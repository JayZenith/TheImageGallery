import { useEffect, useRef, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
//import { slides } from './data'
import 'yet-another-react-lightbox/styles.css'
import { Captions, Download, Fullscreen } from 'yet-another-react-lightbox/plugins'
import Counter from "yet-another-react-lightbox/plugins/counter";
import 'yet-another-react-lightbox/plugins/captions.css'
import "yet-another-react-lightbox/plugins/counter.css";
import Images from './Images'


function App() {
  const [open, setOpen] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(-1)
  const [theUrl, setTheUrl] = useState<string>("")
  const [render, setRender] = useState<boolean>(false)
  const [slides, setSlides] = useState<any>([])
  const [theUrlLength, setTheUrlLength] = useState<number>(0)
  const [errMsg, setErrMsg] = useState<string>("")
  const [showDelete, setShowDelete] = useState<boolean>(false)


  
  useEffect(()=>{
    setRender(false);
    var retrievedObject = localStorage.getItem('theKey');
    //console.log(JSON.parse(retrievedObject || '{}'));
    setSlides(JSON.parse(retrievedObject || '{}'))
    console.log(slides)
    setRender(true);
  },[])


  const imageSubmit = (e: any) => {
    e.preventDefault();
    if(theUrlLength === 0){
      setErrMsg('Cant leave empty')
      return;
    }
    let theArray = slides;
    theArray.push({src:theUrl, title:"a title", description: "descr"})
  
    localStorage.setItem("theKey", JSON.stringify(theArray));
    setTheUrl('')
    setRender(true);
  }

  const handleUrl = (e: any) => {
    setErrMsg('')
    setTheUrl(e.target.value);
    setTheUrlLength(e.target.value.length)
  }

  return (
    <>
    <header>
      <nav className='navbar'>
        <ul className='navbarList'> 
          <li><h2><a href="#">Home</a></h2></li>
        </ul>
      </nav>
    </header>
    <div className='addUrl'>
      <form onSubmit={imageSubmit}>
        <p>{errMsg}</p>
        <input type="text" placeholder="" value={theUrl} onChange={(e)=>handleUrl(e)}/>
        <p>{theUrlLength}</p>
        <button type="submit" className='submitButton'>Submit</button>
      </form>
      <button className='showDeleteButton' onClick={()=>setShowDelete(!showDelete)}>Show</button>
    </div>
    
    {render ? (
    <>
      <Images passed={showDelete} data={slides} onClick={(curIdx)=>setIndex(curIdx)} />

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
    </>) : <></>}

  
    </>
  )
}

export default App
