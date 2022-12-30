import React, { useState, useContext, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { BsCircle } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { labelcardStyle } from "./style";
import { GlobalContext } from "../../context/GlobalState";
import { AiOutlineCheckCircle } from "react-icons/ai";

export const LabelCards = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { users, removeUser } = useContext(GlobalContext);
  const [complete, setComplete] = useState([]);

  const completeHandler = () => setComplete(complete ? false : true);
  function Daymaker(date) {
    const today = new Date();
    let tomorrow = new Date();
    let yesterday = new Date();
    tomorrow.setDate(today.getDate() + 1);
    yesterday.setDate(today.getDate() - 1);
    let input = new Date(date);
    if (today.getDate() === input.getDate()) {
      return "Today " + input.toLocaleTimeString();
    } else if (tomorrow.getDate() === input.getDate()) {
      return "Tomorrow " + input.toLocaleTimeString();
    } else if (yesterday.getDate() === input.getDate()) {
      return "Yesterday " + input.toLocaleTimeString();
    } else {
      let date = input.toLocaleDateString();
      let time = input.toLocaleTimeString();
      return `${date} ${time}`;
    }
  }
  
 

  return (
    <>
      {users.map((user) => (
        <Box sx={labelcardStyle.Sx} key={user.id}>
          <Box>
            <Typography
              variant="body1"
              sx={{
                padding: "5px",
                textDecoration: complete ? "line-through" : "none",
              }}
            >
              {user.name}
            </Typography>
            <Typography variant="body2" sx={{ padding: "5px" }}>
              {Daymaker(user.date)}
            </Typography>
          </Box>
          <Box sx={labelcardStyle.iconBox}>
            <Checkbox
              color="primary"
              {...label}
              icon={<BsCircle color="primary" width="20px" height="20px" />}
              checkedIcon={<AiOutlineCheckCircle />}
              sx={labelcardStyle.checkBox}
              onClick={completeHandler}
            />
            <Box sx={labelcardStyle.delete}>
              <RiDeleteBinLine onClick={() => removeUser(user.id)} />
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};
