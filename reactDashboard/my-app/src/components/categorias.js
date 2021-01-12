import React from "react";
import "./app.css";
import Categoria from "./categoria";

const contenido = [
    {   titulo : "Categoria 1",
        number : "1"},
    {   titulo : "Categoria 2",
        number : "2"},
    {   titulo : "Categoria 3",
        number : "3"},
    {   titulo : "Categoria 4",
        number : "4"},
    {   titulo : "Categoria 5",
        number : "5"},
    {   titulo : "Categoria 6",
        number : "6"},


]

function Categorias() {
    return (
    <div class="col-lg-6 mb-4">						
							<div class="card shadow mb-4">
								<div class="card-header py-3">
									<h6 class="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
								</div>
								<div class="card-body">
                                <div className="row">
                                    {contenido.map( (item) => item.number > 0 ? <Categoria titulo = {item.titulo} /> : "")}
									</div>
								</div>
							</div>
						</div>
					
    );
};

export default Categorias;