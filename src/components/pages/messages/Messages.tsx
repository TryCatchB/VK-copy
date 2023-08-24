import { FC, MouseEvent, useEffect, useState } from "react";
import { useAuth } from "../../providers/useAuth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { IMessage } from "../../../types";
import Card from "../../ui/Card";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Avatar,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

const Messages: FC = () => {
  const { user, db } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "messages"), (doc) => {
      const array: IMessage[] = [];

      doc.forEach((d: any) => {
        array.push(d.data());
      });

      setMessages(array);
    });

    return () => unSub();
  }, []);

  const addMessageHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      await addDoc(collection(db, "messages"), {
        user,
        message,
      });
    } catch (error: any) {
      setError(error);
    }

    setMessage("");
  };

  return (
    <>
      {error && (
        <Alert style={{ marginBottom: 20 }} severity="error">
          {error}
        </Alert>
      )}

      <Card>
        <List style={{ height: "65vh", overflowY: "auto" }}>
          {messages.map((message) => (
            <ListItem key={message.user.id}>
              <Grid
                container
                sx={message.user.id === user?.id ? { textAlign: "right" } : {}}
              >
                <Grid
                  display="flex"
                  justifyContent={
                    message.user.id === user?.id ? "flex-end" : "flex-start"
                  }
                  item
                  xs={12}
                >
                  <Avatar
                    sx={{ width: "30", height: "30" }}
                    src={message.user.avatar}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    style={
                      message.user.id === user?.id ? { color: "#5277a3" } : {}
                    }
                    primary={message.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText secondary={message.user.name} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Grid container style={{ padding: "20px" }}>
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
