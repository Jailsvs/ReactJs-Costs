import {useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject() {
  const history = useNavigate() //useHistory -> useNavigate

  function createPost(project){
    //initialize cost and services
    project.cost = 0
    project.services = []

    fetch("http://localhost:5000/projects", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project)
        }).then((resp) => resp.json())
          .then((data) => {
            console.log(data)
            //redirect
            history("/projects",{ state: { message: 'Projeto criado com sucesso!' } })
          })
          .catch((err)=> console.log(err))
  }

  return (
    <div className={styles.newProjectContainer}>
      <h1>Criar Projeto</h1>    
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <p>Formulário</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
    </div>
    
  )
}

export default NewProject