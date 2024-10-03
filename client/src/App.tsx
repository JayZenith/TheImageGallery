import { useEffect, useRef, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
//import { slides } from './data'
import 'yet-another-react-lightbox/styles.css'
import { Captions, Download, Fullscreen } from 'yet-another-react-lightbox/plugins'
import Counter from "yet-another-react-lightbox/plugins/counter";
import 'yet-another-react-lightbox/plugins/captions.css'
import "yet-another-react-lightbox/plugins/counter.css";
import Images from './Images'
import axios from 'axios';


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
  },[showDelete])


  const imageSubmit = (e: any) => {
    e.preventDefault();
    const URL_REGEX= /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if(!URL_REGEX.test(theUrl)){
            
      setErrMsg("invalid url")
      return;
  }
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
        <input className='urlInput' type="text" placeholder="Enter image link" value={theUrl} onChange={(e)=>handleUrl(e)}/>
        {/*<p>{theUrlLength}</p>*/}
        <button type="submit" className='submitButton'>Submit</button>
      </form>
      <button className='showDeleteButton' onClick={()=>setShowDelete(!showDelete)}>Show Delete</button>
      <SetImage />
    </div>
    
    {render ? (
    <>
      <Images passedIt={setShowDelete} passed={showDelete} data={slides} onClick={(curIdx)=>setIndex(curIdx)} />

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


function SetImage(){
  const [file, setFile] = useState<any>('')
  //const { imageState, setImageState } = useContext(ImageContext)
  //const { theImageUpload, setTheImageUpload } = useContext(ImageContext)
  
  let imageUploadRef = useRef<HTMLInputElement>(null);

  const handleImage = (e) =>{
      console.log(e.target.files[0])
      setFile(e.target.files[0])
  }

  //http://3.143.203.151:3001/

  const handleApi = () => {
      const formData = new FormData()
      formData.append('image', file)
      //console.log(formData);
      axios.post('http://localhost:5174/upload', formData, {
      //axios.post('http://3.20.232.190:3001/upload', formData, {
      })
      .then((res)=>{
        alert("returned")
          if(res.data.Status==="Image Upload Success"){
              alert("File Upload Succeeded")
              //setImageState(true);
          }else{
              alert("File Upload Failed")
          }
      })
      .catch(err=>console.log(err));
  }

  /*
  useEffect(()=>{ 
      let theImageHandler = (e)=>{
        //console.log(menuRef.current.contains(e.target))
        if(!imageUploadRef.current?.contains(e.target) ){ //? allows it to work in / and /signup
            setTheImageUpload(false);
    
            
        }
      }
      document.addEventListener("mousedown", theImageHandler);
      return()=>{
        document.removeEventListener("mousedown", theImageHandler);
      }
     })
    */

  return(
      <div ref={imageUploadRef} className='uploadWrapper'>
          {/*<div className={EditProfileCSS.exit} onClick={()=>setTheImageUpload(!theImageUpload)}>x</div>*/}
          <div className='upload'>
              
              <input type="file" name="file"
                  onChange={handleImage}
              ></input>
              
          </div>
          <button className='uploadButton' onClick={handleApi}>Submit File</button>
      </div>
  )
}
