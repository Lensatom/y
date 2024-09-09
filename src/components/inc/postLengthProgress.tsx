import { buildStyles, CircularProgressbar } from "react-circular-progressbar"


interface Props {
  postLength: number
}

const PostLengthProgress = (props:Props) => {

  const maxPostLength = 280
  const warningPostLength = 260

  const {
    postLength
  } = props


  return (
    <CircularProgressbar
      value={(postLength / maxPostLength) * 100}
      className={`w-6 ${postLength >= warningPostLength && "scale-125 transition-all"}`}
      text={postLength >= warningPostLength ? `${maxPostLength - postLength}` : undefined}
      strokeWidth={10}
      styles={buildStyles({
        trailColor: `#4b5563`,
        pathColor: postLength >= maxPostLength + 10 ? "black" : postLength > maxPostLength ? "red" : postLength >= warningPostLength ? "yellow" :  "#1DA1F2",
        textSize: "35px",
        textColor: postLength > maxPostLength ? "red" : "yellow"
      })}
    />
  )
}

export default PostLengthProgress