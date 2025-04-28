import Conversatoins from "./Conversatoins"
import LogoutBtn from "./LogoutBtn"
import SearchInput from "./SearchInput"

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
        <SearchInput/>
        <div className="divider px-3"></div>
        <Conversatoins/>
        <LogoutBtn/>
    </div>
  )
}

export default Sidebar