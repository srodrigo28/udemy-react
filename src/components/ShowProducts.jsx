import axios from "axios"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useState, useEffect } from "react"
import { show_alerta } from "../functions"

const ShowProducts = () => {
    const url = "";
    const [products, setProducts] = useState([])

    const [id, setId] = useState('sequencia de codigos exemplo 1, 2, 3')
    const [name, setName] = useState('nome padrão')
    const [description, setDescription] = useState('descricao padrão')
    const [price, setPrice] = useState('R$ 200')
    const [operation, setOperation] = useState(1)
    const [title, setTitle] = useState('titulo padrão')

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        const respuesta = await axios.get(url);
        setProducts(respuesta.data)
    }

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-4">
                        <div className="d-grid mx-auto">
                            <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalProducts">
                                <i className="fa-solid fa-circle-plus">Add</i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-8 offset-0 offset-lg-12">
                        
                    </div>
                </div>
            </div>
            <div className="modal fade">
                
           </div>
        </div>
    )
}

export default ShowProducts