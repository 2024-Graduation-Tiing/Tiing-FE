import Filter from './Filter'
import Profiles from './Profiles'
import ScrollBtn from './ScrollBtn'

//
//
//

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Profiles />
      <ScrollBtn />
    </div>
  )
}
