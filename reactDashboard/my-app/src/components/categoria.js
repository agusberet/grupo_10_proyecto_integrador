import React from "react";
import "./app.css";

function Categoria(props) {
    return (
        
										<div className="col-lg-6 mb-4">
											<div className="card bg-info text-white shadow">
												<div className="card-body">
													{props.titulo}
												</div>
											</div>
										</div>
										
    );
};

export default Categoria;