import { Textarea } from "@/components/base"

const Home = () => {
  return (
    <div className="h-screen w-full bg-background">
      <div className="border-t-0.5 border-secondary overflow-hidden">
        <Textarea
          variant="ghost"
          placeholder="What is happeneing?!"
          className="placeholder:text-xl max-h-40 overflow-y-scroll"
        />
      </div>  
    </div>
  )
}

export default Home