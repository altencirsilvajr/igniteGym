import { VStack, Image, Text, Center, Heading, ScrollView} from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"

import BackgroundImg from '@assets/background.png';
import LogoSVG from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';



    const signUpSchema = yup.object({
        name: yup.string().required('Informe o nome:'),
        email: yup.string().required('Informe o email:').email('Email inválido'),
        password: yup.string().required('Informe sua senha:'),
        password_confirm: yup.string().required('Informe sua senha:')
    });


export function SignUp(){

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema)
    });

    const navigation = useNavigation();
    function handleGoBack(){
        navigation.goBack();
    }

    function handleSignUp(){
        //console.log({ name, email, password, password_confirm});
    }



    return(
        <ScrollView contentContainerStyle = {{flexGrow: 1}}  showsVerticalScrollIndicator = {false}>
            <VStack flex={1} bg={"gray.700"} px={10} pb={16}>
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando na academia"
                    resizeMode="contain"
                    position={'absolute'}
                />
                <Center my={24}>
                    <LogoSVG/>
                    <Text color={"gray.100"} fontSize={"sm"}>
                        Treine sua mente e o seu corpo
                    </Text>    
                </Center>

                <Center>
                    <Heading color={"gray.100"} fontSize={'xl'} mb={6} fontFamily={'heading'}>
                        Crie sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name= "name"
                        render={({field: { onChange, value } }) => (
                            <Input 
                                placeholder='Nome'
                                onChangeText={onChange}
                                value= {value}
                                errorMessage= {errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name= "email"
                        render={({field: { onChange, value } }) => (
                            <Input 
                                placeholder='E-mail'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value= {value}
                                errorMessage= {errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name= "password"
                        render={({field: { onChange, value } }) => (
                            <Input 
                                placeholder='Senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value= {value}
                            />
                        )}
                    />
                    
                    <Controller
                        control={control}
                        name= "password_confirm"
                        render={({field: { onChange, value } }) => (
                            <Input 
                                placeholder='Confirmar Senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value= {value}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType='send'
                            />
                        )}
                    />

                    
                    <Button
                        title='Criar e acessar'
                        onPress={handleSubmit(handleSignUp)}
                    />
                </Center>

                    <Button
                        title='Voltar para login'
                        variant={'outline'}
                        mt={24}
                        onPress={handleGoBack}
                    />

            </VStack>
        </ScrollView>
    );
}