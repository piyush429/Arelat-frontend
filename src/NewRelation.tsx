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

export function NewRelation() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [relationType, setRelationType] = useState("Friend");

    const baseApiUrl = "http://localhost:8080";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${baseApiUrl}/api/relation/create`,
                {
                    email,
                    name,
                    phone,
                    birthday,
                    relationType,
                }
            );
            if (response.status === 200) {
                console.log("works");
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
                        <Fieldset.Legend>New Relation</Fieldset.Legend>
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

export default NewRelation;
