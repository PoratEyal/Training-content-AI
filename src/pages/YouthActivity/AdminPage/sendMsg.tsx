//
// This is an Admin page with one functionality:
// Send a message to the backend using a password field
//
import React, { useState } from "react";
import { fetchSendMsg } from "../../../utils/fetch";
import { Helmet } from "react-helmet-async";

const Admin: React.FC = () => {
    const [pass, setPass] = useState<string>("");
    const [result, setResult] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pass || pass !== "") {
            setResult("loading...");
            const response = await fetchSendMsg(pass);
            if (response.result === "success") {
                setResult("success");
            } else {
                setResult("error");
            }
        }
    };

    return (
        <>
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>
            <section
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <form action="submit" onSubmit={handleSubmit}>
                    <button type="submit">send msg</button>
                    <input
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </form>
                <p>{result}</p>
            </section>
        </>
    );
};

export default Admin;
