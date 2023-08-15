import { Box, TextField } from "@mui/material";
import { FC, KeyboardEvent, useState } from "react";
import { IPost, TypeSetState } from "../../../types";
import { users } from "../../layout/sidebar/dataUsers";

interface IAddPost {
  setPosts: TypeSetState<IPost[]>;
}

const AddPost: FC<IAddPost> = ({ setPosts }) => {
  const [content, setContent] = useState<string>("");

  const addPostHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPosts((prev: IPost[]) => [
        { author: users[0], content, createdAt: "5 минут назад" },
        ...prev,
      ]);
      setContent("");
    }
  };

  return (
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
  );
};

export default AddPost;
