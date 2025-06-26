import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { CookiesProvider } from "../context/CookiesContext";
import { NotificationContextProvider } from "../context/NotificationContext";
import { StaticContentProvider } from "../context/StaticContentContext";
import { AuthProvider } from "../context/AuthContext";
import { ContentProvider } from "../context/ContentContext";
import { SavedProvider } from "../context/SavedContext";
import { EditorProvider } from "../context/EditorContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <HelmetProvider>
            <CookiesProvider>
                <NotificationContextProvider>
                    <StaticContentProvider>
                        <AuthProvider>
                            <ContentProvider>
                                <SavedProvider>
                                    <EditorProvider>
                                        {children}
                                    </EditorProvider>
                                </SavedProvider>
                            </ContentProvider>
                        </AuthProvider>
                    </StaticContentProvider>
                </NotificationContextProvider>
            </CookiesProvider>
        </HelmetProvider>
    );
};

export default Providers;
