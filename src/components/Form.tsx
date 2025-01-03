import { useState, ChangeEvent, FormEvent, useEffect} from "react"
import { v4 as uuidv4} from "uuid"
import { toast } from 'react-toastify'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { useActivityStore } from "../store/store"

type FormProps =  {
    formRef: React.RefObject<HTMLDivElement>;
    listEndRef: React.RefObject<HTMLDivElement>;
  }

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name:'',
    calories: 0
}

const Form: React.FC<FormProps>  = ({ formRef, listEndRef }) => {
    const [activity, setActivity] = useState<Activity>(initialState)
    const  saveActivity = useActivityStore(state => state.saveActivity)
    const activities = useActivityStore(state => state.activities)
    const activeId = useActivityStore(state => state.activeId)

    useEffect(() =>{
        console.log(activeId)
        if(activeId){
            const selectedActivity =  activities.filter(item => item.id === activeId)[0]    
            setActivity(selectedActivity)
        }
       
    }, [activeId])
   
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>{
        const isNumberField = ['category', 'calories'].includes(e.target.id);
        
        setActivity({
            ...activity,
            [e.target.id] : isNumberField ?  +e.target.value : e.target.value
        })
      
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        saveActivity(activity)
        toast.success("Actividad agregada correctamente",{
            autoClose:1500,
            position: "bottom-right"
        })
        setActivity(
            {
                ...initialState,
                id: uuidv4()
            }
        )
        setTimeout(() => {
            listEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 0);
    }
    const isValid = () =>{
        const {name, calories} = activity
        return name.trim() !== '' && calories > 0
    }
 
  return (
    <>
        <div ref={formRef}>
            <form  onSubmit={handleSubmit} className="space-y-5 p-10 bg-white rounded-lg shadow">
                <div className="grid grid-cols-1 gap-3 ">
                    <label className="font-bold" htmlFor="category">Categoría:</label>
                    <select 
                        className="h-full pr-7 border border-slate-300 p-2 rounded-lg bg-white" 
                        id="category"
                        value={activity.category}
                        onChange={handleChange}
                    >
                        {
                            categories.map(item => (
                                <option
                                    value={item.id} key={item.id}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="grid grid-cols-1 gap-3 ">
                    <label className="font-bold" htmlFor="name">Actividad:</label>
                    <input 
                        className="border border-slate-300 p-2 rounded-lg" 
                        type="text" 
                        id="name" 
                        value={activity.name}
                        placeholder="Ej. Comida, Jugo de Naranja, Ejercicio, Pesas"
                        onChange={handleChange} 
                    />
                </div>
                <div className="grid grid-cols-1 gap-3 ">
                    <label className="font-bold" htmlFor="calories">Calorías:</label>
                    <input 
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
                        type="number" 
                        min={0}
                        id="calories"
                        value={activity.calories}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
                        className="w-full disabled:opacity-10 bg-gray-700 hover:bg-gray-900  p-2 text-white uppercase text-xs font-bold cursor-pointer"
                        disabled={!isValid()}
                    />
                </div>
            </form>
        </div>
        
    </>
  )
}

export default Form
