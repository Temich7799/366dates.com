import { CityResponse } from "@/ts/CityResponseType";

export default function getUniqueCities(data: CityResponse[]) {
    return data.filter((city, index) => {
        return data.findIndex(obj => obj.city === city.city) === index;
    });
}