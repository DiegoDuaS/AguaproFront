import React, { useState} from 'react';
import useApiP from '../hooks/useAPIProducts';
import useSearchPedidos from '../hooks/useAPIProducts';
import './header.css';



const SearchEngine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const data = await useApiP();
        setPedidos(data);
      } catch (err) {
        setError('Error al cargar los pedidos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const results = await useSearchPedidos(searchTerm);
      setSearchResults(results);
    } catch (err) {
      setError('Error al buscar pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="search-bar">
        <input
          className="searchbar"
          type="text"
          placeholder="Buscar Clientes, NIT, Dirección o Productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="search-btn"
          onClick={handleSearch}
        >
          <Search size={20} />
        </button>
      
      {searchResults.length > 0 && (
        <div className="w-full">
          <h2 className="text-xl font-bold mb-2">Resultados de búsqueda:</h2>
          <ul className="space-y-2">
            {searchResults.map(pedido => (
              <li key={pedido.id_pedido} className="border p-2 rounded">
                <p><strong>Cliente:</strong> {pedido.cliente}</p>
                <p><strong>NIT:</strong> {pedido.nit_empresa}</p>
                <p><strong>Dirección:</strong> {pedido.direccion}</p>
                <p><strong>Productos:</strong> {pedido.productos}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchEngine;