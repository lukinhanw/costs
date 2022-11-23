import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './NewProject.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import Button from '../form/Button'

function NewProject({ projectData }) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    const history = useNavigate()

    // Funcao que manda o post
    function createPost(project) {
        // initialize cost and services
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                history('/projects', { message: 'Projeto criado com sucesso!' })
            })
    }

    //Puxa as categoria da API
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
    }, [])

    const submit = (e) => {
        e.preventDefault()
        createPost(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }
    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <form onSubmit={submit} className={styles.form}>
                <Input
                    type="text"
                    text="Nome do projeto"
                    name="name"
                    placeholder="Insira o nome do projeto"
                    handleOnChange={handleChange}
                    value={project.name || ''}
                />
                <Input
                    type="number"
                    text="Orçamento do projeto"
                    name="budget"
                    placeholder="Insira o orçamento total"
                    handleOnChange={handleChange}
                    value={project.budget || ''}
                />
                <Select
                    name="category_id"
                    text="Selecione a categoria"
                    options={categories}
                    handleOnChange={handleCategory}
                    value={project.category ? project.category.id : ''}
                />
                <Button text="Criar Projeto" />
            </form>

        </div>
    )
}

export default NewProject