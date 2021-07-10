import React from 'react'
import '../App.css'
import { A, Footer, H4, H3 } from '../styles/styles'

const About = () => {
  return(
    <div style={{textAlign: 'center'}}>
      <div>
        <h1>Rando Search</h1>
        <div>
        <h4>Rando Search was created by people for the people about information that is absolutely critical for everyday life! Have you ever wanted to spend hours researching topics that you have no legitimate reason that you need to know? Well... look no further! Rando Search is the Site for you!</h4>
        </div>
        <div>
          <H3>Created by Team Landrick!</H3>
          <H4>Rodgerick Heninger & Landon Hickman</H4>
        </div>
        <Footer>
          <A href="https://lucid.app/lucidchart/24512ca6-d178-4f73-b6fa-109d5c156af4/edit?beaconFlowId=548F8E2DE05F1883&page=0_0&invitationId=inv_4db7af82-a8c7-4d17-b8ea-f260929f6500#">Lucid Chart</A>
          <A href="https://www.figma.com/file/JJktVeS7iR8ggjKaMjz3KL/Untitled?node-id=0%3A1">Figma</A>
          <A href="https://www.figma.com/file/JJktVeS7iR8ggjKaMjz3KL/Untitled?node-id=0%3A1">Git Hub</A>
        </Footer>
      </div>
    </div>
  )
}

export default About