import { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker"; 
import * as FileSystem from "expo-file-system"

import { VStack, ScrollView, Center, Skeleton, Text, Heading, useToast } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Button } from "@components/Button";
import { Input } from "@components/Input";


const PHOTO_SIZE = 33;

export function Profile(){

    const [photoIsLoading,setPhotoIsLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState('http://github.com/altencirsilvajr.png');

    const toast = useToast();

    async function handleUserPhotSelect(){
        setPhotoIsLoading(true);

        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4,4],
                allowsEditing: true,

            });
    
            if(photoSelected.canceled){
                return
            }

            if(photoSelected.assets[0].uri){

                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri) ;

                if(photoInfo.exists && (photoInfo.size / 1024 /1024) > 3){

                    return toast.show({
                        title: "Escolha uma imagem abaixo de 3MB",
                        placement:"top",
                        bgColor:"red.500"
                    });
                }

                setUserPhoto(photoSelected.assets[0].uri);
            }
    
        } catch (error) {
           throw error
           
        }finally{
            setPhotoIsLoading(false);
        }
    }

    return(
        <VStack flex={1}>
            <ScreenHeader title = 'Perfil'/>

            <ScrollView contentContainerStyle={{ paddingBottom: 36}}>
                <Center mt={6} px={10}>

                    {
                        photoIsLoading ? 

                    <Skeleton 
                        h={PHOTO_SIZE} 
                        w={PHOTO_SIZE}
                        rounded={'full'}
                        startColor={"gray.500"}
                        endColor={"gray.400"}
                    />
                        :
                    <UserPhoto
                        source={{ uri: userPhoto}}
                        alt="Imagem do usuário"
                        size={PHOTO_SIZE}
                    />
                    }

                    <TouchableOpacity onPress={handleUserPhotSelect}>
                        <Text color={'green.500'} fontWeight={'bold'} fontSize={'md'} mt={2} mb={8}> Alterar foto</Text>
                    </TouchableOpacity>

                    <Input
                        placeholder="Nome"
                        bg={'gray.600'}
                    />

                    <Input
                        placeholder="E-mail"
                        isDisabled
                        bg={'gray.600'}
                    />


                    <Heading color={'gray.200'} fontSize={'md'} mb={2} alignSelf={'flex-start'} mt={12}>
                        Alterar Senha:
                    </Heading>

                    <Input
                        bg={"gray.600"}
                        placeholder="Senha antiga"
                        secureTextEntry
                    />

                    <Input
                        bg={"gray.600"}
                        placeholder="Nova senha"
                        secureTextEntry
                    />

                    <Input
                        bg={"gray.600"}
                        placeholder="Confirme nova senha"
                        secureTextEntry
                    />

                    <Button
                        title="Atualizar"
                        mt={4}
                    />

                </Center>

            </ScrollView>
            
        </VStack>
    );
}