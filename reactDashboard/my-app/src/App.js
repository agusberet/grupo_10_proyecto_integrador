import Sidebar from "./components/sidebar";
import Heading from "./components/heading";
import Content from "./components/content";
import Last from "./components/last";
import Categorias from "./components/categorias";
import "./App.css";
import "./components/app.css";
/* import PropTypes from "prop-types"; */
import totalRequest from "./requests/apiRequest";



const contenido = [
  { titulo : " Products in Data Base",
    valor: '',
    clase: "fas fa-clipboard-list fa-2x text-gray-300",
    number : "1",
    color: "card border-left-primary shadow h-100 py-2",},
{   titulo : " Amount in products",
    valor : "",
    clase: "fas fa-dollar-sign fa-2x text-gray-300",
    number: "2",
    color: "card border-left-success shadow h-100 py-2",},
{   titulo : "Users quantity",
    valor: "",
    clase: "fas fa-user-check fa-2x text-gray-300",
    number : "3",
    color: "card border-left-warning shadow h-100 py-2",},
]

function App(){
  return (
  <div className = "App" idName="wrapper">
    <Sidebar/>
    <div>
    <Heading/>
      <div className = "Line">
      {contenido.map( (item) =>
       item.number > 0 ? 
       <Content titulo = {item.titulo} valor = {item.valor} clase = {item.clase} color = {item.color} /> : "")}
      </div>
      <div className = "Line">
        <Last/>
        <Categorias/>
      </div>
    </div>    
  </div>
  );
};

export default App;

