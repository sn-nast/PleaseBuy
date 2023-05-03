import { useState } from "react";
import "./SearchBar.css";
import { COUNTRY_LIST } from '../pages/constants';
import shops from "../data/shops.json";
import shops2 from "../data/shops-detail";

export function SearchBar() {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        // our api to fetch the search result

        console.log("search ", searchTerm);
    };

    return (
        <div className="app">
            <div className="search-container">
                <div className="search-inner">
                    <input type="text" value={value} onChange={onChange} />
                    <button onClick={() => onSearch(value)}> Search </button>
                </div>
                <div className="dropdown">
                    {shops
                        .filter((item) => {
                            const searchTerm = value.toLowerCase();
                            const shopName = item.name.toLowerCase();
                            return (
                                searchTerm &&
                                shopName.startsWith(searchTerm) &&
                                shopName !== searchTerm
                            );
                        })
                        .slice(0, 10)
                        .map((item) => (
                            <div
                                onClick={() => onSearch(item.name)}
                                className="dropdown-row"
                                key={item.name}
                            >
                                {item.name}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}