'use client'

import React, { ChangeEvent, useEffect, useState } from 'react';
import inputStyles from '../Input.module.scss';
import selectStyles from './CitySelect.module.scss';
import { CityResponse } from '@/ts/CityResponseType';
import { useLazyGetCitiesQuery } from '@/lib/redux/api/cityApi';
import { Input } from '../Input';

interface CitySelectProps {
    cities?: CityResponse[];
    onChange: (e: ChangeEvent) => any;
    placeholder?: string;
    id?: string;
    defaultValue?: string;
}

const CitySelect: React.FC<CitySelectProps> = ({ cities: citiesProps = [], onChange: onChangeHandler, placeholder, id, defaultValue }) => {

    const [searchTerm, setSearchTerm] = useState(defaultValue || '');
    const [isOpen, setIsOpen] = useState(false);
    const [getCities, { data = { data: [] }, isLoading, isError }] = useLazyGetCitiesQuery();

    const cities = [
        ...citiesProps,
        ...data.data
    ];

    const filteredCities = cities.filter(({ city }) => {
        const cityLowerCase = city.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return cityLowerCase.includes(searchTermLowerCase) && cityLowerCase !== searchTermLowerCase;
    });

    const handleSelect = (city: string) => {
        onChangeHandler({ target: { value: city } } as ChangeEvent<HTMLInputElement>);
        setSearchTerm(city);
    };

    useEffect(() => {
        searchTerm && getCities(searchTerm);
        setIsOpen(false);
    }, [searchTerm]);

    useEffect(() => {
        if (filteredCities.length > 0) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [filteredCities]);

    return (
        <div className={inputStyles.inputBlock}>
            <div className={selectStyles.customSelect} onClick={() => setIsOpen(!isOpen)}>
                <Input
                    type="text"
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e: any) => setSearchTerm(e.target.value)}
                    defaultValue={defaultValue}
                />
            </div>
            {isOpen && searchTerm.length > 0 && (
                <div className={selectStyles.selectDropdown}>
                    {filteredCities.map((city, index) => (
                        <div key={`${index}_${city.city}`} className={selectStyles.option} onClick={() => handleSelect(city.city)}>
                            {city.city}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CitySelect;
