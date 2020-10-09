import React, {useState} from 'react'
import {Table, Button, Container, Modal, FormGroup, Form } from 'react-bootstrap';
import datas from './Data'
import s from '../styles/styles.module.css'
import Menu from './menu'


const Product = ()=> {
    const [date, setData] = useState(datas.data)
    const [form, setForm] = useState({
        name : "",
        description : "",
        price : "",
        stock : "",
        category : ""
    })
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false)


    /*********************** Functions **************************** */
    const openModal = ()=> { setShow(true)  }
    const closeModal = ()=> { setShow(false)  }
    const closeModalUpdate = ()=> { setShowUpdate(false)  }
    const handlerChange = (e) => {  setForm({ ...form, [e.target.name]:e.target.value})  }
    const insertProduct = () => {
        console.log(form)
        let dataNew = date
        form.id = dataNew.length + 1
        dataNew.push({...form})
        console.log(dataNew)
        setData(dataNew)
        setShow(false)
    }
    const updateProductModal = (product)=> {
        console.log(product)
        let cont = 0;
        let list = date
        console.log(list)
        list.map((dat)=>{
            if(dat.id === product.id) { 
                list[cont].id = product.id
                list[cont].name = product.name
                list[cont].description = product.description
                list[cont].price = product.price
                list[cont].stock = product.stock
                list[cont].category = product.category
            }
            cont++
        })
        setShowUpdate(true)
        setForm(product)
        setData(list)
    }

    const updateProduct = (dat)=>{
        console.log(dat)
        let cont = 0;
        let list = date
        list.map((date)=>{
            if(date.id === dat.id) { 
                list[cont].name = dat.name
                list[cont].description = dat.description
                list[cont].price = dat.price
                list[cont].stock = dat.stock
                list[cont].category = dat.category
            }
            cont++
        })
        
        setData(list)
        setShowUpdate(false)
    }

    const deleteProduct = (id)=>{
        console.log(id)
        if(window.confirm('Are you sure remove this product?')){
            let list = date.filter((dt)=> {
                return dt.id !== id
            })
           return setData(list)
        }

    }

    return (
        <>
        <div>
            <Menu/>
            <div className= {s.cont__table__pr}>
            <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {date.map(dat => {
                            return (
                                <tr>
                                    <td>{dat.id}</td>
                                    <td>{dat.name}</td>
                                    <td>{dat.description}</td>
                                    <td>{dat.price}</td>
                                    <td>{dat.stock}</td>
                                    <td>{dat.category}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => deleteProduct(dat.id)}>Delete</Button>{"  "}
                                        <Button variant="primary" onClick={()=> updateProductModal(dat)}>Update</Button>
                                    </td>
                                    
                                </tr>
                            )
                        })}
                    </tbody>
            </Table>
            <Button variant="success" onClick={openModal}>Add Product</Button>
            </div>
        </div>
        {/**************************** MODAL ADD ******************************** */}
        <div>
            <Modal 
                show={show}
                backdrop="static"
                onHide={closeModal}
                keyboard={false}
                >
                    <Modal.Header>
                        Add Product
                    </Modal.Header>

                    <Modal.Body>
                    <Form.Group>
                            <Form.Label>Id:</Form.Label>
                            <input type="text" name="name" value={date.length+1} readOnly/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <input type="text" name="name"  onChange={handlerChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <input type="text" name="description" onChange={handlerChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price:</Form.Label>
                            <input type="number" name="price" onChange={handlerChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Stock:</Form.Label>
                            <input type="number" name="stock" onChange={handlerChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category: </Form.Label>
                            <select onChange={handlerChange} name="category">
                            <option value="">....</option>
                                {datas.dataCat.map((d)=>{
                                    return (
                                        <option value={d.name}>{d.name}</option>
                                    )
                                })}

                            </select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={insertProduct}>Add</Button>
                        <Button variant="danger" onClick={closeModal}>Cancel</Button>
                    </Modal.Footer>
            </Modal>
        </div>
         {/**************************** MODAL UPDATE ******************************** */}
        <div>
        <Modal 
                show={showUpdate}
                backdrop="static"
                onHide={closeModalUpdate}
                keyboard={false}
                >
                    <Modal.Header>
                        Update Product
                    </Modal.Header>

                    <Modal.Body>
                    <Form.Group>
                            <Form.Label>Id:</Form.Label>
                            <input type="text" name="name"  readOnly value={form.id} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <input type="text" name="name"  onChange={handlerChange} value={form.name}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <input type="text" name="description" onChange={handlerChange} value={form.description}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price:</Form.Label>
                            <input type="number" name="price" onChange={handlerChange} value={form.price}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Stock:</Form.Label>
                            <input type="number" name="stock" onChange={handlerChange} value={form.stock}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category: </Form.Label>
                            <select onChange={handlerChange} name="category" value={form.category}>
                            <option value="">....</option>
                                {datas.dataCat.map((d)=>{
                                    return (
                                        <option value={d.name}>{d.name}</option>
                                    )
                                })}

                            </select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => updateProduct(form)}>Update</Button>
                        <Button variant="danger" onClick={closeModalUpdate}>Cancel</Button>
                    </Modal.Footer>
            </Modal>
        </div>
        </>
    )
}


export default Product