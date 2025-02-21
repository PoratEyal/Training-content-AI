import React, { useState } from "react";
import { fetchAddStaticActivity, fetchSendMsg } from "../../utils/fetch";
import { Helmet } from "react-helmet-async";

const Admin: React.FC = () => {
    const [pass, setPass] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [activityText, setActivityText] = useState<string>("");
    const [activityId, setActivityId] = useState<string>("");
    const [addActivityResult, setAddActivityResult] = useState<string>("");

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

    const handleAddActivity = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activityId.trim()) {
            setAddActivityResult("Please enter an activity ID");
            return;
        }
        setAddActivityResult("loading...");
        try {
            const response = await fetchAddStaticActivity(activityText, activityId);

            if (response.result === "success") {
                setAddActivityResult("Activity added successfully");
                setActivityText("");
                setActivityId("");
            } else {
                setAddActivityResult("Failed to add activity");
            }
        } catch (error) {
            setAddActivityResult("Error: " + (error as Error).message);
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
                <form onSubmit={handleAddActivity}>
                    <div style={{ marginBottom: "10px" }}>
                        <input
                            type="text"
                            value={activityId}
                            onChange={(e) => setActivityId(e.target.value)}
                            placeholder="Enter activity ID"
                            style={{
                                width: "600px",
                                padding: "8px",
                                marginBottom: "10px",
                                display: "block",
                            }}
                        />
                    </div>
                    <textarea
                        value={activityText}
                        onChange={(e) => setActivityText(e.target.value)}
                        placeholder="Enter activity text"
                        style={{
                            width: "600px",
                            height: "700px",
                            marginBottom: "10px",
                            display: "block",
                        }}
                    />
                    <button type="submit">Add Activity</button>
                </form>
                <p>{addActivityResult}</p>

                <form action="submit" onSubmit={handleSubmit}>
                    <button type="submit">send msg</button>
                    <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                </form>
                <p>{result}</p>
            </section>
        </>
    );
};

export default Admin;
