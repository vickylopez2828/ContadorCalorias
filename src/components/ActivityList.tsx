import { Activity } from "../types"
import { categories } from "../data/categories"
import { Dispatch, useMemo } from "react"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    dispatch : Dispatch<ActivityActions>
    activities: Activity[]
}


const ActivityList = ({dispatch, activities} : ActivityListProps) => {

    const categoryName =  useMemo(() => (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : ""), [activities])
    return (
      <>
        <h2 className=" text-4xl font-bold text-slate-600 text-center ">Comidas y actividades</h2>
        {
            activities.map(item => (
                <div key={item.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${item.category === 1 ? "bg-amber-500" : "bg-lime-500"} `}>
                            {categoryName(+item.category)}
                        </p>
                        <p className="font-bold capitalize text-xl pt-5">{item.name}</p>
                        <p className="font-black text-amber-500 text-3xl">
                            {item.calories} {''} 
                            <span>Calorías</span>
                        </p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button onClick={() => dispatch({type: 'set-activeId', payload:{id: item.id}})}>
                            <PencilSquareIcon
                                className="h-8 w-8 text-gray-800"                            
                            />
                        </button>
                        <button onClick={() => dispatch({type: 'remove-activity', payload:{id: item.id}})}>
                            <XCircleIcon
                                className="h-8 w-8 text-red-500"                            
                            />
                        </button>
                    </div>
                </div>
            ))
        }
      </>
    )
  }
  
  export default ActivityList
  