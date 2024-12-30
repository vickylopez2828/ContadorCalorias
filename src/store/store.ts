import { create } from 'zustand'
import { Activity } from '../types'

export type ActivityState = {
    activities : Activity[]
    activeId: Activity['id']
    saveActivity: (activity:Activity)=>void
    setActiveId: (id:Activity['id'])=> void
    removeActivity: (id:Activity['id'])=> void
    restartApp: ()=> void
    caloriesConsumed: ()=>number
    caloriesBurned: ()=>number
    netCalories: ()=>number
}
const localStorageActivities = () : Activity[] =>{
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
} 


export const useActivityStore = create<ActivityState>((set, get) => ({
    activities: localStorageActivities(),
    activeId: '',
    caloriesConsumed: () =>
        get().activities.reduce(
            (total, activity) => (activity.category === 1 ? total + activity.calories : total),
            0
        ),
    caloriesBurned: () =>
        get().activities.reduce(
            (total, activity) => (activity.category === 2 ? total + activity.calories : total),
            0
        ),
    netCalories: () => get().caloriesConsumed() - get().caloriesBurned(),
    
    saveActivity: (activity)=>{
        let updatedActivities : Activity[] = []
            if(get().activeId){
                updatedActivities = get().activities.map(item => item.id === get().activeId ? activity : item)
            } else{
                updatedActivities = [...get().activities, activity] 
            }
        set(() =>({
            activities: updatedActivities,
            activeId:''
        }))
        
    },
    setActiveId: (id)=>{
        
        set(() =>({
            activeId: id
        }))
    },
    removeActivity: (id) =>{
        set(() =>({
            activities: get().activities.filter(item => item.id !== id)

        }))
    }, 
    restartApp:()=> {
        set(() =>({
            activities: [],
            activeId:''
        }))
    }, 
}))
