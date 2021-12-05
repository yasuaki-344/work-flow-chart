import { Grid } from "@mui/material";
import { Box } from "@mui/system";

export const DragPanel = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <Box
          sx={{
            m: 1,
            p: 1,
            fontSize: 16,
            border: 1,
            borderColor: "#0041D0",
            borderRadius: 1,
            textAlign: "center",
          }}
          onDragStart={(event) => onDragStart(event, "input")}
          draggable
        >
          Input Node
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            m: 1,
            p: 1,
            fontSize: 16,
            border: 1,
            borderRadius: 1,
            borderColor: "#1a192b",
            textAlign: "center",
          }}
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          Default Node
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            m: 1,
            p: 1,
            fontSize: 16,
            border: 1,
            borderRadius: 1,
            borderColor: "#FF80b9",
            textAlign: "center",
          }}
          onDragStart={(event) => onDragStart(event, "output")}
          draggable
        >
          Output Node
        </Box>
      </Grid>
    </Grid>
  );
};
