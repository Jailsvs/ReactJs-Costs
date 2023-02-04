import {useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'
import { PostProject } from '../../gateways/ProjectGateway'

function NewProject() {
  const history = useNavigate() 

  function createPost(project){
    //initialize cost and services
    project.cost = 0
    project.services = []

    PostProject(project, function() {
      //redirect
      history("/projects",{ state: { message: 'Projeto criado com sucesso!' } })
    });
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