import { CategoryName } from "../../../models/types/movement";
import { StaticActivities, Activity } from "../../../models/types/activity";

/**
 * Convert a StaticActivities object into an Activity object.
 * Supply defaults or map fields as necessary.
 */
export function convertStaticToActivity(
  staticActivity: StaticActivities,
  userId: string
): Activity {
  return {
    // The fields below are required by the "Activity" interface
    id: "", // Typically the server/DB will generate this
    updatedAt: new Date().toISOString(),
    fetchCount: staticActivity.displayCount, // Or zero if you prefer
    likes: 0,
    // Pick a category that matches your backend or logic
    category: "contant" as CategoryName, 
    grade: "",
    amount: "",
    place: "",
    gender: "",
    subject: staticActivity.title,
    time: "",
    // If you want to store the static content in 'activity' field:
    activity: staticActivity.content,
    // The user who is saving it
    userId,
  };
}

export function isStaticActivities(obj: any): obj is StaticActivities {
  return (
    typeof obj?.name === "string" &&
    typeof obj?.metaTitle === "string" &&
    typeof obj?.metaDescription === "string" &&
    typeof obj?.content === "string" &&
    typeof obj?.displayCount === "number" &&
    typeof obj?.orderId === "number"
  );
}
