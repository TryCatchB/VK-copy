import { Box, TextField } from "@mui/material";
import { FC, KeyboardEvent, useState } from "react";
import { useAuth } from "../../providers/useAuth";
import ServiceAPI from "../../services/service";
import Error from "../../ui/Error/Error";
import { useError } from "../../hooks/useError";

const AddPost: FC = () => {
  const { user, db } = useAuth();
  const [error, setError] = useError();
  const [content, setContent] = useState<string>("");

  const addPostHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && user) {
      const dataToRequest = { user, db, content, typeRequest: "posts" };

      try {
        ServiceAPI.postRequest(dataToRequest);
      } catch (error: any) {
        setError(error);
      }

      setContent("");
    }
  };

  return (
    <>
      <Error error={error} />
      <Box sx={{ border: "1px solid #ccc", borderRadius: "10px" }}>
        <TextField
          label="Расскажите, что у вас нового?"
          variant="outlined"
          sx={{ width: "100%" }}
          onKeyPress={addPostHandler}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          inputProps={{
            sx: { borderRadius: "25px", backgroundColor: "#f9f9f9" },
          }}
        />
      </Box>
    </>
  );
};

export default AddPost;
