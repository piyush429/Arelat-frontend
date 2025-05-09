import { Button, Field, Fieldset, Heading, Input } from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    //TODO: change this
    const baseApiUrl = "http://localhost:8080";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseApiUrl}/api/auth/login`, {
                email,
                password,
            });
            login(response.data.jwtToken);
            navigate("/"); // should go to home
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Fieldset.Root mt="20" mx="auto" size="lg" maxW="xl">
                    <Fieldset.Legend mx="auto">
                        <Heading size="2xl">Login</Heading>
                    </Fieldset.Legend>

                    <Fieldset.Content>
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

                    <Button type="submit">Login</Button>
                    <Button asChild variant={"outline"}>
                        <Link to="/signup">Sign Up</Link>
                    </Button>
                </Fieldset.Root>
            </form>
        </>
    );
}

export default Login;
