import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { ErrorContextProvider } from "./ErrorContext";
import { AuthProvider } from "./AuthContext";
import { ContentProvider } from "./ContentContext";
import { SurveyContextProvider } from "./SurveyContext";

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HelmetProvider>
            <ErrorContextProvider>
                <AuthProvider>
                    <ContentProvider>
                        <SurveyContextProvider>{children}</SurveyContextProvider>
                    </ContentProvider>
                </AuthProvider>
            </ErrorContextProvider>
        </HelmetProvider>
    );
}

export default Providers;
