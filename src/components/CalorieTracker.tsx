import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps ={
  activities: Activity[]
}
const CalorieTracker = ({activities}: CalorieTrackerProps) => {

  const caloriesConsumed = useMemo(() => activities.reduce((total,activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
  const caloriesBurned = useMemo(() => activities.reduce((total,activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned , [activities])

  return (
    <>
      <h2 className="text-center font-black text-white text-2xl">Resumen Calorías</h2>
      <div className="max-w-2xl flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
          calories={caloriesConsumed}
          text="Consumidas"
        />
         <CalorieDisplay
          calories={caloriesBurned}
          text="Quemadas"
        /> 
        <CalorieDisplay
          calories={netCalories}
          text="Diferencia"
        />     
      </div>
    </>
  )
}

export default CalorieTracker
