import React, { useState, useEffect, useMemo } from 'react';
import './admin.css';
import { BiError } from "react-icons/bi";
import { CircularProgress } from '@mui/material';

const AnaliticaPage = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fechaInicio = '2023-12-03';
  const fechaFin = '2024-09-26';

  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === 'success') {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const salesData = await fetchData(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
        const productsData = await fetchData(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales/products?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
        const clientsData = await fetchData(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales/clients?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
        const dailySalesData = await fetchData(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales/daily?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
        const totalSalesData = await fetchData(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales/sum?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);

        setSales(salesData || []);
        setProducts(productsData || []);
        setClients(clientsData || []);
        setDailySales(dailySalesData || []);
        setTotalSales(totalSalesData || 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);


  if (isLoading) {
    return (
      <div className="container">
        <div className="text">Analítica</div>
        <div className='loadingcontainer'>
          <CircularProgress />
          <p className='loading'>Cargando Analítica...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="text">Analítica</div>
        <div className='error-container'>
          <BiError color='black' size={80}/>
          <p className='loading'>Error Cargando Analítica</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="text">Analítica</div>

      <h2>Ventas Diarias</h2>

      <h2>Productos Vendidos</h2>

      <h2>Total Ventas</h2>
      <p>Total: {totalSales}</p>
    </div>
  );
};

export default AnaliticaPage;
