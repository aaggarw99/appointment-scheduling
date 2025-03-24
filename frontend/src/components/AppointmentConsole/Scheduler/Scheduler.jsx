import { useState, useEffect } from 'react';
import "./Scheduler.css";
import { findAppointmentSlots } from '../../../services/api';
import SlotsContainer from "./SlotsContainer/SlotsContainer";
import Spinner from "../../Spinner/Spinner";

const Scheduler = () => {
    const [searchFilters, setSearchFilters] = useState({
        date: (new Date()).toISOString(),
        providerName: "",
        facilityName: "",
        address: "",
        specialty: "",
        spokenLanguages: "",
        providerGender: "",
    });

    const [searchResults, setSearchResults] = useState({});

    const [searchString, setSearchString] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [noSlotsFound, setNoSlotsFound] = useState(false);

    const handleFindAppointmentSlots = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // async call
        try {
            const data = await findAppointmentSlots(searchFilters);
            setNoSlotsFound(data.length === 0);
            console.log("Search results:", data);
            setSearchResults(data);
        } catch (err) {
            setError('Failed to fetch results. Please try again.');
            console.error('Search error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const resultsContent = isLoading ? (
        <Spinner/>
    ) : noSlotsFound ? (
        <div class="search__no-results-found ">No Slots Found</div>
    ) : (
        <SlotsContainer/>
    )

    return (
        <div className="scheduler">
            <div className="searchFilters">
                <form onSubmit={handleFindAppointmentSlots}>
                    <input
                        type="text"
                        value={searchFilters.providerName}
                        onChange={(e) => setSearchFilters({...searchFilters, providerName: e.target.value})}
                        placeholder="Provider Name"
                        className="search__input"
                    />
                    <input
                        type="text"
                        value={searchFilters.facilityName}
                        onChange={(e) => setSearchFilters({...searchFilters, facilityName: e.target.value})}
                        placeholder="Facility Name"
                        className="search__input"
                    />
                    <input
                        type="text"
                        value={searchFilters.address}
                        onChange={(e) => setSearchFilters({...searchFilters, address: e.target.value})}
                        placeholder="Address"
                        className="search__input"
                    />
                    <input
                        type="text"
                        value={searchFilters.specialty}
                        onChange={(e) => setSearchFilters({...searchFilters, specialty: e.target.value})}
                        placeholder="Specialty"
                        className="search__input"
                    />
                    <input
                        type="text"
                        value={searchFilters.spokenLanguages}
                        onChange={(e) => setSearchFilters({...searchFilters, spokenLanguages: e.target.value})}
                        placeholder="Languages Spoken"
                        className="search__input"
                    />
                    <input
                        type="text"
                        value={searchFilters.providerGender}
                        onChange={(e) => setSearchFilters({...searchFilters, providerGender: e.target.value})}
                        placeholder="Provider Gender"
                        className="search__input"
                    />
                    <button 
                        type="submit" 
                        className="search__button"
                        disabled={isLoading}
                    >
                        Search
                    </button>
                </form>
            </div>
            <div className="searchResults">
                {resultsContent}
            </div>
        </div>
    );
};

export default Scheduler;