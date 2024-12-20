import React, { useState, useEffect, useMemo } from 'react';
import './admin.css';
import { BiError } from "react-icons/bi";
import { CircularProgress } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { TbMoodSad2 } from "react-icons/tb";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Decimation,
} from 'chart.js';
import { GiConsoleController } from 'react-icons/gi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnaliticaPage = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [noSalesMessage, setNoSalesMessage] = useState('');
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const formatDate = (date) => {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); 
    let day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setFechaFin(formatDate(today));
    setFechaInicio(formatDate(oneMonthAgo));
  }, []);

  const fetchData = async (endpoint) => {
    try {
      // Obtener el token de localStorage
      const token = localStorage.getItem('token');
  
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',  // Incluir el token si existe
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
    if (fechaInicio && fechaFin) {
      const fetchAllData = async () => {
        setIsLoading(true);
        try {
          const salesData = await fetchData(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
          const productsData = await fetchData(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales/products?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
          const clientsData = await fetchData(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales/clients?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
          const dailySalesData = await fetchData(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales/daily?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
          const totalSalesData = await fetchData(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/sales/sum?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);

          if (
            (salesData && salesData === "No sales found.") &&
            (productsData && productsData === "No sales found.") &&
            (clientsData && clientsData === "No data found.") &&
            (dailySalesData && dailySalesData === "No sales found.") &&
            (totalSalesData === null) 
          ) {
            setNoSalesMessage(`No hubo ventas entre ${fechaInicio} y ${fechaFin}`);
          } else {
            setNoSalesMessage("");
            setSales(salesData || []);
            setProducts(productsData || []);
            setClients(clientsData || []);
            setDailySales(dailySalesData || []);
            setTotalSales(totalSalesData || 0);
          }
        } catch (error) {
          setError(error.message);
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAllData();
    }
  }, [fechaInicio, fechaFin]);


// Create daily sales chart data only if there are daily sales
const dailySalesChartData = Array.isArray(dailySales) && dailySales.length > 0 ? {
  labels: dailySales.map(sale => sale.fecha.slice(0, 10)), // Ensure this is safe
  datasets: [{
    label: 'Ventas Diarias',
    data: dailySales.map(sale => sale.total_ventas), // Ensure this is safe
    borderColor: 'rgba(0, 102, 140, 1)',
    backgroundColor: 'rgba(0, 102, 140, 0.8)',
    fill: false,
  }]
} : { labels: [], datasets: [] }; // Default to empty arrays

const optionsDailySales = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return `Q. ${value}`;
        }
      }
    }
  }
};

// Create product chart data only if there are products
const productsChartData = Array.isArray(products) && products.length > 0 ? {
  labels: products.map(product => product.nombre), // Ensure this is safe
  datasets: [{
    label: 'Productos Vendidos',
    data: products.map(product => product.avg), // Ensure this is safe
    backgroundColor: 'rgba(0, 102, 140, 0.8)',
  }]
} : { labels: [], datasets: [] }; // Default to empty arrays

const optionsProducts = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        callback: function(value) {
          return `${value} Unidades`;
        }
      },
    }
  }
};

  
  if (isLoading) {
    return (
      <div className="container">
        <div className="text">Analítica</div>
        <div className='space' />
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
        <div className='space' />
        <div className='error-container'>
          <BiError color='black' size={80}/>
          <p className='loading'>Error Cargando Analítica</p>
        </div>
      </div>
    );
  }

  if (noSalesMessage){
    return (
      <div className="container">
        <div className="text">Analítica</div>
        
        <div className='date-filters'>
        <label>
          Fecha de Inicio:
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            max={fechaFin}
          />
        </label>
        <label>
          Fecha de Fin:
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            min={fechaInicio}
          />
        </label>
      </div>
      <div className='space' />
        <div className='error-container'>
          <TbMoodSad2 color='black' size={80}/>
          <p className='loading'><strong>{noSalesMessage}</strong></p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="text">Analítica</div>
      
      <div className='date-filters'>
        <label>
          Fecha de Inicio:
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            max={fechaFin}
          />
        </label>
        <label>
          Fecha de Fin:
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            min={fechaInicio}
          />
        </label>
      </div>


      <div className='analysis_section'>
        <h2>Ventas Diarias</h2>
        <Line data={dailySalesChartData} options={optionsDailySales}/>
      </div>
      
      <div className='analysis_section'>
        <h2>Productos Vendidos</h2>
        <Bar data={productsChartData} options={optionsProducts}/>
      </div>

      <div className='horizontal_info_analysis'>
        <div className='analysis_section_nongraph'>
          <h2>Total Ventas</h2>
            <div className='info_section_ventas'>
              <p className='loading'>De {fechaInicio} a {fechaFin}: </p>
              <p className='loading'><strong>{sales.length} Ventas</strong></p>
              <p className='loading'><strong>Q.{parseFloat(totalSales).toFixed(2)}</strong></p>
            </div>
        </div>

        <div className='analysis_section_nongraph'>
          <h2>Mejores Clientes</h2>
          <div className="table4">
            <div className="table4-grid table-header">
              <h3>Cliente</h3>
              <h3>Pedidos</h3>
            </div>
            {Array.isArray(clients) && clients.length > 0 ? (
              clients.map((cliente, index) => (
                <div className="table4-grid table-row" key={index}>
                  <p className='table-text'>{cliente.nombre}</p>
                  <p className='table-text'>{cliente.total_pedidos}</p>
                </div>
              ))
            ) : (
              <p className='table-text'>No hay clientes disponibles.</p> // Message when no clients are available
            )}
          </div>
        </div>
      </div>
      
      
      
    </div>
  );
};

export default AnaliticaPage;
