import {
    Button,
    Field,
    Fieldset,
    For,
    Input,
    NativeSelect,
    Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export function UpdateRelation() {
    const location = useLocation();
    const { props } = location.state;
    const [email, setEmail] = useState(props.email);
    const [name, setName] = useState(props.name);
    const [phone, setPhone] = useState(props.phone);
    const [birthday, setBirthday] = useState(props.birthday);
    const [relationType, setRelationType] = useState(props.relationType);

    const baseApiUrl = "http://localhost:8080";
    const { id } = useParams();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${baseApiUrl}/api/relation/update/${id}`,
                {
                    email,
                    name,
                    phone,
                    birthday,
                    relationType,
                }
            );
            if (response.status === 200) {
                setEmail("");
                setName("");
                setPhone("");
                setBirthday("");
                setRelationType("");
            }
            // Redirect to home page or other protected route
        } catch (error) {
            // Handle login error
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Fieldset.Root mt="20" mx="auto" size="lg" maxW="3xl">
                    <Stack>
                        <Fieldset.Legend>Update Relation</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Please provide the details below.
                        </Fieldset.HelperText>
                    </Stack>

                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Name</Field.Label>
                            <Input
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Email address</Field.Label>
                            <Input
                                name="email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Phone</Field.Label>
                            <Input
                                name="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Date of Birth</Field.Label>
                            <Input
                                name="birthday"
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Relation</Field.Label>
                            <NativeSelect.Root>
                                <NativeSelect.Field
                                    name="relation"
                                    value={relationType}
                                    onChange={(e) =>
                                        setRelationType(e.target.value)
                                    }
                                >
                                    <For
                                        each={[
                                            "Friend",
                                            "Partner",
                                            "Sibling",
                                            "Child",
                                            "Parent",
                                        ]}
                                    >
                                        {(item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        )}
                                    </For>
                                </NativeSelect.Field>
                                <NativeSelect.Indicator />
                            </NativeSelect.Root>
                        </Field.Root>
                    </Fieldset.Content>

                    <Button type="submit" alignSelf="flex-start">
                        Submit
                    </Button>
                </Fieldset.Root>
            </form>
        </>
    );
}

export default UpdateRelation;
