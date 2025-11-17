import { Delete } from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Rating } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

const ReviewCard = () => {
  return (
    <div className="flex justify-between">
      <Grid container spacing={9}>
        <Grid size={{xs:1}}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
            >
              Z
            </Avatar>
          </Box>
        </Grid>
        <Grid size={{xs:9}}>
            <div className="space-y-2">
                <div>
                    <p className="font-semibold text-lg">Dung</p>
                    <p className="opacity-70">2023-09-27T23:16:07.4783333</p>
                </div>
            </div>
            <Rating readOnly value={4} precision={1} />
            <p>value for money product, great product</p>
            <div>
                <img className="w-24 h-24 object-cover" src="https://qwatchluxury.com/wp-content/uploads/2024/03/dong-ho-nam-rolex-day-date-dinh-da-full-mat-ma-vang-cao-cap-nhat-rep-11-gm-40mm-3.jpg" alt="">
                </img>
            </div>
        </Grid>
        
      </Grid>
      <div>
        <IconButton>
            <Delete sx={{color:red[700]}}/>
        </IconButton>
      </div>
    </div>
  );
};

export default ReviewCard;
