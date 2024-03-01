import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@system-ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Container, Header } from '../styles'

import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getWeekDays } from '@/src/utils/get-week-days'

const timeIntervalsFormSchema = z.object({

})

type timeIntervalFormProps = z.infer<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {

  const {handleSubmit, register, control, formState: {errors, isSubmitting}} = useForm({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ]
    }
  })

  const {fields} = useFieldArray({
    control,
    name: 'intervals',
  })

  const weekDays = getWeekDays()

  async function handleSetTimeIntervals(data: timeIntervalFormProps) {

  }
  
  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horário que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map(field => {
              return (
                <IntervalItem key={field.id}>
                <IntervalDay>
                  <Checkbox />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput containerProps={{size:"sm"}} type="time" step={60} />
                  <TextInput containerProps={{size:"sm"}} type="time" step={60} />
                </IntervalInputs>
              </IntervalItem>
              )
          }) }

    
        </IntervalContainer>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}