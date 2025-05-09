import { Textarea, Stack, Heading, Button } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RelationNote } from "./NoteList";
import { FormEvent, useEffect, useState } from "react";

export function RelationDetails() {
    const { id, noteId } = useParams();
    const baseApiUrl = "http://localhost:8080";
    const [relationNote, setRelationNote] = useState<RelationNote>(
        {} as RelationNote
    );

    useEffect(() => {
        const getRelationNotes = async () => {
            try {
                const response = await axios.get(
                    `${baseApiUrl}/api/relation/${id}/note/get/${noteId}`
                );

                if (response.status === 200) {
                    setRelationNote(response.data.relationNote);
                }
                // Redirect to home page or other protected route
            } catch (error) {
                // Handle login error
                console.error(error);
            }
        };

        getRelationNotes();
    }, [id, noteId]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${baseApiUrl}/api/relation/${id}/note/update/${noteId}`,
                {
                    title: relationNote.title,
                    note: relationNote.note,
                    relationId: id,
                }
            );

            if (response.status === 200) {
                console.log("works");
            }
            // Redirect to home page or other protected route
        } catch (error) {
            // Handle login error
            console.error(error);
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Stack>
                <Heading mx="auto">{relationNote.title}</Heading>
                <Textarea
                    variant="subtle"
                    autoresize
                    mx="auto"
                    maxW={"7xl"}
                    rows={25}
                    maxH="25lh"
                    value={relationNote.note}
                    onChange={(e) =>
                        setRelationNote({
                            ...relationNote,
                            note: e.target.value,
                        })
                    }
                ></Textarea>
                <Button mx="auto" type="submit">
                    Save
                </Button>
            </Stack>
        </form>
    );
}

export default RelationDetails;
