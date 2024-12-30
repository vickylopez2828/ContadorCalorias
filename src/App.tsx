import {ToastContainer} from "react-toastify"
import { useEffect, useMemo, useRef } from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"
import { useActivityStore } from "./store/store"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  const restartApp = useActivityStore((state)=>state.restartApp)
  const activities = useActivityStore((state)=>state.activities)
  useEffect(() =>{
    localStorage.setItem('activities', JSON.stringify(activities))
  }, [activities])

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities])
  return (
    <>
      <header className=" bg-amber-600 py-3" ref={headerRef}>
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <h1 className='text-center font-black text-sm uppercase text-white md:text-xl'>Contador de Calorías</h1>
          <button 
            className="uppercase text-xs font-bold text-white bg-gray-700 hover:bg-gray-900 p-2 rounded-lg disabled:opacity-10" 
            disabled={isEmptyActivities}
            onClick={() => restartApp()}  
          >
              Reiniciar App
          </button>
        </div>
      </header> 
      <section className="bg-amber-500 py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <Form formRef={formRef}listEndRef={listEndRef}/>
        </div>
      </section>
      <section className="bg-gray-800 py-10">
        {
            !isEmptyActivities &&
              <div className="max-w-2xl mx-auto">
                <CalorieTracker/>
              </div>
        }
      </section>
      <section className="p-10 mx-auto max-w-2xl">
        {
          !isEmptyActivities &&
            <ActivityList 
              listEndRef = {listEndRef} 
              formRef={formRef} 
              headerRef={headerRef}
            />
        }
        
      </section>
        <ToastContainer/>
        
    </>
  )
}

export default App


