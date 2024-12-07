import { StaticActivities } from './../models/interface/StaticActivities';
import { StaticSubjects } from "../models/interface/staticSubjects";

export interface FetchStaticSubjectsResponse {
  result: "success" | "error";
  data?: StaticSubjects[];
  message?: string;
}

export interface IncrementActivityDisplayCountResponse {
  result: "success" | "error";
  activity?: StaticActivities;
  message?: string;
}

export const fetchStaticSubjects = async (): Promise<FetchStaticSubjectsResponse> => {
  try {
    let url = "https://us-central1-activity-wizard.cloudfunctions.net/getStaticSubjectsHttp";

    // If you're using the emulator in development
    if (process.env.NODE_ENV !== 'production') {
      const localhost = 'localhost';
      url = `https://us-central1-activity-wizard.cloudfunctions.net/getStaticSubjectsHttp`;
    }

    // Make an HTTP GET request to the Cloud Function
    const response = await fetch(url);
    const data = await response.json() as FetchStaticSubjectsResponse;

    if (data.result === "success" && data.data) {
      return data; // Return the structured response with data
    } else {
      console.error("Function responded with error:", data.message);
      throw new Error(data.message || "Failed to fetch static subjects.");
    }
  } catch (error: any) {
    console.error("Error calling getStaticSubjectsHttp:", error);
    throw new Error(error.message || "An error occurred while fetching static subjects.");
  }
};

export const incrementActivityDisplayCountFetch = async (
  name: string
): Promise<IncrementActivityDisplayCountResponse> => {
  try {
    let url = "https://us-central1-activity-wizard.cloudfunctions.net/incrementActivityDisplayCount";

    // If you're using the emulator in development
    if (process.env.NODE_ENV !== 'production') {
      // Adjust the URL if needed for local testing
      url = `https://us-central1-activity-wizard.cloudfunctions.net/incrementActivityDisplayCount`;
    }

    // Make an HTTP POST request to the Cloud Function
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const data = (await response.json()) as IncrementActivityDisplayCountResponse;

    if (response.ok && data.result === "success" && data.activity) {
      return data; // Return the structured response with activity data
    } else {
      console.error("Function responded with error:", data.message);
      throw new Error(data.message || "Failed to increment activity display count.");
    }
  } catch (error: any) {
    console.error("Error calling incrementActivityDisplayCount:", error);
    throw new Error(error.message || "An error occurred while incrementing activity display count.");
  }
};
