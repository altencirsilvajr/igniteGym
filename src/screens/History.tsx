import { useState } from "react";

import { Heading, VStack,SectionList, Text} from "native-base";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";




export function Historty(){

    const [exercises, setExercises] = useState([

        {
            title: '23.06.2023',
            data:  ['Puxada Frontal', 'Remada Unilateral']
        },

        {
            title: '26.08.2022',
            data:  ['Puxada Frontal',]
        },
        
    ]);



    return(
        <VStack flex={1}>
            <ScreenHeader title = 'Histórico de Exercícios'/>

            <SectionList
                sections={exercises}
                keyExtractor={ item => item }
                renderItem={( {item}) => (<HistoryCard/>)}

                renderSectionHeader={({ section }) => (

                    <Heading color={'gray.200'} fontSize={'md'} mt={10} mb={3} >
                        {section.title}
                    </Heading>

                )}

                px={8}
                
                contentContainerStyle ={ exercises.length === 0 && {flex:1, justifyContent:'center'}}
                ListEmptyComponent={() => (

                    <Text color={'gray.100'} textAlign={'center'}>
                        Nenhum exercício registrado. Vamos começar?
                    </Text>
                )}
                showsVerticalScrollIndicator = {false}
            />
        </VStack>

        
    );
}