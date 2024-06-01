import React from "react";
import { Card, Icon } from "@mui/material";

// Vision UI Dashboard React examples
import Table from "examples/Tables/Table";


const Welcome = () => {
  return (
    <Card>
      <Table
        columns={[
          { name: "name", align: "left" },
          { name: "function", align: "left" },
          { name: "email", align: "center" },
          { name: "employed", align: "center" },
        ]}
        rows={[
          {
            name: ["https://bit.ly/3qzezP5", "John Micheal"],
            function: "Manager",
            email: "john@user.com",
            employed: "23/04/18",
          },
          {
            name: ["https://bit.ly/3CfVnYA", "Alexa Liras"],
            function: "Programator",
            email: "alexa@user.com",
            employed: "11/01/19",
          },
          {
            name: ["https://bit.ly/3wM6x6v", "Laurent Perrier"],
            function: "Executive",
            email: "laurent@user.com",
            employed: "19/09/17",
          },
          {
            name: ["https://bit.ly/3CfVnYA", "Michael Levi"],
            function: "Backend Developer",
            email: "michael@user.com",
            employed: "24/12/08",
          },
          {
            name: ["https://bit.ly/3qzezP5", "Richard Gran"],
            function: "Manager",
            email: "richard@user.com",
            employed: "04/10/21",
          },
          {
            name: ["https://bit.ly/3CfVnYA", "Miriam Eric"],
            function: "Programtor",
            email: "miriam@user.com",
            employed: "14/09/20",
          },
        ]}
      />
    </Card>
  );
};

export default Welcome;
