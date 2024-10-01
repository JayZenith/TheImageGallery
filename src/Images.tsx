import { FC } from "react"; 

interface ImagesProps{
    data:{
        src: string;
        title: string;
        description: string;
    }[];
    onClick: (idx: number) => void;
}

const Images: FC<ImagesProps> = (props) => {
  const { data, onClick } = props;

  const handleClickImage = (idx:number) => {
    onClick(idx)
  }

  return (
    <div className="images-container">
        {data.map((slide, index ) => (
            <div onClick={()=>handleClickImage(index)} key={index} className="image">
                <img src={slide.src} alt={slide.description} />
            </div>

        ))}
    </div>
  )
}

export default Images