import { TextField } from "@mui/material";

<TextField
  placeholder="🔍 Search events..."
  variant="outlined"
  size="small"
  sx={{
    input: {
      color: "blue",
      backgroundColor: "white",
      paddingY: "8px",
      paddingX: "12px",
      borderRadius: "8px",
    },
    "& .MuiOutlinedInput-root": {
      border: "2px solid blue",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#e0f0ff",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 10px rgba(0, 0, 255, 0.15)",
        border: "none",
      },
      "&.Mui-focused": {
        border: "2px solid #0047ab",
      },
    },
  }}
  onChange={(e) => {
    const value = e.target.value.toLowerCase();
    // call a filter handler or update state here
    // e.g., setSearchQuery(value)
  }}
/>
