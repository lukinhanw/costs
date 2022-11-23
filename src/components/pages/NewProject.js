import { useState, useEffect } from 'react'

import styles from './NewProject.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import Button from '../form/Button'

function NewProject() {
    const [categories, setCategories] = useState([])
    

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err => console.log(err)))
    },[])

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            {/* <form onSubmit={submit} className={styles.form}> */}
            <form className={styles.form}>
                <Input
                    type="text"
                    text="Nome do projeto"
                    name="name"
                    placeholder="Insira o nome do projeto"
                />
                <Input
                    type="number"
                    text="Orçamento do projeto"
                    name="budget"
                    placeholder="Insira o orçamento total"
                />
                <Select
                    name="category_id"
                    text="Selecione a categoria"
                    options={categories}
                />
                <Button text="Criar Projeto" />
            </form>

        </div>
    )
}

export default NewProject