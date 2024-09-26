import React, { useState, useEffect } from 'react';
import './admin.css';
import { Chart } from 'react-charts';
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
        }, 
        body: JSON.stringify({
          fechaInicio,  
          fechaFin     
        }),
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
        const salesData = await fetchData('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales');
        const productsData = await fetchData('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales/products');
        const clientsData = await fetchData('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales/clients');
        const dailySalesData = await fetchData('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales/daily');
        const totalSalesData = await fetchData('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales/sum');

        setSales(salesData);
        setProducts(productsData);
        setClients(clientsData);
        setDailySales(dailySalesData);
        setTotalSales(totalSalesData);
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
          <p className='loading'>Cargando Analítca...</p>
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
          <p className='loading'>Error Cargando Analitica</p>
        </div>
      </div>
    );
  }

  // Preparing data for charts
  const dailySalesChartData = useMemo(() => {
    return dailySales.map(sale => ({
      primary: new Date(sale.fecha).toLocaleDateString(), // Format the date
      secondary: sale.total_ventas,
    }));
  }, [dailySales]);

  const productsChartData = useMemo(() => {
    return products.map(product => ({
      primary: product.nombre,
      secondary: parseFloat(product.avg), // Convert average to float
    }));
  }, [products]);

  return (
    <div className="container">
      <div className="text">Analítica</div>
      
      <h2>Ventas Diarias</h2>
      <div style={{ width: '100%', height: '300px' }}>
        <Chart
          data={[
            {
              label: 'Total Ventas',
              data: dailySalesChartData,
            },
          ]}
          axes={[
            { primary: true, type: 'ordinal', position: 'bottom' },
            { primary: false, type: 'linear', position: 'left' },
          ]}
        />
      </div>

      <h2>Productos Vendidos</h2>
      <div style={{ width: '100%', height: '300px' }}>
        <Chart
          data={[
            {
              label: 'Promedio de Ventas por Producto',
              data: productsChartData,
            },
          ]}
          axes={[
            { primary: true, type: 'ordinal', position: 'bottom' },
            { primary: false, type: 'linear', position: 'left' },
          ]}
        />
      </div>

      <h2>Total Ventas</h2>
      <p>Total: {totalSales}</p>
    </div>
  );
};

export default AnaliticaPage;
