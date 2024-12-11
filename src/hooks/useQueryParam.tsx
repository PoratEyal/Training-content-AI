import { useSearchParams } from "react-router-dom";

interface SavedQueryParam {
    isSaved: string;
}

export const useQueryParam = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentParam: SavedQueryParam = {
        isSaved: searchParams.get("saved") || "false",
    };

    const updateParam = (isSaved: boolean) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("saved", isSaved.toString());
        setSearchParams(newSearchParams);
    };

    return { currentParam, updateParam };
};
