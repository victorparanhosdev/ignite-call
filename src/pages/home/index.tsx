import { Heading, Text } from "@system-ignite-ui/react";
import { Container, Hero, Preview } from "./styles";
import Image from "next/image";
import ImageCalendar from "../../assets/calendar.png";
import {ClaimUsernameForm} from '../home/components/ClaimUsernameForm'
import { NextSeo } from "next-seo";
export default function Home() {
  return (
    <>
    <NextSeo 
      title="Descomplique sua agenda | Ignite Call"
      description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
    
    />

    <Container>
      <Hero>
        <Heading as="h1" size='4xl'>Agendamento descomplicado</Heading>
        <Text size='xl'> 
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <ClaimUsernameForm />
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
    </>
  );
}
