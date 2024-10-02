import { FC } from "react"; 

interface ImagesProps{
    data:{
        src: string;
        title: string;
        description: string;
    }[];
    onClick: (idx: number) => void;
    passed: boolean
}


const Images: FC<ImagesProps> = (props) => {
  const { data, onClick } = props;

  const handleClickImage = (idx:number) => {
    onClick(idx)
  }

  const deletePic = (idx : number) => {
    console.log(idx)
    var retrievedObject = localStorage.getItem('theKey');
    let arr = JSON.parse(retrievedObject || '{}')
    console.log(arr)
    
    arr.splice(idx, 1); 
    console.log(arr)
    localStorage.setItem("theKey", JSON.stringify(arr));
  }

  return (
    <div className="images-container">
        {data.map((slide, index ) => (
            <div>
            {props.passed ? (<span className="abs" onClick={()=>deletePic(index)}>X</span> ) : <></>}
            <div onClick={()=>handleClickImage(index)} key={index} className="image">
                <img src={slide.src} alt={slide.description} />
            </div>
            </div>

        ))}
    </div>
  )
}

export default Images