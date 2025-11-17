import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { teal } from "@mui/material/colors";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { price } from "../../../data/Filter/price";
import { discount } from "../../../data/Filter/discount";

const FilterSection = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateFilterParams = (e:any) => {
        const {value,name} = e.target;
        if(value){
            searchParams.set(name, value);
        }else{
            searchParams.delete(name);
        }
        setSearchParams(searchParams);
    };
    const clearAllFilters = () => {
        console.log("clearAllFilters", searchParams)
        searchParams.forEach((value:any,key: any) => {
            searchParams.delete(key);
        });
        setSearchParams(searchParams);
    }
    return (
        <div className="-z-50 space-y-5 bg-white">
            <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
                <p className="text-lg font-semibold">
                    Filters
                </p>
                <Button onClick={clearAllFilters} size="small" className="text-teal-600 cursor-pointer font-semibold">
                    Clear All
                </Button>
            </div>
            <Divider/>
            <div className="px-9 space-y-6">
                
            <section>
                <FormControl>
                    <FormLabel sx={{
                        fontSize:"16px",
                        fontWeight:"bold",
                        pb:"14px",
                        color:teal[600],
                    }}
                    className="text-2xl font-semibold" id="price">
                        Price
                    </FormLabel>
                    <RadioGroup name="price" onChange={updateFilterParams} aria-labelledby="price" defaultValue="">
                        {price.map((item,index) => (
                            <FormControlLabel key={item.name} value={item.value} control={<Radio size="small"/>} label={item.name}/>

                        ))}
                    </RadioGroup>

                </FormControl>
            </section>
            <Divider/>
            <section>
                <FormControl>
                    <FormLabel sx={{
                        fontSize:"16px", fontWeight:"bold", pb:"14px", color: teal[600],
                    }}
                    className="text-2xl font-semibold"
                    id="brand"
                    >
                        Discount
                    </FormLabel>
                    <RadioGroup name="discount" onChange={updateFilterParams} aria-labelledby="brand" defaultValue="">
                        {discount.map((item,index) => (
                            <FormControlLabel key={item.name} value={item.value} control={<Radio size="small"/>} label={item.name}/>

                        ))}
                    </RadioGroup>
                </FormControl>
            </section>
            </div>
        </div>
    )
}
export default FilterSection