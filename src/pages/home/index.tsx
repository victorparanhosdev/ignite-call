import { Heading, Text, Button } from "@system-ignite-ui/react";
import { Container, Hero, Preview } from "./styles";
import Image from "next/image";
import ImageCalendar from "../../assets/calendar.png";
import {ArrowRight} from 'phosphor-react'
export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size='4xl'>Agendamento descomplicado</Heading>
        <Text size='xl'> 
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <Button>Reservar <ArrowRight /></Button>
      </Hero>
      <Preview>
        <Image
          height={400}
          src={ImageCalendar}
          alt="Calendário simbolizando aplicação em funcionamento"
          priority
          quality={100}
        />
      </Preview>
    </Container>
  );
}
