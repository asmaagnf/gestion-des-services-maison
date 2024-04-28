import React from 'react';
import { useQuery } from "react-query";
import { getAllServices } from "../utils/api";

const useServices = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        "allServices",
        getAllServices,
        { refetchOnWindowFocus: false }
      );
    
      return {
        data,
        isError,
        isLoading,
        refetch,
      };
    };

export default useServices
