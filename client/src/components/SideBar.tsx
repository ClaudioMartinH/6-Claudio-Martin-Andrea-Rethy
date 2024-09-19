import { LuMoreVertical, LuChevronRight, LuChevronLeft } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { useContext, createContext, useState, ReactNode } from "react";
import { Link } from "react-router-dom";

interface SidebarContextType {
  expanded: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProps {
  children: ReactNode
}
export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true)
  const playerName = sessionStorage.getItem("username");

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-slate-950 border-r border-slate-500 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg text-gray-50 text-xl hover:bg-gray-800"
          >
            {expanded ? <LuChevronLeft /> : <LuChevronRight />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t border-slate-500 flex p-3">
          <FaUser
            className="w-10 h-10 p-1 rounded-md bg-gray-400"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-gray-50">{playerName}</h4>
            </div>
            <Link to={"/profile"} className="text-gray-50 hover:bg-gray-800 p-2 rounded-full">
              <LuMoreVertical size={20}  />
            </Link>
            
          </div>
        </div>
      </nav>
    </aside>
  )
}

interface SidebarItemProps {
  icon: ReactNode
  text: string
  active: boolean
  onClick?: () => void;
}

export function SidebarItem({ icon, text, active, onClick }: SidebarItemProps) {
  const context = useContext(SidebarContext)
  
  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar")
  }

  const { expanded } = context
  
  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-400 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-700 text-gray-300 hover:text-indigo-50"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}