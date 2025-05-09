import {
    Card,
    Heading,
    HStack,
    IconButton,
    Input,
    Popover,
    Portal,
    Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

export interface RelationNote {
    id: string;
    relationId: string;
    title: string;
    note?: string;
}

export function NoteList() {
    const [relationNotes, setRelationNotes] = useState<RelationNote[]>([]);
    const baseApiUrl = "http://localhost:8080";
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getRelationNotes = async () => {
            try {
                const response = await axios.get(
                    `${baseApiUrl}/api/relation/${id}/note/get`
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
    }, [id, refresh]);

    const addRelationNote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${baseApiUrl}/api/relation/${id}/note/create`,
                {
                    title,
                }
            );
            if (response.status === 200) {
                setRefresh(!refresh);
            }
            // Redirect to home page or other protected route
        } catch (error) {
            // Handle login error
            console.error(error);
        }
    };

    return (
        <>
            <Stack mx="10">
                <HStack justifyContent="space-between">
                    <Heading size="2xl">Notes</Heading>
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <IconButton size="sm">
                                <FiPlus />
                            </IconButton>
                        </Popover.Trigger>
                        <Portal>
                            <Popover.Positioner>
                                <Popover.Content>
                                    <Popover.Arrow />
                                    <Popover.Body>
                                        <Popover.Title fontWeight="medium">
                                            Naruto Form
                                        </Popover.Title>
                                        <form onSubmit={addRelationNote}>
                                            <Input
                                                placeholder="Title"
                                                size="sm"
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                            />
                                        </form>
                                    </Popover.Body>
                                </Popover.Content>
                            </Popover.Positioner>
                        </Portal>
                    </Popover.Root>
                </HStack>
                {relationNotes.map((relationNote) => (
                    <Card.Root size="sm">
                        <Link to={`note/${relationNote.id}`}>
                            <Card.Body>{relationNote.title}</Card.Body>
                        </Link>
                    </Card.Root>
                ))}
            </Stack>
        </>
    );
}

export default NoteList;
