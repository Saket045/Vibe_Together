import LeftComponent from "../../components/eventPageComponents/LeftComponent"
import MiddleComponent from "../../components/eventPageComponents/MiddleComponent"
import RightComponent from "../../components/eventPageComponents/RightComponent"

const Event = () => {
  return (
    <div className="flex">
      <LeftComponent/>
      <MiddleComponent/>
      <RightComponent/>
    </div>
  )
}

export default Event
