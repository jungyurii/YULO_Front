import React from "react";
import { Card } from "@mui/material";

// Vision UI Dashboard React examples
import Table from "examples/Tables/Table";

import VuiButton from "components/VuiButton";

const Welcome = () => {
  return (
    <Card>
      <Table
        columns={[
          { name: "id", align: "left" },
          { name: "name", align: "left" },
          { name: "title", align: "center" },
          { name: "date", align: "center" },
          { name: "detail", align: "center" },
        ]}
        rows={[
          {
            name: "Manager",
            title: "John Micheal",
            date: "23/04/18",
            detail: <VuiButton color="info">detail</VuiButton>,
          },
          {
            name: "John Micheal",
            function: "Programator",
            email: "alexa@user.com",
            employed: "11/01/19",
          },
          {
            name: "John Micheal",
            function: "Executive",
            email: "laurent@user.com",
            employed: "19/09/17",
          },
          {
            name: "John Micheal",
            function: "Backend Developer",
            email: "michael@user.com",
            employed: "24/12/08",
          },
          {
            name: "John Micheal",
            function: "Manager",
            email: "richard@user.com",
            employed: "04/10/21",
          },
          {
            name: "John Micheal",
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
