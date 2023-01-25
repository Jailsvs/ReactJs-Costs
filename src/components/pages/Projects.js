import Message from '../layout/Message'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import Loading from '../layout/Loading'

import styles from './Projects.module.css'
import {useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Projects() {
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const delayServer = 3000
  const location = useLocation()
  let message = ""
  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(data => {
      console.log(data)
      setProjects(data)
      setRemoveLoading(true)
    })
    .catch((err) => console.log(err))
    }, delayServer);
  }, [])

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus projetos</h1>
        <LinkButton to='/newproject' text='Criar Projeto' />

      </div>
      {message && <Message type="success" msg={message}/>}
      <Container customClass="start">
        {projects.length > 0 &&
         projects.map((project) => 
            <ProjectCard  name={project.name} 
                          id={project.id}
                          budget={project.budget}
                          category={project.category.name}
                          key={project.id}/>  
         )}
         {!removeLoading && <Loading/>}
         {removeLoading && projects.length === 0 && 
         (<p>Não há projetos cadastrados!</p>)}
      </Container>
    </div>
  )
}

export default Projects