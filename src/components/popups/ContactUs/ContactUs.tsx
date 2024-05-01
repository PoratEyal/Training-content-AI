import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./ContactUs.module.css";
import SendBtn from "../../actions/btns/SendBtn/SendBtn";

function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // You can add your form submission logic here
        console.log(formData);
        // Reset the form after submission
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <Modal>
            <div className={styles.contianer}>
                <h3>צרו אינו קשר</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">
                            Name:<span></span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <SendBtn isDisabled={isDisabled} isLoading={isLoading} />
                </form>
            </div>
        </Modal>
    );
}

export default ContactUs;
