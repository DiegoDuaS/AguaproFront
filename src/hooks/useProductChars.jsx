

// 1. elegir/crear tipo producto
export async function fetchTypeId(tipo) {
  try {
    const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/tipos_producto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({tipo})
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json(); //id_tipo
    return result.data || null;
  } catch (error) {
    console.error('Error fetching type ID:', error);
    return null;
  }
}

// 2. crear producto
export async function createProduct(nombre, descripcion, tipo_producto) {
  let typeId = null;
    if (tipo_producto) { // nombre del tipo
      typeId = await fetchTypeId(tipo_producto);
      if (!typeId) {
        return 'No fue posible guardar el dato de tipo';
      }
  }
  console.log(typeId);
  const newProduct = {
    nombre: nombre,
    descripción: descripcion,
    tipo_producto: typeId 
  };

  try {
    const response = await fetch('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/productos', { // Reemplaza con la URL correcta
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Producto creado:', result.data);
    return result.data;
  } catch (error) {
    console.error('Error al crear el producto:', error);
  }
}    

// 3. elegir/crear energía
async function fetchEnergyId(min_hp, max_hp, capacitor) {
  try {
    const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/energia`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({min_hp, max_hp, capacitor})
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json(); //id de energia
    return result.data || null;
  } catch (error) {
    console.error('Error fetching energy ID:', error);
    return null;
  }
}

// 4. elegir/crear condiciones (de temperatura)
async function fetchConditionId(Temperatura_liquida_min, Temperatura_liquida_max, Temperatura_Ambiente, presion) {
  try {
    const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/condiciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({Temperatura_liquida_min, Temperatura_liquida_max, Temperatura_Ambiente, presion})
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json(); //id condiciones
    return result.data|| null;
  } catch (error) {
    console.error('Error fetching conditions ID:', error);
    return null;
  }
}

// 5. crear características
// Debe hacerse solo una vez para un mismo producto
export async function addProductChars({
    energiaParams, // { min_hp, max_hp, capacitor }
    condicionesParams, // { temperatura_liquida_min, temperatura_liquida_max, temperatura_ambiente, presion }
    marca, material, profundidad, conexion_tuberia, presion_funcional, head, flow_rate, aplicaciones, producto, temperatura_media
  }) {
  try {
      //let energiaId = null;
      //if (energiaParams) {
        //energiaId = await fetchEnergyId(energiaParams.min_hp, energiaParams.max_hp, energiaParams.capacitor);
        //if (!energiaId) {
          //return 'No fue posible guardar el dato de energía';
        //}
      //}
  
      //let condicionesId = null;
      //if (condicionesParams) {
        //condicionesId = await fetchConditionId(condicionesParams.temperatura_liquida_min, condicionesParams.temperatura_liquida_max, condicionesParams.temperatura_ambiente, condicionesParams.presion);
        //if (!condicionesId) {
          //return 'No fue posible guardar el dato de Condiciones';
       // }
      //}
  
      const response = await fetch('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/caracteristicas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          marca: marca?.toLowerCase(),
          material: material?.toLowerCase(),
          profundidad,
          conexion_tuberia: conexion_tuberia?.toLowerCase(),
          presion_funcional,
          head,
          flow_rate,
          aplicaciones: aplicaciones?.toLowerCase(),
          producto,
          energia: energiaParams,
          condiciones: condicionesParams,
          temperatura_media
        })
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;

  } catch (error) {
      console.error('Error al agregar características:', error);
      throw error;
  }
}

// 6. elegir/crear size
async function fetchSizeId(min_gpm, max_gpm, range) {
  try {
    const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/size`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({min_gpm, max_gpm, range})
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json(); // id size
    return result.data || null;
  } catch (error) {
    console.error('Error fetching size ID:', error);
    return null;
  }
}

// 7. crear características variables
// Puede hacerse varias veces para un mismo producto
export async function addProductVariableChars({ 
    id_caracteristicas,
    sizeParams, // { min_gpm, max_gpm, range }
    precio,
    disponibilidad
  }) {
  try {
    //let sizeId = null;

    // If sizeParams is provided, fetch the corresponding size ID
    //if (sizeParams) {
      //sizeId = await fetchSizeId(sizeParams.min_gpm, sizeParams.max_gpm, sizeParams.range);
      //if (!sizeId) {
        //return 'No fue posible guardar el dato de Tamaño';
      //}
    //}

    // Insert product characteristics
    const response = await fetch('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/caracteristicas/variables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_caracteristicas, 
        sizeParams, 
        precio, 
        disponibilidad
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error al agregar características:', error);
    throw error;
  }
}

