import { CalendarBlank, Clock } from "phosphor-react";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { Button, Text, TextArea, TextInput } from "@system-ignite-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { api } from "@/src/lib/axios";


const confirmFormSchema = z.object({
    name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
    email: z.string().email({ message: 'Digite um e-mail válido' }),
    observations: z.string().nullable(),
  })
  
  type ConfirmFormData = z.infer<typeof confirmFormSchema>

  interface ConfirmStepProps {
    schedulingDate: Date
    onCancelConfirmation: () => void
  }
  
 export function ConfirmStep() {
    const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
    } = useForm<ConfirmFormData>({
      resolver: zodResolver(confirmFormSchema),
    })
  
    const router = useRouter()
    const username = String(router.query.username)
  
    async function handleConfirmScheduling(data: ConfirmFormData) {
      console.log(data)
    }
  
    //const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
    //const describedTime = dayjs(schedulingDate).format('HH:mm[h]')
  
  
    return (
        <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
        <FormHeader>
          <Text>
            <CalendarBlank />
            22 de Setembro de 2022
          </Text>
          <Text>
            <Clock />
            18:00h
          </Text>
        </FormHeader>
  
        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
        </label>
  
        <label>
          <Text size="sm">Endereço de e-mail</Text>
          <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
        </label>
  
        <label>
        <TextArea {...register('observations')} />
          <TextArea />
        </label>
  
        <FormActions>
          <Button type="button" variant="tertiary">
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
        </FormActions>
      </ConfirmForm>
    )
  }