//
// This is an admin-only Status page
// It allows logged-in users to fetch users or activities data from the backend
// The fetched data is converted to CSV and downloaded as a file
// The result status is displayed below the buttons
//
import { useState } from "react";
import { fetchGetActivities, fetchGetUsers } from "../../utils/fetch";
import { useAuthContext } from "../../context/AuthContext";
import { saveAs } from "file-saver";
import Papa from "papaparse";

export const jsonToCsv = (json: any, fileName: string) => {
    const csv = Papa.unparse(json);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${fileName}.csv`);
};

function Status() {
    const { isLoggedIn } = useAuthContext();
    const [res, setRes] = useState(null);

    const handleClickUsers = async () => {
        try {
            const response = await fetchGetUsers();
            setRes(response.result);
            jsonToCsv(JSON.stringify(response.users), "users");
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickActivities = async () => {
        try {
            const response = await fetchGetActivities();
            setRes(response.result);
            jsonToCsv(JSON.stringify(response.activities), "activities");
        } catch (error) {
            console.error(error);
        }
    };

    return isLoggedIn ? (
        <article>
            <div>
                <button onClick={handleClickUsers}>users</button>
                <button onClick={handleClickActivities}>activities</button>
            </div>
            <p>{res}</p>
        </article>
    ) : null;
}

export default Status;
