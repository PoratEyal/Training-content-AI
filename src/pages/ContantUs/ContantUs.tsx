import { useState } from "react";
import styles from "./ContantUs.module.css";
import { useNavigate } from "react-router-dom";
import route from "../../router/route.json";
import PageLayout from "../../components/Layout/PageLayout/PageLayout";

function ContantUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send the data to an API)
        console.log("Form data submitted:", formData);
    };

    return (
        <PageLayout path={route.contactUs} hasHeader={{ goBack }}>
            <h1>צרו איתנו קשר</h1>
            <form onSubmit={handleSubmit} className={styles.contact_form}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </PageLayout>
    );
}

export default ContantUs;
