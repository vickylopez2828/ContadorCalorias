import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"


function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() =>{
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])
  return (
    <>
      <header className=" bg-amber-600 py-3">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <h1 className='text-center font-black text-sm uppercase text-white md:text-xl'>Contador de Calorías</h1>
          <button 
            className="uppercase text-xs font-bold text-white bg-gray-700 hover:bg-gray-900 p-2 rounded-lg disabled:opacity-10" 
            disabled={isEmptyActivities}
            onClick={() => dispatch({type:'restart-app'})}  
          >
              Reiniciar App
          </button>
        </div>
      </header> 
      <section className="bg-amber-500 py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>
      <section className="bg-gray-800 py-10">
        <div className="max-w-2xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-2xl">
        {
          !isEmptyActivities &&
            <ActivityList
              dispatch={dispatch}
              activities={state.activities}
            />
        }
        
      </section>
        
        
    </>
  )
}

export default App


