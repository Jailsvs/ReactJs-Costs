import Message from '../layout/Message'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import Loading from '../layout/Loading'

import styles from './Projects.module.css'
import {useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ListProjects, RemoveProject } from '../../gateways/ProjectGateway'

function Projects() {
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState("")
  const delayServer = 300
  const location = useLocation()
  let message = ""
  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    setTimeout(() => {
      ListProjects(function(data) {
        setProjects(data)
        setRemoveLoading(true)
      })
    }, delayServer);
  }, [])

  function removeProject(id) {
    RemoveProject(id, function(data){
      setProjects(projects.filter((project) => project.id !== id))
      setProjectMessage("Projeto removido com sucesso!")
    })
  }


  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus projetos</h1>
        <LinkButton to='/newproject' text='Criar Projeto' />

      </div>
      {message && <Message type="success" msg={message}/>}
      {projectMessage && <Message type="success" msg={projectMessage}/>}
      <Container customClass="start">
        {projects.length > 0 &&
         projects.map((project) => 
            <ProjectCard  name={project.name} 
                          id={project.id}
                          budget={project.budget}
                          category={project.category.name}
                          key={project.id}
                          handleRemove={removeProject}/>  
         )}
         {!removeLoading && <Loading/>}
         {removeLoading && projects.length === 0 && 
         (<p>Não há projetos cadastrados!</p>)}
      </Container>
    </div>
  )
}

export default Projects