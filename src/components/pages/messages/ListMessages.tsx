import { Avatar, Grid, ListItem, ListItemText } from "@mui/material";
import { FC } from "react";
import { useAuth } from "../../providers/useAuth";
import { IMessage } from "../../../types";

interface IListMessagesArgs {
  messages: IMessage[];
}

const ListMessages: FC<IListMessagesArgs> = ({ messages }) => {
  const { user } = useAuth();

  return (
    <>
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
                style={message.user.id === user?.id ? { color: "#5277a3" } : {}}
                primary={message.message}
              />
            </Grid>
            <Grid item xs={12}>
              <ListItemText secondary={message.user.name} />
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </>
  );
};

export default ListMessages;
