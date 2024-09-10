import { MAXPOSTLENGTH, WARNINGPOSTLENGTH } from "@/constants/constants"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"


interface Props {
  postLength: number
}

const PostLengthProgress = (props:Props) => {

  const {
    postLength
  } = props


  return (
    <CircularProgressbar
      value={(postLength / MAXPOSTLENGTH) * 100}
      className={`w-6 ${postLength >= WARNINGPOSTLENGTH && "scale-125 transition-all"}`}
      text={postLength >= WARNINGPOSTLENGTH ? `${MAXPOSTLENGTH - postLength}` : undefined}
      strokeWidth={10}
      styles={buildStyles({
        trailColor: `#4b5563`,
        pathColor: postLength >= MAXPOSTLENGTH + 10 ? "black" : postLength > MAXPOSTLENGTH ? "red" : postLength >= WARNINGPOSTLENGTH ? "yellow" :  "#1DA1F2",
        textSize: "35px",
        textColor: postLength > MAXPOSTLENGTH ? "red" : "yellow"
      })}
    />
  )
}

export default PostLengthProgress