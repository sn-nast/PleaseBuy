import React, { useState } from 'react'
import { COUNTRY_LIST } from '../pages/constants';

export function SearchBar() {

    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        COUNTRY_LIST.filter((country) => {
            return country.name.match(searchInput);
        });
    }

    return <div>
        <input
            type="search"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput} />
        <table>
            <tr>
                <th>Country</th>
                <th>Continent</th>
            </tr>
            {COUNTRY_LIST.map((country) => {
                <div>
                    <tr>
                        <td>{country.name}</td>
                        <td>{country.continent}</td>
                    </tr>
                </div>
            })}
        </table>
    </div>
};