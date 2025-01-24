import React, { useState } from "react";
import { fetchSendMsg } from "../../utils/fetch";
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
            <section style={{position: "fixed", zIndex: 100}}>
                <form action="submit" onSubmit={handleSubmit}>
                    <button type="submit">send</button>
                    <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                </form>
                <p>{result}</p>
            </section>
        </>
    );
};

export default Admin;
