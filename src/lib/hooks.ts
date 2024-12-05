import { useContext, useEffect, useState } from "react"
import { BASE_URL } from "../constants"
import { TJobItem, TJobItemExpanded } from "./types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarkIdsContext } from "../contexts/BookmarkIdsContextProvider";


type JobItemApiResponse = {
  public: boolean;
  jobItem: TJobItemExpanded
};

const fetchJobItemById = async (id:number): Promise<JobItemApiResponse> => {
    const response = await fetch(`${BASE_URL}/${id}`)
    //4xx or 5xx
    if (!response) {
        const errorData = await response.json()
        throw new Error(errorData.description)
    }

    const data = await response.json()
    return data;
}

export function useExpandedJobItem(id: number | null) {
    const { data, isInitialLoading } = useQuery(
        ['job-item', id],
        ()=> (id? fetchJobItemById(id): null),
        {
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: Boolean(id),
            onError: handleError
        }
    )
    return {
        jobItem: data?.jobItem,
        isLoading: isInitialLoading,
    } as const;
}


type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: TJobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
    const URL = searchText ? `${BASE_URL}?search=${searchText}` : BASE_URL
    const response = await fetch(URL);  // 4xx or 5xx
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};


export function useJobItemsBySearch(searchText: string) {
    const { data, isInitialLoading } = useQuery(
        ['job-items', searchText],
        ()=> fetchJobItems(searchText),
        {
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: true,
            onError: handleError
        }
    )
    return {
        jobItems: data?.jobItems,
        isLoading: isInitialLoading
    } as const;
}

// should take an array of ids, fetch and return all the corresponding jobitems of type TJobItem
export function useJobItemsByIds(ids: number[]) {
    const result = useQueries({
        queries: ids.map(id => ({
            queryKey: ['job-item', id],
            queryFn: ()=> fetchJobItemById(id),
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: Boolean(id),
            onError: handleError,
    }))})

    console.log(result.isLoading)
}
// --------------------------------------------------

export function useActiveID() {
    const [activeID, setActiveID] = useState<number | null>(null)

    useEffect(() => {
        const handleHashChange = () => {
        const id = +window.location.hash.slice(1);
        setActiveID(id);
        };
        handleHashChange();

        window.addEventListener("hashchange", handleHashChange);

        return () => {
        window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);
    
    return activeID
}

// export function useExpandedJobItem(id: number | null) {
//     const [isLoading, setIsLoading] = useState(false);
//     const [jobItem, setJobItem] = useState<TJobItemExpanded | null>(null);
//     const [errorMessage, setErrorMessage] = useState("");

//     useEffect(() => {
//         if (!id) return;

//         const getCurentJobContent = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await fetch(`${BASE_URL}/${id}`);

//                 if (!response.ok) {
//                     throw new Error("Something went wrong");
//                 }

//                 const data = await response.json();
//                 setJobItem(data.jobItem);
//                 setErrorMessage(""); // Clear any previous error
//             } catch (error: unknown) {
//                 // Capture the error message
//                 const message =
//                     error instanceof Error ? error.message : "An unknown error occurred";
//                 setErrorMessage(message);
//             } finally {
//                 // Ensure loading state is updated
//                 setIsLoading(false);
//             }
//         };

//         getCurentJobContent();
//     }, [id]);

//     return [jobItem, isLoading, errorMessage] as const;
// }


export function useDebounce(value, delay?: number) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(()=>{
        const timerID = setTimeout(()=> setDebounceValue(value), delay || 500); 
        
        return () => clearTimeout(timerID);
    }, [value, delay])

    return debounceValue;
}


export const useBookmarkIdsContext = () => {
    const context = useContext(BookmarkIdsContext)

    if (!context) {
        throw new Error("useBookmarkIdContext must be used within 'BookmarkIdsContextProvider'")
    }
    return context
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState(()=> JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue)))

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as const;
}