import { Tabs, Tab, Box, Typography, InputBase } from "@mui/material";
import { useState } from "react";
import PreviewsEvents from "../components/Events/PreviewsEvents";
import UpcomingEvents from "../components/Events/UpcommingEvents";
import RegisterModal from "../components/Events/RegisterModal";


function EventsPage() {
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [modalData, setModalData] = useState(null);


  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      {/* Tabs Header */}
      <Tabs
        value={value}
        onChange={handleChange}
        slotProps={{
          indicator: {
            style: { display: "none" },
          },
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Tab
          label="Previous"
          sx={{
            color: "blue",
            border: "2px solid blue",
            borderRadius: "8px",
            margin: "5px",
            px: 3,
            py: 1,
            fontSize: "0.95rem",
            textTransform: "none",
            backgroundColor: "none",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#e0f0ff",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 10px rgba(0, 0, 255, 0.15)",
              color: "black",
              border: "none",
              fontWeight: "bold"

            },
            "&.Mui-selected": {
              backgroundColor: "#0047ab", // deep blue
              color: "white",
              fontWeight: "bold",
              border: "2px solid #0047ab",
            },
          }}
        />
        <Tab
          label="Upcomming"
          sx={{
            color: "blue",
            border: "2px solid blue",
            borderRadius: "8px",
            margin: "5px",
            px: 3,
            py: 1,
            fontSize: "0.95rem",
            textTransform: "none",
            backgroundColor: "none",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#e0f0ff",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 10px rgba(0, 0, 255, 0.15)",
              color: "black",
              border: "none",
              fontWeight: "bold"
            },
            "&.Mui-selected": {
              backgroundColor: "#0047ab", // deep blue
              color: "white",
              fontWeight: "bold",
              border: "2px solid #0047ab",
            },
          }}
        />

        <Box
          sx={{
            border: "2px solid blue",
            borderRadius: "30px",
            px: 2,
            py: 0.5,
            width:"30vw",
            display: "flex",
            marginLeft:"3rem",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            
          }}
        >
          <InputBase
            placeholder="🔍 Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              color: "blue",
              fontSize: "0.95rem",
              width: "30vw",
              "&::placeholder": {
                color: "blue",
              },
            }}
          />
        </Box>




      </Tabs>

      {/* Tab Content */}
      {value === 1 && (
        <Box>
          {/* Upcoming Events Content */}
          <UpcomingEvents />
        </Box>
      )}

      {value === 0 && (
        <Box>
          {/* Previous Events Content */}
          <PreviewsEvents />
        </Box>
      )}

     

    </Box>
  );
}

export default EventsPage;
