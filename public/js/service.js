const listAderezos = () => {
    return fetch("http://localhost:3000/aderezos")
        .then((res) => res.json())
        .catch((err) => console.error('Error solicitando aderezos:', err));
};

const createAderezos = (name, price, img) => {
    return fetch("http://localhost:3000/aderezos", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",   
        },
        body: JSON.stringify({
            name,
            price,
            img,
        }) 
    }).then((res) => res.json())
      .catch((err) => console.error(err));
};

const deleteAderezos = (id) => {
    return fetch(`http://localhost:3000/aderezos/${id}`, {
        method: "DELETE",
        headers:{
            "Content-Type" : "application/json"
        }
    }).then((res) => res.json())
      .catch((err) => console.error(err));
};

export const serviceAderezos = { 
    listAderezos, 
    createAderezos, 
    deleteAderezos 
};
