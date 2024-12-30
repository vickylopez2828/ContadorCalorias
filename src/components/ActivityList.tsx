import { Activity } from "../types"
import { categories } from "../data/categories"
import { useEffect, useMemo, useState } from "react"
import { PencilSquareIcon, XCircleIcon, ChevronUpIcon  } from "@heroicons/react/24/outline"
import { useActivityStore } from "../store/store"
import { toast } from 'react-toastify'
type ActivityListProps = {
    listEndRef: React.RefObject<HTMLDivElement>;
    formRef: React.RefObject<HTMLDivElement>;
    headerRef: React.RefObject<HTMLDivElement>;
  }


const ActivityList: React.FC<ActivityListProps> = ({ listEndRef, formRef, headerRef }) => {

    const setActiveId = useActivityStore((state)=>state.setActiveId)
    const removeActivity =  useActivityStore((state)=> state.removeActivity)
    const activities = useActivityStore((state)=>state.activities)
    const categoryName =  useMemo(() => (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : ""), [activities])
    const [showButton, setShowButton] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {  // Mostrar el botón si el scroll está más abajo de 300px
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleRemove = (id:string) => {
        removeActivity(id);
        toast.error("Actividad eliminada correctamente",{
                    autoClose:1500,
                    position: "bottom-right"
        })
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);
    };
      
    const handleEdit = (id:string) => {
        setActiveId(id);
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);
      };
      const handleScrollToTop = () => {
        headerRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
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
                        <button onClick={() => handleEdit(item.id)}>
                            <PencilSquareIcon
                                className="h-8 w-8 text-gray-800"                            
                            />
                        </button>
                        <button onClick={() => handleRemove(item.id)}>
                            <XCircleIcon
                                className="h-8 w-8 text-red-500"                            
                            />
                        </button>
                    </div>
                </div>
            ))
        }
        <div ref={listEndRef} />
        {showButton && (
            <button
                onClick={handleScrollToTop}
                className="fixed bottom-5 right-5 p-3 rounded-full bg-blue-500 text-white hover:bg-blue-700 transition"
                aria-label="Ir arriba"
            >
                <ChevronUpIcon className="h-6 w-6" />
            </button>
        )}
      </>
    )
  }
  
  export default ActivityList
  