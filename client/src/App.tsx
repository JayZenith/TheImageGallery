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
  const [imageUpload, setImageUpload] = useState<boolean>(false)



  
  useEffect(()=>{
    setRender(false);
    var retrievedObject = localStorage.getItem('theKey');
    //console.log(JSON.parse(retrievedObject || '{}'));
    setSlides(JSON.parse(retrievedObject || '{}'))
    console.log(slides)
    setRender(true);
    setImageUpload(false)
  },[showDelete, imageUpload])


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
        <ul> 
          <li><h2><a href="#">Home</a></h2></li>
        </ul>
      </nav>
    </header>
    <div className='addUrl'>
      <form onSubmit={imageSubmit}>
        <p>{errMsg}</p>
        <div className='makeRow'>
          <h2>Upload Image URL:</h2>
          <input className='urlInput' type="text" placeholder="Enter image link" value={theUrl} onChange={(e)=>handleUrl(e)}/>
          <button type="submit" className='submitButton'>Submit</button>
        </div>
      </form>
      
      <SetImage imageUpload={imageUpload} setImageUpload={setImageUpload} slides={slides} />
    </div>
    
    {render ? (
      
    <div className=''>
      <button className='showDeleteButton' onClick={()=>setShowDelete(!showDelete)}>Delete</button>
      <Images passedIt={setShowDelete} passed={showDelete}  data={slides} onClick={(curIdx)=>setIndex(curIdx)} />

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
    </div>) : <></>}

  
    </>
  )
}

export default App


function SetImage(props: any){
  const [file, setFile] = useState<any>('')
  //const { imageState, setImageState } = useContext(ImageContext)
  //const { theImageUpload, setTheImageUpload } = useContext(ImageContext)
  
  let imageUploadRef = useRef<HTMLInputElement>(null);

  const handleImage = (e : any) =>{
      //console.log(e.target.files[0])
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
      .then((resp : any)=>{
        console.log(resp.data.imageName)
        let theArray = props.slides;
        //http://localhost:5174/images/image_1727922139784.png
        theArray.push({src:`http://localhost:5174/images/${resp.data.imageName}`, title:"a title", description: "descr"})
        props.setImageUpload(true)
        localStorage.setItem("theKey", JSON.stringify(theArray));
        /*
          if(res.data.Status==="Image Upload Success"){
              alert("File Upload Succeeded")
              //setImageState(true);
          }else{
              alert("File Upload Failed")
          }
        */
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
              <input className='uploadInput' type="file" name="file"
                  onChange={handleImage}
              ></input>
          <button className='uploadButton' onClick={handleApi}>Submit File</button>
      </div>
  )
}
