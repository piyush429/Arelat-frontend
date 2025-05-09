import { Card, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface RelationNote {
    id: string;
    relationId: string;
    name: string;
    note: string;
}

export function NoteList() {
    const [relationNotes, setRelationNotes] = useState<RelationNote[]>([]);
    const baseApiUrl = "http://localhost:8080";

    useEffect(() => {
        const getRelationNotes = async () => {
            try {
                const response = await axios.get(
                    `${baseApiUrl}/api/relation/{}/get`
                );

                if (response.status === 200) {
                    setRelationNotes(response.data.relations);
                }
                // Redirect to home page or other protected route
            } catch (error) {
                // Handle login error
                console.error(error);
            }
        };

        getRelationNotes();
    }, []);

    return (
        <>
            <Stack>
                {relationNotes.map((relationNote) => (
                    <Card.Root mx="10" size="sm">
                        <Link to={relationNote.id}>
                            <Card.Body>{relationNote.name}</Card.Body>
                        </Link>
                    </Card.Root>
                ))}
            </Stack>
        </>
    );
}

export default NoteList;
