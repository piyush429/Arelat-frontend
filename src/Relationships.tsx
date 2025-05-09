// src/RelationsTable.tsx
import {
    Image,
    Table,
    IconButton,
    Stack,
    Input,
    HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiPlus, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Relation } from "./Relation";

function getAgeFromBirthday(birthday: Date) {
    if (birthday != null) {
        console.log(typeof birthday);
        console.log(birthday);
        return Math.floor((Date.now() - birthday.getTime()) / 31536000000);
    } else return null;
}

export function RelationsTable() {
    const [relations, setRelations] = useState<Relation[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const baseApiUrl = "http://localhost:8080";

    useEffect(() => {
        const getRelations = async () => {
            try {
                const response = await axios.get(
                    `${baseApiUrl}/api/relation/get`
                );

                if (response.status === 200) {
                    const tempRelations: Relation[] = response.data.relations;
                    tempRelations.forEach(
                        (r: Relation) => (
                            (r.birthday = new Date(r.birthday)),
                            (r.age = getAgeFromBirthday(r.birthday))
                        )
                    );

                    setRelations(tempRelations);
                }
                // Redirect to home page or other protected route
            } catch (error) {
                // Handle login error
                console.error(error);
            }
        };

        getRelations();
    }, []);

    const filteredRelations = relations.filter(
        (relation) =>
            relation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            relation.relationType
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Stack m="20">
                <HStack>
                    <Input
                        placeholder="Search"
                        id="search"
                        name="search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    ></Input>
                    <Link to="/relations/new">
                        <IconButton size="sm">
                            <FiPlus />
                        </IconButton>
                    </Link>
                </HStack>
                <Table.ScrollArea>
                    <Table.Root variant="outline">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Image</Table.ColumnHeader>
                                <Table.ColumnHeader>Name</Table.ColumnHeader>
                                <Table.ColumnHeader>Age</Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    Relation Type
                                </Table.ColumnHeader>
                                <Table.ColumnHeader></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {filteredRelations.map((relation) => (
                                <Table.Row key={relation.id}>
                                    <Table.Cell w="100px">
                                        <Image
                                            boxSize="50px"
                                            borderRadius="full"
                                            fit="cover"
                                            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/relations/${relation.id}`}>
                                            {relation.name}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{relation.age}</Table.Cell>
                                    <Table.Cell>
                                        {relation.relationType}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            to={`/relations/update/${relation.id}`}
                                            state={{ props: relation }}
                                        >
                                            <IconButton variant="ghost">
                                                <FiSettings />
                                            </IconButton>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
            </Stack>
        </>
    );
}

export default RelationsTable;
