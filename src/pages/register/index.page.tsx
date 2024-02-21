import { Button, Heading, MultiStep, Text, TextInput } from '@system-ignite-ui/react'
import { ArrowRight } from 'phosphor-react'

import { Container, Form, FormError, Header } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect } from 'react'
import router, { useRouter } from 'next/router'
import { api } from '@/src/lib/axios'
import { AxiosError } from 'axios'



const registerFormSchema = zod.object({
    username: zod
        .string()
        .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
        .regex(/^([a-z\\-]+)$/i, {
            message: 'O usuário pode ter apenas letras e hifens.',
        })
        .transform((username) => username.toLowerCase()),
    name: zod
        .string()
        .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
})

type RegisterFormData = zod.infer<typeof registerFormSchema>

export default function Register() {


    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
    })

    async function handleRegister(data: RegisterFormData) {

        try {
            await api.post('/users',{
                name: data.name,
                username: data.username
            })
            
            await router.push('/register/connect-calendar')

        }catch(error){
            if(error instanceof AxiosError && error?.response?.data?.message){
                return alert(error?.response.data.message)
            }

            console.error(error)
        }

    }

    const {query} = useRouter()

    useEffect(()=> {
        if(query.username){
            setValue('username', String(query.username))
        }
    }, [query?.username, setValue])

    return (
        <Container>
            <Header>
                <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
                <Text>
                    Precisamos de algumas informações para criar seu perfil! Ah, você pode
                    editar essas informações depois.
                </Text>

                <MultiStep size={4} currentStep={1} />
            </Header>

            <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size="sm">Nome de usuário</Text>
                    <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuário"
            {...register('username')}
          />

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
                </label>

                <label>
                    <Text size="sm">Nome completo</Text>
                    <TextInput placeholder="Seu nome" {...register('name')} />

                    {errors.name && (
                        <FormError size="sm">{errors.name.message}</FormError>
                    )}
                </label>

                <Button type="submit" disabled={isSubmitting}>
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Form>
        </Container>
    )
}