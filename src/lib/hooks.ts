import { useEffect, useState } from "react"
import { BASE_URL } from "../constants"
import { TJobItemExpanded } from "./types";

export function useJobItems(searchText: string) {
    const [jobItems, setJobItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        const fetchJobItems = async () => {
        setIsLoading(true)
        const URL = searchText ? `${BASE_URL}?search=${searchText}` : BASE_URL
        const response = await fetch(URL);
        
        if (!response.ok) {
            throw new Error('Something went wrong')
        }

        const data = await response.json()

        setIsLoading(false)
        setJobItems(data.jobItems)
        }

        fetchJobItems()
    }, [searchText]);

    const firstSevenJobs = jobItems.slice(0, 7)
    const totalNumberOfJobs = jobItems.length

    return [firstSevenJobs, isLoading, totalNumberOfJobs] as const;

}

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

export function useExpandedJobItem(id: number | null) {
    const [isLoading, setIsLoading] = useState(false);
    const [jobItem, setJobItem] = useState<TJobItemExpanded | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!id) return;

        const getCurentJobContent = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/${id}`);

                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                const data = await response.json();
                setJobItem(data.jobItem);
                setErrorMessage(""); // Clear any previous error
            } catch (error: unknown) {
                // Capture the error message
                const message =
                    error instanceof Error ? error.message : "An unknown error occurred";
                setErrorMessage(message);
            } finally {
                // Ensure loading state is updated
                setIsLoading(false);
            }
        };

        getCurentJobContent();
    }, [id]);

    return [jobItem, isLoading, errorMessage] as const;
}
