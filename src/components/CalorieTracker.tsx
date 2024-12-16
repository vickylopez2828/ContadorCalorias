import CalorieDisplay from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"


const CalorieTracker = () => {
  
  const { caloriesConsumed, caloriesBurned, netCalories } = useActivity();

  
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
