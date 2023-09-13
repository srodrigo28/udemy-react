import axios from "axios"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useState, useEffect } from "react"
import { show_alerta } from "../functions"

const ShowProducts = () => {
    const url = "http://localhost:8080/product";
    const [products, setProducts] = useState([])

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [operation, setOperation] = useState(1)
    const [title, setTitle] = useState('')

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        const respuesta = await axios.get(url);
        setProducts(respuesta.data)
    }

    const openModal = (op, id, name, description, price) => {
        if(op === 1){
            setTitle('Registar Producto')
            setId('');
            setName('');
            setDescription('');
            setPrice('');
            setOperation(op);
        }else if(op === 2){
            setTitle('Editar Producto')
            setId(id);
            setName(name);
            setDescription(description);
            setPrice(price);
        }

        window.setTimeout(function(){
            document.getElementById('name').focus();
        },500);
    }

    const validar = () => {
        var parametros;
        var metodo;

        if(name.trim() === ""){
            show_alerta("Produto precisa precisa de um nome", "warning");
        }
        else if(description.trim() === ""){
            show_alerta("Produto precisa descrição de um nome", "warning");
        }
        else if(price.trim() === ""){
            show_alerta("Produto precisa preço de um nome", "warning");
        }
        else{
            if(operation === 1){
                parametros = {
                    name:name.trim(),
                    description: description.trim(),
                    price: price
                }
                metodo= 'POST';
                document.getElementById('btnCerrar').click();
                getProducts();
            }
            else{
                parametros = {
                    name:name.trim(),
                    description: description.trim(),
                    price: price
                }
                metodo= 'PUT';
                document.getElementById('btnCerrar').click();
                getProducts();
            }
            enviarSolicitud(metodo,parametros);
            document.getElementById('btnCerrar').click();
            getProducts();
        }
    }

    const enviarSolicitud = async(metodo, parametros) => {
        await axios({ method:metodo, url: url, data:parametros })
              .then(function(respuesta){
                var tipo = respuesta.data[0];
                var msj = respuesta.data[1];
                show_alerta(msj,tipo);
                if(tipo === 'success'){
                    document.getElementById('btnCerrar').click();
                    getProducts();
                }
              })
              .catch(function(error){
                show_alerta('Error en la solicitude', 'error');
                console.log(error);
              })
    }

    const deleteProduct= (id,name) =>{
        var parametros;
        var metodo;

        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Seguro de eliminar el produto '+name+' ?',
            icon: 'question',text:'No se podrá dar marcha atrás',
            showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                setId(id);
            
                metodo= 'DELETE';
                parametros = {id};
                enviarSolicitud(metodo,parametros);

                console.log('Methodo: ' + metodo,  '\n Paramentro: ', parametros);

                document.getElementById('btnCerrar').click();
                getProducts();
            }else{
                show_alerta('El producto no fue eliminado','info');
            }
        });
    }

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-4">
                        <div className="d-grid mx-auto">
                            <button className="btn btn-dark" 
                                onClick={ ()=> openModal(1)}
                                data-bs-toggle="modal" data-bs-target="#modalProducts">
                                <i className="fa-solid fa-circle-plus pr-3">Add</i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-8 offset-2 offset-lg-12">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>PRODUCTO</th>
                                        <th>DESCRIPCION</th>
                                        <th>PRECIO</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    { products.map( (product, id) => (
                                        <tr key={product.id}>
                                            <td>{(id+1)}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{new Intl.NumberFormat('es-mx').format(product.price)}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-warning data-bs-t" data-bs-toggle="modal" data-bs-target="#modalProducts"
                                                    onClick={ ()=> openModal(2,product.id,product.name,product.description,product.price)}>
                                                    <i className="fa-solid fa-edit"></i>
                                                </button>
                                                &nbsp;
                                                <button onClick={ ()=>deleteProduct(product.id,product.name)} className="btn btn-danger">
                                                <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))   
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modalProducts" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="h5">{title}</span>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id="id" />
                            <div className="input-group mb-3">
                                <span className="input-group-text"> <i className="fa-solid fa-gift"></i> </span>
                                <input 
                                    type="text" id="name" className="form-control"
                                    placeholder="Nome" value={name} onChange={ (e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"> <i className="fa-solid fa-comment"></i> </span>
                                <input 
                                    type="text" id="description" className="form-control"
                                    placeholder="Description" value={description} onChange={ (e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"> <i className="fa-solid fa-dollar-sign"></i> </span>
                                <input 
                                    type="text" id="price" className="form-control"
                                    placeholder="R$ 0,00" value={price} onChange={ (e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="d-grid col-6 mx-auto">
                                <button className="btn btn-success"
                                    onClick={() => validar()}>
                                    <i className="fa-solid fa-floppy-disk"></i> Guardar
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="btnCerrar" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
                
           </div>
        </div>
    )
}

export default ShowProducts