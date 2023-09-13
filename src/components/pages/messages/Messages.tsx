import { FC, useEffect, useState } from "react";
import { useAuth } from "../../providers/useAuth";
import { IMessage } from "../../../types";
import Card from "../../ui/Card";
import ServiceAPI from "../../services/service";
import SendIcon from "@mui/icons-material/Send";
import { useError } from "../../hooks/useError";
import Error from "../../ui/Error/Error";
import styles from "./Messages.module.css";
import { Divider, Fab, Grid, List, TextField } from "@mui/material";
import ListMessages from "./ListMessages";
import { addData } from "../../commonFunction/addData";

const Messages: FC = () => {
  const { user, db } = useAuth();
  const { error, setError } = useError();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const dataMessages = { db, setMessages };

    const unSub = ServiceAPI.getMessages(dataMessages);
    return () => unSub();
  }, []);

  const addMessageHandler = async () => {
    const data = {
      user,
      db,
      message,
      addFunction: ServiceAPI.addMessage,
      setError,
      type: "messages",
    };
    addData(data);

    setMessage("");
  };

  return (
    <>
      <Error message={error?.message} />
      <Card>
        <List className={styles.list}>
          <ListMessages messages={messages} />
        </List>
        <Divider />
        <Grid container className={styles.grid}>
          <Grid item xs={11}>
            <TextField
              id="outlined-basic-email"
              label="Type Something"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={1} alignItems="right">
            <Fab color="primary" onClick={addMessageHandler}>
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Messages;
