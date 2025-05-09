import { Button, Field, Fieldset, Heading, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const baseApiUrl = "http://localhost:8080";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseApiUrl}/api/auth/signup`, {
                email,
                name,
                password,
            });
            if (response.status === 201) {
                navigate("/login");
            }
            // Redirect to home page or other protected route
        } catch (error) {
            // Handle login error
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Fieldset.Root mt="20" mx="auto" size="lg" maxW="xl">
                    <Fieldset.Legend mx="auto">
                        <Heading size="2xl">Sign Up</Heading>
                    </Fieldset.Legend>

                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Name</Field.Label>
                            <Input
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Email address</Field.Label>
                            <Input
                                name="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Password</Field.Label>
                            <Input
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Field.Root>
                    </Fieldset.Content>

                    <Button type="submit">Sign Up</Button>
                    <Button asChild variant={"outline"}>
                        <Link to="/login">Login</Link>
                    </Button>
                </Fieldset.Root>
            </form>
        </>
    );
}

export default Signup;
