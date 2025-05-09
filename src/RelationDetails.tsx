import { Textarea, Stack, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export function RelationDetails() {
    const { title } = useParams();

    return (
        <>
            <Stack>
                <Heading mx="auto">{title}</Heading>
                <Textarea
                    variant="subtle"
                    autoresize
                    mx="auto"
                    maxW={"7xl"}
                    rows={25}
                    maxH="25lh"
                ></Textarea>
            </Stack>
        </>
    );
}

export default RelationDetails;
