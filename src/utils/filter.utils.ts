import { Fuel, Prisma } from "@prisma/client";
import { TFilterRequest } from "../interfaces/cars.inferfaces";


const fuelTypeMapping: Record<string, Fuel> = {
    ETANOL: "ETANOL",
    FLEX: "FLEX",
    HIBRIDO: "HIBRIDO",
    ELETRICO: "ELETRICO",
  };
  

const filterParams = (params: TFilterRequest) => {
    const {
        brand,
        model,
        year,
        fueltype,
        color,
        minkm,
        maxkm,
        minprice,
        maxprice,
        
      } = params;

      let url = `${process.env.BASE_URL_BACK}/filters`;
      console.log(url);
    
      let brandFilter: Prisma.StringFilter | undefined = undefined;
      if (brand) {
        brandFilter = { equals: brand };
        url += url[url.length - 1] == "s" ? "?" : "&";
        url += `brand=${brand}`;
      }
    
      let modelFilter: Prisma.StringFilter | undefined = undefined;
      if (model) {
        modelFilter = { contains: model };
        url += url[url.length - 1] == "s" ? "?" : "&";
        url += `model=${model}`;
      }
    
      let yearFilter: Prisma.StringFilter | undefined = undefined;
      if (year) {
        yearFilter = { equals: year };
        url += url[url.length - 1] == "s" ? "?" : "&";
        url += `year=${year}`;
      }
    
      const mappedFuelType = fueltype
        ? fuelTypeMapping[fueltype.toUpperCase()]
        : undefined;
    
      let fuelFilter: Prisma.EnumFuelFilter | undefined = undefined;
      if (mappedFuelType) {
        fuelFilter = { equals: mappedFuelType };
        url += url[url.length - 1] == "s" ? "?" : "&";
        url += `fueltype=${mappedFuelType}`;
      }
    
      let colorFilter: Prisma.StringFilter | undefined = undefined;
      if (color) {
        colorFilter = { equals: color };
        url += url[url.length - 1] == "s" ? "?" : "&";
        url += `color=${color}`;
      }
    
      let minMileageFilter: Prisma.IntFilter | undefined = undefined;
      if (minkm) {
        minMileageFilter = Number(minkm) >= 0 ? { gte: Number(minkm) } : undefined;
        url += url[url.length - 1] == "s" ? "?" : "&";
        url += `minkm=${minkm}`;
      }
    
      let maxMileageFilter: Prisma.IntFilter | undefined = undefined;
      if (maxkm) {
        maxMileageFilter =
          Number(maxkm) <= Infinity ? { lte: Number(maxkm) } : undefined;
        url += url[url.length - 1] == "s" ? "?" : "&";
        url += `maxkm=${maxkm}`;
      }
    
      let minPriceFilter: Prisma.FloatFilter | undefined = undefined;
      if (minprice) {
        minPriceFilter =
          Number(minprice) >= 0 ? { gte: Number(minprice) } : undefined;
        url += url[url.length - 1] == "s" ? "?" : "&";
        url += `minprice=${minprice}`;
      }
    
      let maxPriceFilter: Prisma.FloatFilter | undefined = undefined;
      if (maxprice) {
        maxPriceFilter =
          Number(maxprice) <= Infinity ? { lte: Number(maxprice) } : undefined;
        url += url[url.length - 1] == "s" ? "?" : "&";
        url += `maxprice=${maxprice}`;
      }
    
      const searchParams: Prisma.CarsWhereInput = {
        brand: { ...brandFilter, mode: "insensitive" },
        model: { ...modelFilter, mode: "insensitive" },
        year: { ...yearFilter },
        fuelType: { ...fuelFilter },
        color: { ...colorFilter, mode: "insensitive" },
        mileage: {
          ...minMileageFilter,
          ...maxMileageFilter,
        },
        price: {
          ...minPriceFilter,
          ...maxPriceFilter,
        },
      };

      return {
        url,
        searchParams
      }
}


export default filterParams;