import { useState } from "react";
import { Button } from "../base";

interface Props {
  tabs: any
}

const Tab = (props:Props) => {

  const {
    tabs
  } = props

  const names = Object.keys(tabs)
  const [currentTab, setCurrentTab] = useState(names[0])

  const changeTab = (name:string) => {
    setCurrentTab(name)
  }

  return (
    <div>
      <div className="w-full flex overflow-y-auto border-b-0.5">
        {names.map((name) => (
          <div className="w-full">
            <Button variant="ghost" onClick={() => changeTab(name)} className={`w-full !py-6 capitalize bg-gray-400/0 hover:bg-gray-400/20`}>
              {name}
            </Button>
            <div className="w-full px-2">
              <div className={`w-full h-1 rounded-full ${currentTab === name ? "bg-primary" : "bg-transparent"}`}></div>
            </div>
          </div>
        ))}
      </div>
      {tabs[currentTab]}
    </div>
  )
}

export default Tab