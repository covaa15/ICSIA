import React from "react";

const Tarjetas = () => {
  const cards = [1,2,3,4]; // 4 tarjetas idénticas
  return (
    <div className="container my-5">
      <div className="row">
        {cards.map((_, index) => (
          <div className="col-md-3 mb-3" key={index}>
            <div className="card h-100">
              <img src="https://www.shutterstock.com/image-photo/group-safari-animals-together-on-600nw-2465090157.jpg" className="card-img-top" alt="Animal"/>
              <div className="card-body">
                <h5 className="card-title text-success">Explora la vida animal</h5>
                <p className="card-text">Descubre cómo cuidar a los seres vivos.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tarjetas;
